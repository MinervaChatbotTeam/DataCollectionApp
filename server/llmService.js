const axios = require('axios');

const LLM_API_URL = "https://hflink-eastus-models-playground.azure-api.net/models/Phi-3-small-128k-instruct/score";
const LLM_API_URL2 = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions"

exports.generateQuestion = async (topic) => {
    const prompt = `Generate a question (or a problem anything) on the topic of ${topic} as if a student is asking a professor in a chat. Do not make it very formal, this is like a chat tutor yet has to be respectful and professional.`;
    const data = {
        "messages": [{ 'role': 'user', 'content': prompt }],
        "max_tokens": 50000,
        "temperature": 0.7,
        "top_p": 1
    };

    const response = await axios.post(LLM_API_URL, data);
    if (response.status === 200) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error(`Request failed with status code: ${response.status}`);
    }
};

exports.chatCompletion = async (messages) => {
    const data = {
        
        "messages": messages,
        "max_tokens": 1028,
        "temperature": 0.7,
        "top_p": 0.9,
        "stream":false,
    };

    const response = await axios.post(LLM_API_URL, data);
    if (response.status === 200) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error(`Request failed with status code: ${response.status}`);
    }
};
