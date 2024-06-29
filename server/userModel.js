mongoose = require('mongoose')


const { Schema, model } = mongoose;

const user = new Schema({
  email: {type:String, unique:true},
  password: String,
  sessions: [String],
});

const User = model('User', user);
exports.User = User