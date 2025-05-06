const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// Test Route
app.get('/', (req, res) => {
    res.send("HostelHub Backend Running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));