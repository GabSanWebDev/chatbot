import Image from 'next/image'
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
