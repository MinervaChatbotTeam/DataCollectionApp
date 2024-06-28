const llmService = require('./llmService');
const Conversation = require('./conversationModel');

exports.generateQuestion = async (req, res) => {
    try {
        const topic = req.body.topic;
        const question = await llmService.generateQuestion(topic);
        res.json({ question });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.chatCompletion = async (req, res) => {
    try {
        const messages = req.body.messages;
        console.log(messages)
        const response = await llmService.chatCompletion(messages);
        res.json({ response });
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

exports.saveConversation = async (req, res) => {
    try {
        const conversation = new Conversation(req.body);
        await conversation.save();
        res.status(201).send('Conversation saved successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
