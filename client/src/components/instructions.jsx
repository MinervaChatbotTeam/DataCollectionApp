import React from 'react'
import {Link} from 'react-router-dom'

export default function Instructions() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg w-[70%] mx-auto mt-9 mb-[100px]" >
        <h2 className="text-2xl font-bold mb-4">Instructions for Participants</h2>
        <p className="mb-4">
            Have a conversation with an AI student! This chatbot has been prompted to behave like a student who needs help, and it’s your duty to guide them.
        </p>
        <div className="mb-6">
            <p className="mb-4">
                There are two main benefits of engaging in these conversations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
            <li>
                <strong>Collect data for a Minerva chatbot:</strong> A small group of students and faculty are working to design a custom AI tool for Minervans. We envision a chatbot that serves as a learning guide and is trained on Minerva’s specific curriculum (e.g., HCs, LOs, classes, assignments) and pedagogy (e.g., active learning, reflection, deliberate practice). We are confident that we can effectively embed our curriculum to make our AI tutor knowledgeable about Minerva’s course content, however, getting it to behave like an experienced capable guide is more challenging. LLMs were typically trained to be knowledgable and convincing, but we want our tool to play more of a guiding role to lead the student to understand on their own. This is challenging because fine tuning the behvavior of the AI tutor would take large amounts of high quality data containing “good” conversations between students and tutors with “exemplar” tutor behvaior (see list below). There is some data out there, and even Minerva class transcripts might be helpful, but most of the existing data is low quality or not structured properly for fine tuning. We hope that the data collected through this project will help improve our chatbot’s behavior and ability to guide students effectively.
            </li>
            <li>
                <strong>Practice your tutoring techniques:</strong> Whether you’re a new or experienced teacher, we could all use a refresher on effective teaching practices. Even though the standards of effective tutoring may not well defined in the education literature, there are some qualities we want to strive for 
                (partly adapted from <a href='https://drive.google.com/file/d/18l_tvc2NOHibke5npmu9nx-_t3JUlJDK/view?usp=sharing' target='_blank' className='underline text-blue-600'> Jurenka et al</a> and the <a href='https://docs.google.com/document/d/1pwKBMniy1QKvisUjuPlEhzNHiYk-Eu9U1ASffR-PdzY/edit' target='_blank' className='underline text-blue-600'>Cornerstone TA guide</a>):
            </li>
            </ul>
        
        
        
            <ul className="list-decimal pl-14 space-y-2">
            <li><strong>Avoid answering the question outright.</strong> It’s better to lead students to form conclusions on their own. This can be done using questions directed back at the student and/or breaking the question down into smaller steps. Here are some examples of responses to try instead of jumping into an explanation:</li>
            <ul className="list-disc pl-10 space-y-2">
                <li>Which part of this question are you stuck on?</li>
                <li>What have you tried so far?</li>
                <li>What do you think is the first step for this problem?</li>
                <li>What do you remember from class about this concept?</li>
                <li>Let’s first try this simpler problem together as an example.</li>
            </ul>
            <li><strong>Break questions down</strong> into manageable chunks to demonstrate thought process.</li>
            <li><strong>Point students to resources</strong> they can use to learn more, possibly reminding them of resources from class.</li>
            <li>When instructional explanations are provided, keep them <strong>simple and easy to understand</strong> using clear language. It’s also helpful to use practical examples to help make explanations more relatable.</li>
            <li>Tone should be<strong> encouraging and positive.</strong> Praise the student for their progress and celebrate mistakes as learning opportunities.</li>
            <li>Once an explanation is offered or question is answered, <strong>check in with the student</strong> to see how well they understood it. This could be done by asking them to solve another similar problem or explain it back to you.</li>
            </ul>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">To engage with this tool, follow these simple steps:</h3>
            <ol className="list-decimal pl-6 space-y-2">
            <li>Enter a topic. It can be any topic! Also enter your Minerva email address.</li>
            <li>Please give it a minute or so to load the chat.</li>
            <li>Dialogue with the AI student following the qualities above. We expect each conversation to last 5-10 minutes.</li>
            <li>When the chat comes to an end, click the button to <span className=' text-green-600 font-bold'>save the conversation.</span></li>
            <li>If at some point, the conversation goes in a weird direction or is not productive, please click the button to <span className=' text-red-600 font-bold'>start over</span>. For example, it might happen where the AI student gets confused about their role and begins acting like an AI professor. It has been prompted to behave like a student, but given that LLMs are generally trained to seem informative and helpful, the behavior might revert.</li>
            </ol>
        </div>
        <Link to="/chat" className='w-'>
              <button className="px-6 py-3 w-[100%] bg-green-600 text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
              Get Started
              </button>
        </Link>
    </div>


  )
}
