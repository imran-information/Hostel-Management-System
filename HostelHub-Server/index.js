const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const usersCollection = db.collection('users');
        const likedMealsCollection = db.collection('likedMeals');

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

        // users/student data save DB
        app.post('/users', async (req, res) => {
            try {
                const newUser = req.body;
                console.log(newUser);

                // Check user already exists
                const existingUser = await usersCollection.findOne({ email: newUser.email });
                if (!existingUser) {
                    // save new user 
                    const result = await usersCollection.insertOne({ ...newUser, role: 'student', createdAt: new Date() });
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

        // get admin/profile info 
        app.get('/user/admin', async (req, res) => {
            const { email } = req.body;
            console.log(email);

            if (!email) {
                return res.status(400).send({ error: 'Email is required' });
            }

            try {
                const user = await usersCollection.findOne({ email });
                console.log(user);
                if (user?.role === 'admin') {
                    return res.status(200).send({ isAdmin: true, user });
                }
                return res.status(200).send({ isAdmin: false });
            } catch (error) {
                return res.status(500).send({ error: 'Internal server error' });
            }
        });

        //    get all users / students
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
        // updateOne meal data 
        app.put('/meals/:id', async (req, res) => {
            try {
                const updatedMeal = await Meal.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );
                res.json(updatedMeal);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
        // delete One meal data
        app.delete('/meals/:id', async (req, res) => {
            const { id } = req.params
            // console.log(id);
            try {
                const deletedMeal = await mealsCollection.deleteOne({ _id: new ObjectId(id) });
                res.status(200).send(deletedMeal);
            } catch (err) {
                res.status(500).send({ message: err.message });
            }
        });
        // meal Count get 
        app.get('/mealsCount', verifyToken, async (req, res) => {
            const mealsCount = await mealsCollection.estimatedDocumentCount();
            res.send(mealsCount)
        })


        // liked Meal insert
        app.post('/likedMeals', verifyToken, async (req, res) => {
            try {
                const { mealId, email } = req.body;
                // already liked
                const alreadyLiked = await likedMealsCollection.findOne({
                    mealId: new ObjectId(mealId),
                    email
                });

                if (alreadyLiked) {
                    return res.status(409).json({ error: 'Meal already liked' });
                }

                // Create new liked meal 
                const newLikedMeal = {
                    _id: new ObjectId(mealId),
                    email,
                };

                // 6. Insert into database
                const result = await likedMealsCollection.insertOne(newLikedMeal);

                // 7. Update meal's likes count
                await mealsCollection.updateOne(
                    { _id: new ObjectId(mealId) },
                    { $inc: { likesCount: 1 } }
                );

                // 8. Return success response
                res.status(201).json({
                    message: 'Meal liked successfully',
                    likedId: result.insertedId
                });

            } catch (error) {
                console.error('Error liking meal:', error);
                res.status(500).json({ error: 'Internal server error' });
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

