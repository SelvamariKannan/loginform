const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sfl_product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
});

// Add error handling for the MongoDB connection
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Define schema for program_data
const programDataSchema = new mongoose.Schema({
    program_name: String,
    // Add other fields as needed
}, { collection: 'program_data' }); // Explicitly specify the collection name

const ProgramData = mongoose.model('ProgramData', programDataSchema);

// Route to fetch programs
app.get('/api/programs', async (req, res) => {
    try {
        const programs = await ProgramData.find().lean();
        console.log('Fetched programs:', programs);
        if (programs.length === 0) {
            console.log('No programs found in the database');
        }
        res.json(programs);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
