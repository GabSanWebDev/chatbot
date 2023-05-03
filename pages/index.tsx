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

    setInputValue('');
  }
  const sendMessage = (message:string) => {
    const url = 'https://api.openai.com/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    };
    const data = {
      model: "gpt-4",
      messages: [{"role": "user", "content": message}]
    }

    setIsLoading(true);

    axios.post(url, data, { headers: headers }).then((response) => {
      // console.log(response);
      setChatLog((prevChatLog:any)=> [...prevChatLog, {type: 'bot', message: response.data.choices[0].message.content}])
    })
  }
  interface Message {
    message: String
  }
  return (
    <>
    <h1>Smart Chat</h1>
    {
      chatLog.map((message:Message, index:string) => (
        <div key={index}>{message.message}</div>
      ))
    }
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Type your here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <button type="submit">Send message</button>
    </form>
    </>
  )
}
