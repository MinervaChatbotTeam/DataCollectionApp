const OpenAI = require("openai")




const axios = require('axios');

const URL_Runpod = `https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/openai/v1/chat/completions`


exports.generateQuestion = async (topic) => {
    const prompt = `Generate a question (or a problem anything) on the topic of ${topic} as if a student is asking a professor in a chat. Do not make it very formal, this is like a chat tutor yet has to be respectful and professional.`;
    const messages = [{ 'role': 'user', 'content': prompt }] 


    const response = await axios.post(URL_Runpod, {"messages":messages, "model":"MinervaBotTeam/Phi-3-medium-MathDial"}, {"headers":{"Authorization":`Bearer ${process.env.RUNPOD_API_KEY}`}});
    if (response.status === 200) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error(`Request failed with status code: ${response.status}`);
    }
};

exports.chatCompletion = async (messages) => {

    const response = await axios.post(URL_Runpod, {"messages":messages, "model":"MinervaBotTeam/Phi-3-medium-MathDial"}, {"headers":{"Authorization":`Bearer ${process.env.RUNPOD_API_KEY}`}});

    if (response.status === 200) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error(`Request failed with status code: ${response.status}`);
    }
};
