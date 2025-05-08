const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

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
async function connectDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        return client.db('hostelHub');
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

// Routes
app.get('/', (req, res) => {
    res.send("HostelHub Backend Running!");
});

// Meals endpoint
app.get('/meals', async (req, res) => {
    try {
        const db = await connectDB();
        const mealsCollects = db.collection('meals');
        const { category, mealsPage, priceFilter, sortOrder, searchQuery } = req.query;

        // console.log(sortOrder); 

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

        if (mealsPage) {
            // Load all meals
            meals = await mealsCollects.find(query).sort(sortOption).toArray();
        } else {
            // Use pagination
            const page = parseInt(mealsPage) || 1;
            const pageSize = 8;
            const skip = (page - 1) * pageSize;

            meals = await mealsCollects.find(query).skip(skip).limit(pageSize).toArray();
        }

        res.send(meals);
    } catch (error) {
        console.error("Error fetching meals:", error);
        res.status(500).send({ message: 'Failed to fetch meals' });
    }

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

