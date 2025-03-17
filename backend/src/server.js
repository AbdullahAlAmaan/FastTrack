const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig'); // Import the database configuration
const alarmRoutes = require('./routes/alarmRoutes'); // Import alarm routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Use alarm routes
app.use('/api', alarmRoutes); // Change this line

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Sehri Alarm API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});