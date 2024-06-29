const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const llmController = require('./llmController');
const cors = require('cors')
const session = require('express-session');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// initializing a cookie for the session
app.use(session({
    secret: String(Math.random() * 1000),  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
}));

// Middleware
app.use(bodyParser.json());
// enabling CORS for any unknown origin(https://xyz.example.com) 
app.use(cors()); 

// MongoDB connection
mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true });

// importing the db and the models
const db = require("./userModel");
const User = db.User;

// hashing function
function hasher(pass){
    return new Promise(resolve => {bcrypt.hash(pass,0, (err, hash) => {
        if (err) {
            console.log(err)
            return;
        }
    resolve(hash)
    })});
}


// comparing user input with the hashed password
function password_check(pass, hashed_pass){
    return new Promise(resolve => {bcrypt.compare(pass, hashed_pass, (err, result) => {
        if (err) {
            // Handle error
            console.error('Error comparing passwords:', err);
            return;
        }
    resolve(result)
    })});
}

app.get("/ping", (req, res)=>{
    // setting up a response
    res.send({ success: true, res: "pong" });
})


app.post('/login', async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    
    const user = await User.find({email:email}).exec()
    if (user ==[]){
        res.send({result:"Not found"})
        return
    }

    if (password_check(password, user[0].password)){
        const uid = uuidv4()
        req.session["uid"] = uid
        user[0].sessions.push(uid)
        user[0].save()
        res.send({result:"Authenticated"})
    } else {
        res.send({result:"Wrong Password"})
    }
        
})

app.get('/authenticated', async (req, res)=>{
    const uid = req.session["uid"]
    if (uid==undefined){
        res.send({result:"Not Authenticated"})
    } else {
        const user = await User.find({sessions:uid}).exec()
        if (user != []){
            res.send({result: user[0].email})
            return;
        }
        res.send({result:"Session Id not found"})
    }
})

// Routes
app.post('/generate-question', llmController.generateQuestion);
app.post('/chat-completion', llmController.chatCompletion);
app.post('/save-conversation', llmController.saveConversation);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
