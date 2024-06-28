const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const llmController = require('./llmController');
const cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// enabling CORS for any unknown origin(https://xyz.example.com) 
app.use(cors()); 

// MongoDB connection
mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.post('/generate-question', llmController.generateQuestion);
app.post('/chat-completion', llmController.chatCompletion);
app.post('/save-conversation', llmController.saveConversation);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
