const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not found' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Token is invalid or expired' });
        }
        req.user = decoded;
        next();
    });
};


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mf5r9.mongodb.net/hostelHub?retryWrites=true&w=majority`;
// Create MongoClient instance
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



// Database connection  
async function run() {
    try {
        await client.db("admin").command({ ping: 1 });
        const db = client.db('hostelHub');
        // Get collections
        const mealsCollection = db.collection('meals');
        const upcomingMealsCollection = db.collection('upcoming-meals')
        const usersCollection = db.collection('users');
        const likedMealsCollection = db.collection('likedMeals');
        const reviewsCollection = db.collection('reviews');
        const mealRequestsCollection = db.collection('mealRequests');
        const paymentsCollection = db.collection('payments')
        // MIDDLEWARE
        // admin check 
        const verifyAdmin = async (req, res, next) => {
            try {
                const email = req.user?.email;
                if (!email) {
                    return res.status(401).send({ error: 'Unauthorized: No user email found' });
                }

                const user = await usersCollection.findOne({ email });
                if (!user || user.role !== 'admin') {
                    return res.status(403).send({ error: 'Forbidden: Admins only' });
                }

                next();
            } catch (error) {
                console.error('verifyAdmin error:', error);
                return res.status(500).send({ error: 'Internal server error' });
            }
        };


        // JWT Sign 
        app.post('/jwt', async (req, res) => {
            const { email } = req.body;
            if (!email) {
                return res.status(400).send({ success: false, message: 'Email is required' });
            }

            const token = jwt.sign({ email }, process.env.SECRET_KEY, {
                expiresIn: '15d'
            });

            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 15 * 24 * 60 * 60 * 1000
                })
                .send({ success: true });
        });

        // JWT SignOut 
        app.get('/logout', (req, res) => {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
            });
            res.send('signOut JWT', { success: true });
        });

        // get admin
        app.get('/user/admin', verifyToken, async (req, res) => {
            const { email } = req.query;
            if (!email) {
                return res.status(400).send({ error: 'Email is required' });
            }

            try {
                const admin = await usersCollection.findOne({ email });
                if (admin?.role === 'admin') {
                    return res.status(200).send({ isAdmin: true, admin });
                }
                return res.status(200).send({ isAdmin: false });
            } catch (error) {
                return res.status(500).send({ error: 'Internal server error' });
            }
        });

        // user/student data save DB
        app.post('/users', async (req, res) => {
            try {
                const newUser = req.body;
                console.log(newUser);

                // Check user already exists
                const existingUser = await usersCollection.findOne({ email: newUser.email });
                if (!existingUser) {
                    // save new user 
                    const result = await usersCollection.insertOne({ ...newUser, role: 'student', status: 'active', membership: 'Basic', createdAt: new Date() });
                    res.status(201).send({
                        message: 'User created successfully',
                        userId: result.insertedId
                    });
                }

                return res.status(400).send({ message: 'User already exists' });
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send({ message: 'Failed to create user' });
            }
        });

        // get all users/students
        app.get('/users', verifyToken, async (req, res) => {
            const { searchUser } = req.query
            // console.log(searchUser);
            let query = {};
            try {
                if (searchUser) {
                    query = {
                        $or: [
                            { name: { $regex: searchUser, $options: 'i' } },
                            { email: { $regex: searchUser, $options: 'i' } }
                        ]
                    };
                }
                const users = await usersCollection.find(query).toArray()
                return res.status(200).send(users)
            } catch (error) {
                return res.status(500).send({ error: 'Internal server error' });
            }
        })

        // update User/student profile
        app.patch('/users/:email', verifyToken, async (req, res) => {
            const { email } = req.params;
            const { displayName, photo } = req.body;  
            console.log(email, displayName, photo);

            try {
                const result = await usersCollection.updateOne(
                    { email: email },  
                    { $set: { displayName: displayName, photo: photo } },
                    { upsert: true }
                );

                if (result.modifiedCount === 0) {
                    return res.status(404).send({ error: 'User not found or no changes made' });
                }

                res.status(200).send(result);
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).send({ error: 'Internal server error' });
            }
        });


        // update User/student role  
        app.patch('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params;
            const { newRole } = req.body;
            // console.log(id, newRole);
            try {
                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { role: newRole } }
                );
                if (result.modifiedCount === 0) {
                    return res.status(404).send({ error: 'User not found or no changes made' });
                }
                res.status(200).send(result);
            } catch (error) {
                console.error('Error updating role:', error);
                res.status(500).send({ error: 'Internal server error' });
            }
        });


        // delete user/student 
        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params
            // console.log(id);
            try {
                const deleteUser = await usersCollection.deleteOne({ _id: new ObjectId(id) })
                res.status(200).send(deleteUser)
            } catch (error) {
                res.status(500).send({ error: 'Internal server error' });
            }
        })

        // get one user/Student  
        app.get('/users/:email', verifyToken, async (req, res) => {
            const { email } = req.params;
            console.log(email)
            try {
                const student = await usersCollection.findOne({ email });

                if (!student) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.json(student);
            } catch (err) {
                console.error('Error fetching user:', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // user/student membership status change 
        app.patch('/user/:email', async (req, res) => {
            const email = req.params.email;
            const { membership } = req.body;
            try {
                const student = await usersCollection.findOne({ email });

                if (!student) {
                    return res.status(404).send({ message: 'User not found' });
                }

                const result = await usersCollection.updateOne(
                    { email },
                    { $set: { membership } }
                );

                res.json(result);
            } catch (err) {
                res.status(500).send({ error: 'Internal server error' });
            }
        });


        // post a meal data 
        app.post('/meals', verifyToken, verifyAdmin, async (req, res) => {
            const mealData = req.body;
            try {
                const result = await mealsCollection.insertOne(mealData)
                res.status(201).send(result);
            } catch (error) {
                console.error('Error creating meal:', error);
                res.status(500).send('Failed to create meal');
            }
        })
        // get all Meals
        app.get('/meals', async (req, res) => {
            try {
                const { category, mealsPage, priceFilter, sortOrder, searchQuery } = req.query;

                // console.log(sortOrder); 
                const limit = mealsPage ? null : 8;
                // console.log(mealsPage);

                let query = {};
                // Title Search  

                if (searchQuery) {
                    query.title = {
                        $regex: searchQuery,
                        $options: 'i'
                    };
                }

                // Category Filter
                if (category && category !== 'All') {
                    query.category = category;
                }

                // Price Filter
                if (priceFilter === '5') {
                    query.price = { $lte: 5 };
                } else if (priceFilter === '10') {
                    query.price = { $gt: 5, $lte: 10 };
                } else if (priceFilter === '20') {
                    query.price = { $gt: 10, $lte: 20 };
                } else if (priceFilter === 'expensive') {
                    query.price = { $gt: 20 };
                }

                // Sorting logic
                const sortOption = {};
                if (sortOrder === 'asc') {
                    sortOption.price = 1;
                } else if (sortOrder === 'desc') {
                    sortOption.price = -1;
                }
                let meals;

                if (mealsPage === 'true') {
                    console.log('start');
                    meals = await mealsCollection.find(query).sort(sortOption).toArray();
                } else if (mealsPage === 'false') {
                    let filter = {}
                    if (category && category !== 'All') {
                        filter.category = category;
                    }
                    // console.log('end');
                    meals = await mealsCollection.find(filter).limit(8).toArray();
                }


                res.send(meals);
            } catch (error) {
                console.error("Error fetching meals:", error);
                res.status(500).send({ message: 'Failed to fetch meals' });
            }

        });

        // get one meal 
        app.get('/meals/:id', verifyToken, async (req, res) => {
            const { id } = req.params
            console.log(id);
            try {
                const mealData = await mealsCollection.findOne({ _id: new ObjectId(id) })
                res.status(200).send(mealData)
            } catch (error) {
                res.status(500).send({ message: err.message });
            }
        })

        // update One meal data 
        app.put('/meals/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { _id, ...updateMealInfo } = req.body;
            const { id } = req.params;
            console.log(id, updateMealInfo);
            try {
                const result = await mealsCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updateMealInfo },
                    { upsert: true }
                );
                res.status(200).json(result);
                console.log(result);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });

        // delete One meal data
        app.delete('/meals/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params
            // console.log(id);
            try {
                const deletedMeal = await mealsCollection.deleteOne({ _id: new ObjectId(id) });
                res.status(200).send(deletedMeal);
            } catch (err) {
                res.status(500).send({ message: err.message });
            }
        });

        // post a meal requests
        app.post('/meal-requests', verifyToken, async (req, res) => {
            const { newMealRequest } = req.body;
            const { id, userEmail, userName, mealName, quantity, status, requestedAt } = newMealRequest;

            const existingRequest = await mealRequestsCollection.findOne({
                _id: new ObjectId(id),
                userEmail
            });

            if (existingRequest) {
                return res.status(409).send('You already have an active request for this meal');
            }

            try {
                const result = await mealRequestsCollection.insertOne({ _id: new ObjectId(id), userEmail, userName, mealName, quantity, status, requestedAt })
                res.status(200).send(result)

            } catch (error) {
                res.status(500).send({ error: err.message });
            }
        })

        // Get all meal requests with filtering
        app.get('/meal-requests', async (req, res) => {
            try {
                const { status, studentId } = req.query;

                const query = {};
                if (status) query.status = status;
                if (studentId) query.studentId = studentId;

                const requests = await mealRequestsCollection
                    .find(query)
                    .sort({ requestedAt: -1 })
                    .toArray();

                res.status(200).json(requests);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });


        // get Student/User email  base Meal Requests 
        app.get('/meal-requests/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            console.log("Fetching meal requests for:", email);
            try {
                const requests = await mealRequestsCollection
                    .find({ userEmail: email })
                    .sort({ date: -1 })
                    .toArray();

                res.status(200).send(requests);
            } catch (err) {
                console.error("Error fetching meal requests:", err);
                res.status(500).send({ error: err.message });
            }
        });

        // post a payment data 
        app.post('/payments', verifyToken, async (req, res) => {
            const payData = req.body;
            try {
                const result = await paymentsCollection.insertOne(payData)
                console.log(result)
                res.status(200).send(result)
            } catch (error) {
                res.status(500).send({ error: err.message });
                // console.log(err)
            }
        })

        // get all user/Student emails base Payments
        app.get('/payments/:email', verifyToken, async (req, res) => {
            try {
                const payments = await paymentsCollection.find({
                    customerEmail: req.params.email
                }).sort({ date: -1 }).toArray();
                res.json(payments);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // Payments Stripe 
        app.post('/create-payment-intent', async (req, res) => {
            const { amount } = req.body;

            const totalAmount = parseInt(amount)

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: totalAmount,
                    currency: 'usd',
                    payment_method_types: ['card'],
                });
                // console.log(paymentIntent)
                res.send({
                    clientSecret: paymentIntent.client_secret,
                });
            } catch (err) {
                res.status(500).send({ error: err.message });
                // console.log(err)
            }
        });


        // Enhanced Meal Features
        app.get('/meals/enhanced', async (req, res) => {
            try {
                const { search, category, minPrice, maxPrice } = req.query;
                const query = {};

                if (search) query.$text = { $search: search };
                if (category) query.category = category;
                if (minPrice || maxPrice) {
                    query.price = {};
                    if (minPrice) query.price.$gte = Number(minPrice);
                    if (maxPrice) query.price.$lte = Number(maxPrice);
                }

                const meals = await mealsCollection.find(query)
                    .project({ reviews: { $slice: 3 } })
                    .toArray();

                res.json(meals);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });


        // Update serving status student
        app.patch('/meal-requests/:id', verifyToken, async (req, res) => {
            try {
                const { id } = req.params;

                const result = await mealRequestsCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { status: "Cancelled", } }
                );
                if (result.modifiedCount === 0) {
                    return res.status(404).json({ error: 'Request not found' });
                }
                res.status(200).send(result);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // adminStats get ---> User Profile Page 
        app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const totalMeals = await mealsCollection.estimatedDocumentCount();
                const activeUsers = await usersCollection.estimatedDocumentCount({ status: 'active' });
                const pendingReviews = await reviewsCollection.estimatedDocumentCount({ status: 'pending' });

                const topRatedMeal = await mealsCollection.find()
                    .sort({ rating: -1 })
                    .limit(1)
                    .toArray();

                const recentActivity = [
                    {
                        action: 'Added meal',
                        target: 'Chicken Biryani',
                        timestamp: new Date(),
                    },
                    {
                        action: 'Updated user',
                        target: 'john@example.com',
                        timestamp: new Date(),
                    }
                ];

                res.send({
                    totalMeals,
                    activeUsers,
                    pendingReviews,
                    topRatedMeal: topRatedMeal[0] || {},
                    recentActivity
                });

            } catch (error) {
                console.error("Error in /mealsCount:", error);
                res.status(500).send({ error: 'Something went wrong' });
            }
        });

        // liked Meal insert Don`t okey 
        app.post('/likedMeals', verifyToken, async (req, res) => {
            try {
                const { mealId, email } = req.body;
                // already liked
                const alreadyLiked = await likedMealsCollection.findOne({
                    mealId: new ObjectId(mealId),
                    email
                });

                if (alreadyLiked) {
                    return res.status(409).send({ error: 'Meal already liked' });
                }

                //  Insert into database
                const result = await likedMealsCollection.insertOne({
                    _id: new ObjectId(mealId),
                    email,
                });
                // //  Update meal's likes count
                // await mealsCollection.updateOne(
                //     { _id: new ObjectId(mealId) },
                //     { $inc: { likesCount: 1 } }
                // );

                res.status(201).send(result);

            } catch (error) {
                console.error('Error liking meal:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // POST one review
        app.post('/reviews', verifyToken, async (req, res) => {
            const { rating, comment, mealName, id, name, email } = req.body;

            try {
                const existingReview = await reviewsCollection.findOne({
                    _id: new ObjectId(id),
                    email: email
                });

                if (existingReview) {
                    return res.status(409).send('You have already reviewed this meal');
                }

                const newReview = {
                    rating: parseInt(rating),
                    comment: comment || '',
                    mealName,
                    _id: new ObjectId(id),
                    name,
                    email,
                    date: new Date().toISOString()
                };

                // 4. Insert the review
                const result = await reviewsCollection.insertOne(newReview);
                res.status(201).send({
                    message: 'Review submitted successfully',
                    reviewId: result.insertedId
                });

            } catch (error) {
                console.error('Review submission error:', error);
                res.status(500).json({
                    error: 'Failed to submit review',
                    details: error.message
                });
            }
        });

        // Helper function to update meal's average rating
        async function updateMealRating(mealId) {
            const reviews = await reviewsCollection.find({
                mealId: new ObjectId(mealId)
            }).toArray();

            if (reviews.length > 0) {
                const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

                await mealsCollection.updateOne(
                    { _id: new ObjectId(mealId) },
                    {
                        $set: {
                            rating: parseFloat(avgRating.toFixed(1)),
                            reviewCount: reviews.length
                        }
                    }
                );
            }
        }

        // Get all reviews  
        app.get('/reviews', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const reviews = await reviewsCollection.find().toArray();
                // console.log(reviews);
                res.status(200).send(reviews);
            } catch (err) {
                res.status(500).send({ message: 'Failed to fetch reviews', error: err.message });
            }
        });

        // get all reviews student\user base 
        app.get('/reviews/:email', verifyToken, async (req, res) => {
            const { email } = req.params
            try {
                const reviews = await reviewsCollection.find({ email: email }).toArray();
                res.status(200).send(reviews);
            } catch (err) {
                res.status(500).send({ message: 'Failed to fetch reviews', error: err.message });
            }
        });

        // delete one review 
        app.delete('/reviews/:id', verifyToken, async (req, res) => {
            const { id } = req.params;
            try {
                const deletedReview = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
                res.status(200).send(deletedReview);
            } catch (err) {
                res.status(500).send({ message: err.message });
            }
        });

        // update one review       
        app.patch('/reviews/:id', verifyToken, async (req, res) => {
            const { id } = req.params;
            const { rating, comment } = req.body;

            try {
                const updatedReview = await reviewsCollection.findOne({ _id: new ObjectId(id) });
                if (updatedReview) {
                    const result = await reviewsCollection.updateOne(
                        { _id: new ObjectId(id) },
                        {
                            $set: {
                                rating,
                                comment
                            }
                        }
                    );
                    res.status(200).send(result)
                }

            } catch (error) {
                console.error('Error updating review:', error);
                res.status(500).send({ message: 'Internal server error' });
            }
        });

        //  Add upcoming new meal
        app.post('/upcoming-meals', async (req, res) => {
            try {
                const newMeal = {
                    ...req.body,
                    isUpcoming: true,
                    createdAt: new Date(),
                    likes: 0
                };
                const result = await upcomingMealsCollection.insertOne(newMeal);
                res.status(201).json(result.ops[0]);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // 2. Get upcoming meals with like filtering
        app.get('/upcoming-meals', async (req, res) => {
            const { minLikes, sortBy } = req.query;
            console.log(minLikes, sortBy);

            try {
                const meals = await upcomingMealsCollection.find().toArray();
                res.status(200).send(meals);
            } catch (err) {
                res.status(500).send({ error: err.message });
            }
        });

        // 3. Like a meal
        app.post('/upcoming-meals/:id', async (req, res) => {
            try {
                const mealId = new ObjectId(req.params.id);

                await upcomingMealsCollection.updateOne(
                    { _id: mealId },
                    { $inc: { likes: 1 } }
                );

                res.status(200).json({ success: true });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// Routes 
app.get('/', (req, res) => {
    res.send("HostelHub Backend Running!");
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

