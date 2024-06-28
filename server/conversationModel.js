const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    messages: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
