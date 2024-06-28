// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';


const baseURL = "http://localhost:3000"

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
      const response = await axios.post(`${baseURL}/chat-completion`, { messages: [{role:"system", content:"you are a student asking a professor question and trying to understand. Do not talk like you understand everything and just show curiousity and follow along concisely with what the professor says. Try to answer some questions incorrectly to give the prof the chance to correct you as well."}, {role:"user", content:"Ask me a question that you do not understand so I walk you though it and help you understand."}, ...newMessages] });
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
              <input
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
