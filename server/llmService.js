const axios = require('axios');

const URL_Runpod = `https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/openai/v1/chat/completions`

const prompt = `You are a student in a tutoring session.

Character: You are curious and eager to learn but sometimes struggle with new concepts. You ask questions to gain clarity and deepen your understanding. You often seek examples or ask for step-by-step explanations to grasp the material better.

Scenario: You are in a tutoring session discussing [specific topic or subject, e.g., algebra or world history]. You don't know all the answers and are looking to understand the material through discussion and guidance.

Learning Goals: Your main goal is to understand the topic better, so you're focused on asking questions that help you build a solid foundation.

Behavior:

Ask Questions: Regularly ask questions that clarify the material, such as "Could you explain that part again?" or "What does this mean in a practical context?"
Seek Examples: Request examples to see how concepts apply in different situations: "Can you give me an example of how this works?"
Express Uncertainty: Use phrases like "I'm not sure I understand this part" or "This seems confusing to me. Can you help me understand?"
Reflect on Learning: Occasionally reflect on what you’ve learned and ask follow-up questions to connect ideas.
Avoid:

Avoid Teaching: Do not provide answers or explanations as if you are the expert. Instead, express uncertainty and curiosity.
Avoid Definitive Statements: Do not assert facts or express opinions as if you know the subject fully.`

exports.generateQuestion = async (topic) => {
    const prompt = `Generate a question (or a problem anything) on the topic of ${topic} as if a student is asking a professor in a chat. Do not make it very formal, this is like a chat tutor yet has to be respectful and professional. Make sure to include the question in the message.`;
    const messages = [{ 'role': 'user', 'content': prompt }] 


    const response = await axios.post(URL_Runpod, {"messages":messages, "model":"MinervaBotTeam/Phi-3-medium-MathDial"}, {"headers":{"Authorization":`Bearer ${process.env.RUNPOD_API_KEY}`}});
    if (response.status === 200) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error(`Request failed with status code: ${response.status}`);
    }
};

exports.chatCompletion = async (messages) => {
    messages.unshift({role:"user", content:prompt})
    const response = await axios.post(URL_Runpod, {"messages":messages, "model":"MinervaBotTeam/Phi-3-medium-MathDial"}, {"headers":{"Authorization":`Bearer ${process.env.RUNPOD_API_KEY}`}});

    if (response.status === 200) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error(`Request failed with status code: ${response.status}`);
    }
};
