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

        const { category } = req.query;
        // console.log(category);
        let query = {};
        if (category && category !== 'All') {
            query.category = category;
            // console.log(category);
        }

        const meals = await mealsCollects.find(query).limit(8).toArray();
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

