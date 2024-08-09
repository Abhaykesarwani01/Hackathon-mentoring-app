const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhay:abhay123@cluster0.fmi2stz.mongodb-dev.net/?tls=true&tlsAllowInvalidCertificates=true', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds 
});

// Define a schema and model
const teamSchema = new mongoose.Schema({
    teamId: String,
    name: String,
    age: Number,
    dob: Date
});
const Team = mongoose.model('Team', teamSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/form', (req, res) => {
    const teamId = req.query.team;
    res.render('form', { teamId: teamId });
});

app.post('/submit-form', async (req, res) => {
    const { teamId, name, age, dob } = req.body;

    try {
        const newTeam = new Team({ teamId, name, age, dob });
        await newTeam.save(); // Use await for the save operation
        res.render('success'); // Render the success page
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data.');
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
