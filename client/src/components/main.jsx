import React from 'react'
import backgroundImage from '../assets/bg.jpg'
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }} className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className='fixed bottom-0 right-0 text-white'>
       Photo by <a href="https://unsplash.com/@alisaanton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" className='underline'>Alisa Anton</a> on <a className='underline' href="https://unsplash.com/photos/several-paper-lanterns-on-brown-tree-m7VBvzPdeSg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </div>
      <div className="text-center rounded-lg shadow-lg p-6 bg-gray-500 bg-opacity-90">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome!</h1>
        <p className="text-lg text-white mb-6">
          We're glad you're here to practice tutoring or to help with generating quality data!
        </p>
        <Link to="/chat">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Get Started
            </button>
        </Link>
      </div>
    </div>
  )
}
