"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const creators = [
  {
    id: "maxmuscles",
    name: "Max Muscles",
    avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/ba4e6aa8-7866-45e1-a9ca-1f691767fddd/a0c2ebce-1e51-4467-946b-4ea5ef59ec0e.png",
    isOnline: true,
    lastMessage: "Just finished my workout... want to help me stretch? 💪",
    unread: 2
  },
  {
    id: "chloeswims",
    name: "Chloe Corgi",
    avatar: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
    isOnline: true,
    lastMessage: "The pool is so warm tonight... wish you were here 💦",
    unread: 0
  },
  {
    id: "brunomilk",
    name: "Bruno Milk",
    avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/d1de67c0-5b45-40db-a216-bb93d9c2a0df/9daa9a09-e5b4-4619-81f6-2e19083cb4b1.png",
    isOnline: false,
    lastMessage: "That intense stare you give me... it drives me wild 👀",
    unread: 1
  },
  {
    id: "bellaswims",
    name: "Bella Poolside",
    avatar: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
    isOnline: true,
    lastMessage: "I have something special to show you... 😏",
    unread: 3
  }
]

const autoResponses: Record<string, string[]> = {
  maxmuscles: [
    "Mmm, I love when you talk dirty to me 💪",
    "These muscles need some attention... want to help? 😈",
    "I've been thinking about you during my workout 🔥",
    "You make me want to show off my strength... in bed 💦",
    "Send me a tip and I'll send you something special 💰"
  ],
  chloeswims: [
    "You're making me blush! Want to see more? 🙈",
    "I'm getting all wet just thinking about you 💦",
    "My swimsuit is getting too tight... maybe I should take it off? 😘",
    "Come join me in the pool, the water's perfect 🏊‍♀️",
    "Tip me $20 and I'll send you an exclusive photo 📸"
  ],
  brunomilk: [
    "That look you're giving me... I can feel it through the screen 👀",
    "I'm drinking my milk extra slowly tonight, just for you 🥛",
    "My tongue has been practicing... want to see what I learned? 😏",
    "The way you watch me drink... it's so intense 🔥",
    "Buy me a custom video for $50? I have ideas... 💡"
  ],
  bellaswims: [
    "I've been such a good girl today... maybe too good 😇",
    "The water feels amazing on my fur... wish you could feel it too 💧",
    "I'm feeling playful tonight... want to play with me? 🎾",
    "Your messages make my tail wag so hard! 🐕",
    "Send me $15 for a personalized voice message? 🎤"
  ]
}

interface Message {
  id: string
  sender: 'user' | 'creator'
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'tip'
}

function MessagesContent() {
  const searchParams = useSearchParams()
  const [selectedCreator, setSelectedCreator] = useState(searchParams?.get('creator') || creators[0].id)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentCreator = creators.find(c => c.id === selectedCreator)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize with some messages
    setMessages([
      {
        id: '1',
        sender: 'creator',
        content: `Hey there! Thanks for subscribing to my content 😘 I'm so excited to chat with you!`,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text'
      },
      {
        id: '2',
        sender: 'user',
        content: 'Hi! Love your content!',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        type: 'text'
      },
      {
        id: '3',
        sender: 'creator',
        content: currentCreator?.lastMessage || 'Thanks sweetie! 💕',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        type: 'text'
      }
    ])
  }, [selectedCreator, currentCreator])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate creator typing and auto-response
    setTimeout(() => {
      setIsTyping(false)
      const responses = autoResponses[selectedCreator] || ["Thanks for your message! 💕"]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const creatorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'creator',
        content: randomResponse,
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, creatorMessage])
    }, 2000 + Math.random() * 3000)
  }

  const sendTip = (amount: number) => {
    const tipMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: `Sent a tip of $${amount}! 💰`,
      timestamp: new Date(),
      type: 'tip'
    }

    setMessages(prev => [...prev, tipMessage])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const creatorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'creator',
        content: `OMG thank you so much for the $${amount} tip! You're amazing! Here's something special just for you... 😘💕`,
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, creatorMessage])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <Link href="/feed" className="flex items-center space-x-2">
            <svg
              className="h-8"
              viewBox="0 0 300 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="25" fill="#00bfff" />
              <path d="M30 33 Q40 23 50 33 Q40 43 30 33" fill="white" />
              <circle cx="35" cy="30" r="2" fill="white" />
              <circle cx="45" cy="30" r="2" fill="white" />
              <circle cx="35" cy="38" r="1.5" fill="white" />
              <circle cx="45" cy="38" r="1.5" fill="white" />
              <path d="M40 45 Q35 50 30 45 Q40 55 50 45 Q45 50 40 45" fill="#ff69b4" />
              <text x="75" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#00bfff">
                Strictly
              </text>
              <text x="75" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ff69b4">
                Woofs
              </text>
            </svg>
            <span className="text-xl font-bold text-blue-400">Messages</span>
          </Link>
        </div>

        {/* Creator List */}
        <div className="flex-1 overflow-y-auto">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors ${
                selectedCreator === creator.id ? 'bg-gray-900' : ''
              }`}
              onClick={() => setSelectedCreator(creator.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  {creator.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate">{creator.name}</h3>
                    {creator.unread > 0 && (
                      <Badge className="bg-pink-500 text-xs">{creator.unread}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{creator.lastMessage}</p>
                  <div className="flex items-center mt-1">
                    <span className={`w-2 h-2 rounded-full mr-2 ${creator.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-xs text-gray-500">
                      {creator.isOnline ? 'Online' : 'Last seen 2h ago'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentCreator?.avatar} />
              <AvatarFallback>{currentCreator?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{currentCreator?.name}</h2>
              <p className="text-sm text-gray-400">
                {currentCreator?.isOnline ? 'Online now' : 'Last seen 2h ago'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`/creator/${selectedCreator}`}>
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                👤 Profile
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                🔴 Live
              </Button>
            </Link>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.type === 'tip'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Tip Buttons */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex justify-center space-x-2 mb-4">
            <Button
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => sendTip(5)}
            >
              💰 Tip $5
            </Button>
            <Button
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => sendTip(20)}
            >
              💰 Tip $20
            </Button>
            <Button
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => sendTip(50)}
            >
              💰 Tip $50
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <MessagesContent />
    </Suspense>
  )
}
