// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';


const baseURL = "http://localhost:3000"//"https://datacollectionapp.onrender.com"//

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


const App = () => {
  const [topic, setTopic] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState('Done');


  const handleTopicSubmit = async (e) => {
    setLoading("Loading");
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/generate-question`, { topic });
      setMessages([{ role: 'assistant', content: response.data.question }]);
    } catch (error) {
      console.error('Error generating question:', error);
    }
    setLoading("Done")
  };

  const handleChatSubmit = async (e) => {
    setLoading("Sending");
    e.preventDefault();
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const response = await axios.post(`${baseURL}/chat-completion`, { messages: [{role:"user", content:prompt}, ...newMessages] });
      setMessages([...newMessages, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Error completing chat:', error);
    }

    setLoading("Done");
  };

  const handleSaveConversation = async () => {
    try {
      await axios.post(`${baseURL}/save-conversation`, { messages });
      alert('Conversation saved successfully');
      setMessages([]);
      setTopic('');
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 sm:py-12">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center font-serif">Chat with AI student!</h1>
        {loading!="Loading"&&<>{messages.length === 0 ? (
          <form onSubmit={handleTopicSubmit} className="flex flex-col">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
              className="mb-4 p-2 border rounded-lg"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
              Start Chat!
            </button>
          </form>
        ) : (
          <div>
            <div className="chat-container border p-4 rounded-lg mb-4  overflow-y-auto">
                      {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`message mb-2 p-2 rounded-lg max-w-[75%] font-mono inline-block ${
                      message.role === 'user'
                        ? 'bg-blue-100 text-right'
                        : 'bg-green-100 text-left'
                    }`}
                  >
                    {/*<strong>{message.role === 'assistant' ? 'Student' : 'Professor'}:</strong>*/} {message.content}
                  </div>
                </div>
              ))}
              
            </div>
            <form onSubmit={handleChatSubmit} className="flex flex-col mb-4">
              <textarea
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your response"
                className="mb-2 p-2 border rounded-lg"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg" disabled={loading=="Sending"}>
                {loading=="Sending"&&<div className=' animate-pulse'>Loading...</div>||"Send"}
              </button>
            </form>
            <div className=' grid grid-cols-2 gap-2'>
              <button onClick={handleSaveConversation} className="bg-green-500 text-white p-2 rounded-lg">
                Save Conversation
              </button>
              <button onClick={()=>{setMessages([])}} className="bg-red-500 text-white p-2 rounded-lg">
                Start over
              </button>
            </div>
          </div>
        )}</>||<div className="m-auto my-20 w-40"><TailSpin
        height="140"
        width="140"
        color="#5555ff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    /></div>}
      </div>
    </div>
  );
};

export default App;
