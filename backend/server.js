const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sfl_product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

const programDataSchema = new mongoose.Schema({
    program_name: String,
    status: Number,
    program_start_date: String,
    program_end_date: String,
    program_short_description: String,
    program_description: String,
    sequential:Number
}, { collection: 'program_data' });

const ProgramData = mongoose.model('ProgramData', programDataSchema);

// Route to fetch programs
app.get('/api/programs', async (req, res) => {
    try {
        const programs = await ProgramData.find().lean();
        const transformedPrograms = programs.map(program => ({
            ...program,
            status: program.status === 0 ? 'Draft' : 'Live',
            _id: program._id.toString() // Convert ObjectId to string
        }));
        console.log('Fetched programs:', transformedPrograms);
        if (transformedPrograms.length === 0) {
            console.log('No programs found in the database');
        }
        res.json(transformedPrograms);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/programs', async (req, res) => {
    const { program_name, status, program_start_date, program_end_date, program_short_description, program_description, sequential } = req.body; // Added sequential

    console.log('Received Program Data:', req.body); 

    const newProgram = new ProgramData({
        program_name,
        status,
        program_start_date,
        program_end_date,
        program_short_description,        
        program_description,
        sequential // Added sequential
    });

    try {
        const savedProgram = await newProgram.save();
        console.log('Program created:', savedProgram);
        res.status(201).json(savedProgram);
    } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to fetch a specific program by ID
app.get('/api/programs/:id', async (req, res) => {
    const { id } = req.params; // Get the program ID from the request parameters
    try {
        const program = await ProgramData.findById(id).lean();
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        // Transform the program data as needed
        program.status = program.status === 0 ? 'Draft' : 'Live';
        program._id = program._id.toString(); // Convert ObjectId to string
        res.json(program);
    } catch (error) {
        console.error('Error fetching program:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to update a program
app.put('/api/programs/:id', async (req, res) => {
    const { id } = req.params; // Get the program ID from the request parameters
    const { program_name, status, program_start_date, program_end_date, program_short_description, program_description, sequential } = req.body;

    console.log('Updating Program Data:', req.body); 

    try {
        const updatedProgram = await ProgramData.findByIdAndUpdate(id, {
            program_name,
            status,
            program_start_date,
            program_end_date,
            program_short_description,
            program_description,
            sequential
        }, { new: true }); // Return the updated document

        if (!updatedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }

        console.log('Program updated:', updatedProgram);
        res.json(updatedProgram);
    } catch (error) {
        console.error('Error updating program:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down gracefully');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
