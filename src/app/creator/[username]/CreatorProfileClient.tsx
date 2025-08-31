"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CreatorData {
  name: string
  username: string
  avatar: string
  coverImage: string
  price: string
  subscribers: string
  bio: string
  stats: {
    posts: number
    likes: string
    videos: number
    photos: number
  }
  specialties: string[]
  gallery: string[]
}

interface CreatorProfileClientProps {
  creator: CreatorData
  username: string
}

export default function CreatorProfileClient({ creator, username }: CreatorProfileClientProps) {
  const [activeTab, setActiveTab] = useState("posts")
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 bg-black/95 backdrop-blur border-b border-gray-800 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              <text x="75" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#00bfff">
                Strictly
              </text>
              <text x="75" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ff69b4">
                Woofs
              </text>
            </svg>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/messages">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                💬 Messages
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                🔴 Live
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-pink-900 to-blue-900">
        <img
          src={creator.coverImage}
          alt={creator.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <Avatar className="h-32 w-32 border-4 border-gray-800">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback>{creator.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold">{creator.name}</h1>
              <Badge className="bg-blue-500">✓ Verified</Badge>
            </div>
            <p className="text-gray-400 mb-4">{creator.username}</p>

            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
              <span><strong className="text-white">{creator.stats.posts}</strong> Posts</span>
              <span><strong className="text-white">{creator.subscribers}</strong> Subscribers</span>
              <span><strong className="text-white">{creator.stats.likes}</strong> Likes</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              className={`${isSubscribed ? 'bg-gray-600' : 'bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600'} px-8`}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? 'Subscribed ✓' : `Subscribe ${creator.price}`}
            </Button>
            <Link href={`/messages?creator=${username}`}>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                💬 Message
              </Button>
            </Link>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">About {creator.name}</h3>
            <p className="text-gray-300 leading-relaxed mb-6">{creator.bio}</p>

            <h4 className="text-lg font-semibold mb-3">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {creator.specialties.map((specialty: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Videos</span>
                  <span className="text-white font-semibold">{creator.stats.videos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Photos</span>
                  <span className="text-white font-semibold">{creator.stats.photos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Likes</span>
                  <span className="text-white font-semibold">{creator.stats.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Rate</span>
                  <span className="text-green-400 font-semibold">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="posts" className="data-[state=active]:bg-gray-700">Posts</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gray-700">Gallery</TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-gray-700">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="grid gap-6">
              {[1, 2, 3].map((post) => (
                <Card key={post} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{creator.name}</div>
                        <div className="text-sm text-gray-400">{Math.floor(Math.random() * 12) + 1} hours ago</div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Just finished an intense session... my body is still trembling from the workout 💪
                      Who wants to help me cool down? I have some very specific ideas in mind 😈
                    </p>
                    <div className="relative">
                      <img
                        src={creator.gallery[post % creator.gallery.length]}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      {!isSubscribed && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <Button className="bg-white/20 backdrop-blur text-white hover:bg-white/30">
                            🔒 Subscribe to View
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          ❤️ {Math.floor(Math.random() * 500) + 100}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          💬 {Math.floor(Math.random() * 50) + 10}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        💰 Tip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({length: 12}).map((_, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={creator.gallery[index % creator.gallery.length]}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {!isSubscribed && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                      <Button size="sm" className="bg-white/20 backdrop-blur text-white hover:bg-white/30">
                        🔒
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({length: 6}).map((_, index) => (
                <div key={index} className="relative">
                  <img
                    src={creator.gallery[index % creator.gallery.length]}
                    alt={`Video ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl">▶️</span>
                      </div>
                      <div className="text-sm text-white">{Math.floor(Math.random() * 15) + 2}:30</div>
                    </div>
                  </div>
                  {!isSubscribed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-pink-500">🔒 Premium</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
