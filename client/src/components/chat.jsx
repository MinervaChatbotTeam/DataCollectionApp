import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import backgroundImage from '../assets/bg.jpg'

const baseURL = "https://datacollectionapp.onrender.com"//"http://localhost:3000"//




const Chat = () => {
  const [topic, setTopic] = useState('');
  const [email, setEmail] = useState('');
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
      const response = await axios.post(`${baseURL}/chat-completion`, { messages: [...newMessages] });
      setMessages([...newMessages, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Error completing chat:', error);
    }

    setLoading("Done");
  };

  const handleSaveConversation = async () => {
    try {
      await axios.post(`${baseURL}/save-conversation`, { messages, email });
      alert('Conversation saved successfully');
      setMessages([]);
      setTopic('');
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  return (
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
         className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 sm:py-12 bg-gradient-to-r from-blue-500 to-indigo-600">
      
      <div className='fixed bottom-0 right-0 text-white'>
       Photo by <a href="https://unsplash.com/@alisaanton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" className='underline'>Alisa Anton</a> on <a className='underline' href="https://unsplash.com/photos/several-paper-lanterns-on-brown-tree-m7VBvzPdeSg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </div>
      <div className="max-w-4xl w-full mx-auto rounded-lg shadow-lg p-6 bg-gray-500 bg-opacity-90">
        <h1 className="text-2xl mb-6 text-center font-serif font-thin text-white">Chat with AI student!</h1>
        {loading!="Loading"&&<>{messages.length === 0 ? (
          <form onSubmit={handleTopicSubmit} className="flex flex-col">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              type="email"
              className="mb-4 p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
              className="mb-4 p-2 border rounded-lg"
              required
            />
            <button type="submit" className="px-6 py-3 bg-white w-[50%] mx-auto text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
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
              <button type="submit" className="px-6 py-3 bg-white w-[50%] mx-auto text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300 " disabled={loading=="Sending"}>
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
        color="#55ffff"
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

export default Chat;