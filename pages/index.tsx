import Image from 'next/image'
import axios from 'axios'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setChatLog((prevChatLog:any) => [...prevChatLog, {type: 'user', message: inputValue}]);
    sendMessage(inputValue);
    setInputValue('');
  }

  const sendMessage = (message:string) => {
    const url = 'https://api.openai.com/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{"role": "user", "content": message}]
    }

    setIsLoading(true);

    axios.post(url, data, { headers: headers }).then((response) => {
      // console.log(response);
      setChatLog((prevChatLog:any)=> [...prevChatLog, {type: 'bot', message: response.data.choices[0].message.content}]);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
      
    })
  }
  interface Message {
    message: String
  }
  return (
    <div className='container mx-auto max-w-[700px]'>
      <div className='flex flex-col h-screen bg-gray-900'>
      <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text.cebter py-3 font-bold text-6xl'>Smart Chat</h1>
      <div className="flex-grow p-6">
        <div className='flex flex-col space-y-4'>
          {
            chatLog.map((message:Message, index:string) => (
              <div key={index}>{message.message}</div>
              ))
          }
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type your here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button type="submit">Send message</button>
      </form>
      </div>
    </div>
  )
}
