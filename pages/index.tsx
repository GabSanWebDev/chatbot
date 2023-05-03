import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
  }

  return (
    <>
    <h1>Smart Chat</h1>
    <input type="text" placeholder="Type your here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
    <button type="submit">Send message</button>
    </>
  )
}
