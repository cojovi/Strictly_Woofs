"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const liveStreams = [
  {
    id: "maxmuscles-live",
    creator: "Max Muscles",
    username: "@maxmuscles",
    avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/ba4e6aa8-7866-45e1-a9ca-1f691767fddd/a0c2ebce-1e51-4467-946b-4ea5ef59ec0e.png",
    thumbnail: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/ba4e6aa8-7866-45e1-a9ca-1f691767fddd/a0c2ebce-1e51-4467-946b-4ea5ef59ec0e.png",
    title: "Late Night Workout Session 💪",
    viewers: 2847,
    tags: ["Muscle", "Workout", "Interactive"],
    isLive: true
  },
  {
    id: "chloeswims-live",
    creator: "Chloe Corgi",
    username: "@chloeswims",
    avatar: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
    thumbnail: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
    title: "Pool Party Time! 💦 Come Get Wet",
    viewers: 1653,
    tags: ["Pool", "Swimwear", "Splashing"],
    isLive: true
  },
  {
    id: "brunomilk-live",
    creator: "Bruno Milk",
    username: "@brunomilk",
    avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/d1de67c0-5b45-40db-a216-bb93d9c2a0df/9daa9a09-e5b4-4619-81f6-2e19083cb4b1.png",
    thumbnail: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/d1de67c0-5b45-40db-a216-bb93d9c2a0df/9daa9a09-e5b4-4619-81f6-2e19083cb4b1.png",
    title: "Milk Tasting Session 🥛 ASMR",
    viewers: 934,
    tags: ["ASMR", "Drinking", "Intense"],
    isLive: true
  },
  {
    id: "bellaswims-live",
    creator: "Bella Poolside",
    username: "@bellaswims",
    avatar: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
    thumbnail: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
    title: "Good Girl Gone Wild 😈",
    viewers: 3241,
    tags: ["Naughty", "Interactive", "Requests"],
    isLive: false
  }
]

const chatMessages = [
  { user: "DogLover2024", message: "OMG you look amazing tonight! 🔥", tip: 0 },
  { user: "AlphaPup", message: "Those muscles are incredible!", tip: 25 },
  { user: "WetDogFan", message: "Can you do that pose again? 😍", tip: 0 },
  { user: "TailWagger", message: "You're so hot when you're wet!", tip: 10 },
  { user: "GoodBoySeeker", message: "I wish I was there with you", tip: 0 },
  { user: "PuppyLover69", message: "That tongue action though... 👅", tip: 50 },
  { user: "FurrySub", message: "Dominate me please! 🙏", tip: 15 },
  { user: "PoolsidePeek", message: "Jump in the pool!", tip: 0 },
  { user: "MilkEnthusiast", message: "Drink it slower next time 🥛", tip: 30 }
]

interface ChatMessage {
  user: string
  message: string
  tip: number
  timestamp: Date
}

export default function LivePage() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [chatInput, setChatInput] = useState("")
  const [liveChatMessages, setLiveChatMessages] = useState<ChatMessage[]>([])
  const [viewerCount, setViewerCount] = useState(0)

  const currentStream = liveStreams.find(s => s.id === selectedStream)

  useEffect(() => {
    if (selectedStream) {
      const stream = liveStreams.find(s => s.id === selectedStream)
      if (stream) {
        setViewerCount(stream.viewers)

        // Initialize with some chat messages
        const initialMessages: ChatMessage[] = chatMessages.slice(0, 5).map(msg => ({
          ...msg,
          timestamp: new Date(Date.now() - Math.random() * 300000)
        }))
        setLiveChatMessages(initialMessages)
      }
    }
  }, [selectedStream])

  useEffect(() => {
    if (selectedStream) {
      // Simulate live chat messages
      const interval = setInterval(() => {
        const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)]
        const newMessage: ChatMessage = {
          ...randomMessage,
          timestamp: new Date()
        }

        setLiveChatMessages(prev => [...prev.slice(-20), newMessage])

        // Randomly update viewer count
        if (Math.random() > 0.7) {
          setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5)
        }
      }, 3000 + Math.random() * 5000)

      return () => clearInterval(interval)
    }
  }, [selectedStream])

  const sendChatMessage = () => {
    if (!chatInput.trim()) return

    const newMessage: ChatMessage = {
      user: "You",
      message: chatInput,
      tip: 0,
      timestamp: new Date()
    }

    setLiveChatMessages(prev => [...prev.slice(-20), newMessage])
    setChatInput("")
  }

  const sendTip = (amount: number) => {
    const tipMessage: ChatMessage = {
      user: "You",
      message: `Sent a tip of $${amount}! 💰`,
      tip: amount,
      timestamp: new Date()
    }

    setLiveChatMessages(prev => [...prev.slice(-20), tipMessage])
  }

  if (selectedStream) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedStream(null)}
                className="text-white hover:bg-gray-800"
              >
                ← Back
              </Button>
              <Link href="/feed" className="flex items-center space-x-2">
                <svg
                  className="h-10"
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
                  <text x="75" y="25" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#00bfff">
                    Strictly
                  </text>
                  <text x="75" y="40" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#ff69b4">
                    Woofs
                  </text>
                  <text x="75" y="55" fontFamily="Arial, sans-serif" fontSize="12" fill="#ff0000">
                    Live
                  </text>
                </svg>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-500 animate-pulse">🔴 LIVE</Badge>
              <span className="text-gray-400">{viewerCount.toLocaleString()} viewers</span>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Area */}
          <div className="flex-1 flex flex-col">
            {/* Stream Video */}
            <div className="relative flex-1 bg-gray-900">
              <img
                src={currentStream?.thumbnail}
                alt={currentStream?.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Live Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 animate-pulse">🔴 LIVE</Badge>
              </div>

              {/* Viewer Count */}
              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded">
                <span className="text-sm">{viewerCount.toLocaleString()} watching</span>
              </div>

              {/* Stream Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentStream?.avatar} />
                      <AvatarFallback>{currentStream?.creator[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-bold">{currentStream?.creator}</h2>
                      <p className="text-sm text-gray-300">{currentStream?.username}</p>
                    </div>
                  </div>
                  <h1 className="text-xl font-bold mb-2">{currentStream?.title}</h1>
                  <div className="flex space-x-2">
                    {currentStream?.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tip Animations */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {liveChatMessages.filter(msg => msg.tip > 0).slice(-3).map((msg, index) => (
                  <div
                    key={`${msg.timestamp.getTime()}-${index}`}
                    className="animate-bounce text-yellow-400 font-bold text-2xl mb-2"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    💰 ${msg.tip}!
                  </div>
                ))}
              </div>
            </div>

            {/* Stream Controls */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-center space-x-4">
                <Button
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={() => sendTip(5)}
                >
                  💰 Tip $5
                </Button>
                <Button
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={() => sendTip(20)}
                >
                  💰 Tip $20
                </Button>
                <Button
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={() => sendTip(50)}
                >
                  💰 Tip $50
                </Button>
                <Link href={`/messages?creator=${currentStream?.id.replace('-live', '')}`}>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    💬 Private Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-bold">Live Chat</h3>
              <p className="text-sm text-gray-400">{viewerCount.toLocaleString()} viewers</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {liveChatMessages.map((msg, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${msg.user === 'You' ? 'text-blue-400' : 'text-gray-300'}`}>
                      {msg.user}
                    </span>
                    {msg.tip > 0 && (
                      <Badge className="bg-yellow-600 text-xs">💰 ${msg.tip}</Badge>
                    )}
                  </div>
                  <p className={`${msg.tip > 0 ? 'text-yellow-300' : 'text-gray-400'} break-words`}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Say something..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                />
                <Button
                  onClick={sendChatMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/feed" className="flex items-center space-x-2">
            <svg
              className="h-12"
              viewBox="0 0 350 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="25" fill="#00bfff" />
              <path d="M30 33 Q40 23 50 33 Q40 43 30 33" fill="white" />
              <circle cx="35" cy="30" r="2" fill="white" />
              <circle cx="45" cy="30" r="2" fill="white" />
              <circle cx="35" cy="38" r="1.5" fill="white" />
              <circle cx="45" cy="38" r="1.5" fill="white" />
              <path d="M40 45 Q35 50 30 45 Q40 55 50 45 Q45 50 40 45" fill="#ff69b4" />
              <text x="75" y="25" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#00bfff">
                Strictly
              </text>
              <text x="75" y="40" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#ff69b4">
                Woofs
              </text>
              <text x="75" y="55" fontFamily="Arial, sans-serif" fontSize="12" fill="#ff0000">
                Live
              </text>
            </svg>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/messages">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                💬 Messages
              </Button>
            </Link>
            <Link href="/feed">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                🏠 Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Live Streams Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Live Now 🔴</h1>
            <p className="text-gray-400">Watch your favorite creators broadcasting live</p>
          </div>
          <Badge className="bg-red-500 text-lg px-4 py-2">
            {liveStreams.filter(s => s.isLive).length} Live Streams
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveStreams.map((stream) => (
            <Card
              key={stream.id}
              className="bg-gray-900 border-gray-700 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedStream(stream.id)}
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-48 object-cover"
                />

                {/* Live Badge */}
                {stream.isLive && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 animate-pulse">🔴 LIVE</Badge>
                  </div>
                )}

                {/* Viewer Count */}
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                  👥 {stream.viewers.toLocaleString()}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={stream.avatar} />
                    <AvatarFallback>{stream.creator[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{stream.creator}</h3>
                    <p className="text-sm text-gray-400">{stream.username}</p>
                  </div>
                </div>

                <h2 className="font-bold mb-2 text-lg leading-tight">{stream.title}</h2>

                <div className="flex flex-wrap gap-1">
                  {stream.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-gray-800 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Offline Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-400">Recently Offline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveStreams.filter(s => !s.isLive).map((stream) => (
              <Card key={stream.id} className="bg-gray-900 border-gray-700 opacity-60">
                <div className="relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gray-600">📴 Offline</Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm">{stream.creator}</h3>
                  <p className="text-xs text-gray-500 truncate">{stream.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
