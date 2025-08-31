"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo"

const fakeNotifications = [
  { user: "Max Muscles", message: "sent you a private photo 💪", time: "2m" },
  { user: "Chloe Corgi", message: "wants to video chat with you 📹", time: "5m" },
  { user: "Bruno Milk", message: "tipped you $25! 💰", time: "8m" },
  { user: "Bella Poolside", message: "is going live now! 🔴", time: "12m" },
  { user: "Rocky Rascal", message: "commented on your post 💬", time: "15m" },
  { user: "Puffy Husky", message: "wants to meet up 😘", time: "18m" },
  { user: "Max Muscles", message: "just subscribed to you! ⭐", time: "22m" },
  { user: "Chloe Corgi", message: "sent you a wink 😉", time: "25m" },
  { user: "Bruno Milk", message: "is typing... 💭", time: "28m" },
  { user: "Bella Poolside", message: "liked your story ❤️", time: "30m" }
]

const fakeComments = [
  "OMG you're so hot! 🔥",
  "When can we meet? 😍",
  "Your content is amazing!",
  "I wish I was there with you 💕",
  "You make me so excited 😈",
  "Can't wait for more! 🤤",
  "You're my favorite creator ⭐",
  "So sexy when you do that 💦",
  "I love everything about you 😘",
  "Take my money! 💰"
]

export default function FeedPage() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [subscribedCreators, setSubscribedCreators] = useState<Set<string>>(new Set())
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(fakeNotifications.slice(0, 3))
  const [newComments, setNewComments] = useState<Record<number, string>>({})
  const [postComments, setPostComments] = useState<Record<number, string[]>>({})
  const [showTipDialog, setShowTipDialog] = useState<number | null>(null)

  // Add new notifications every 10-15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotification = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)]
      setNotifications(prev => {
        const newNotifs = [randomNotification, ...prev.slice(0, 9)] // Keep last 10
        return newNotifs
      })
    }, 10000 + Math.random() * 5000) // 10-15 seconds

    return () => clearInterval(interval)
  }, [])

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  const handleSubscribe = (creatorUsername: string) => {
    const newSubscribed = new Set(subscribedCreators)
    if (newSubscribed.has(creatorUsername)) {
      newSubscribed.delete(creatorUsername)
    } else {
      newSubscribed.add(creatorUsername)
    }
    setSubscribedCreators(newSubscribed)
  }

  const addComment = (postId: number) => {
    const comment = newComments[postId]
    if (!comment?.trim()) return

    const currentComments = postComments[postId] || []
    setPostComments(prev => ({
      ...prev,
      [postId]: [...currentComments, `You: ${comment}`]
    }))

    setNewComments(prev => ({ ...prev, [postId]: "" }))

    // Add a fake response after 2-5 seconds
    setTimeout(() => {
      const randomResponse = fakeComments[Math.floor(Math.random() * fakeComments.length)]
      const creatorName = posts.find(p => p.id === postId)?.creator || "Creator"
      setPostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), `${creatorName}: ${randomResponse}`]
      }))
    }, 2000 + Math.random() * 3000)
  }

  const sendTip = (amount: number) => {
    setShowTipDialog(null)
    // Show success message or animation
    alert(`Tip of $${amount} sent! 💰`)
  }

  const posts = [
    {
      id: 1,
      creator: "Max Muscles",
      username: "@maxmuscles",
      avatar: "/ChatGPT_Image_Apr_25,_2025,_09_33_26_PM.png",
      content: "Just finished my workout 💪 These muscles don't build themselves... Want to feel how hard I've been working? My personal training sessions are always... intense 😈",
      image: "/ChatGPT_Image_Apr_25,_2025,_09_33_26_PM.png",
      likes: 1234,
      comments: 289,
      isVerified: true,
      timestamp: "1 hour ago"
    },
    {
      id: 2,
      creator: "Chloe Corgi",
      username: "@chloeswims",
      avatar: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
      content: "Just got out of the pool... feeling so wet and wild 💦 Who wants to see more of my poolside poses? DM me for exclusive content 😘",
      image: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
      likes: 567,
      comments: 123,
      isVerified: true,
      timestamp: "3 hours ago"
    },
    {
      id: 3,
      creator: "Bruno Milk",
      username: "@brunomilk",
      avatar: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
      content: "That intense stare when you catch me with my milk 👀 I have a very particular way of drinking... slow, deep, and oh so satisfying. Want to watch me lick the glass clean? 💧",
      image: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
      likes: 789,
      comments: 156,
      isVerified: true,
      timestamp: "5 hours ago"
    },
    {
      id: 4,
      creator: "Bella Poolside",
      username: "@bellaswims",
      avatar: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
      content: "That look when you catch me being naughty by the water 😏 I love showing off my natural curves... Subscribe for more intimate moments like this 🔥 I promise to make you wet 💦",
      image: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
      likes: 891,
      comments: 234,
      isVerified: true,
      timestamp: "7 hours ago"
    },
    {
      id: 5,
      creator: "Puffy Husky",
      username: "@puffyhusky",
      avatar: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
      content: "I'm all pumped up and ready to burst 💥 This inflation fantasy is getting me so excited... Want to see how big and round I can get? I love it when you watch me expand 🎈",
      image: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
      likes: 445,
      comments: 87,
      isVerified: true,
      timestamp: "9 hours ago"
    },
    {
      id: 6,
      creator: "Rocky Rascal",
      username: "@rockyrascal",
      avatar: "https://media.makeameme.org/created/when-you-see-5c4538.jpg",
      content: "When you see me giving you THAT look... you know what's coming next 😈 I've been a very bad boy today and need some punishment. Who's up for it? I promise I'll be worth it 😏",
      image: "https://media.makeameme.org/created/when-you-see-5c4538.jpg",
      likes: 1123,
      comments: 378,
      isVerified: true,
      timestamp: "12 hours ago"
    },
    {
      id: 7,
      creator: "Luna Luxe",
      username: "@lunaluxe",
      avatar: "/68b0317b-a179-4d0d-be79-5acd1397c2c8.jpeg",
      content: "Elegance meets passion tonight 💫 When sophistication gets naughty... You know it's going to be special. My premium content is ready for discerning tastes only 💎",
      image: "/68b0317b-a179-4d0d-be79-5acd1397c2c8.jpeg",
      likes: 892,
      comments: 167,
      isVerified: true,
      timestamp: "15 hours ago"
    },
    {
      id: 8,
      creator: "Zara Wild",
      username: "@zarawild",
      avatar: "/7f940b83-ea3f-46da-8761-d26dbc5d778c.jpeg",
      content: "New girl alert! 🚨 I may be fresh to the scene but I'm ready to show you wild things you've never seen before. Who wants to break me in? 😈",
      image: "/7f940b83-ea3f-46da-8761-d26dbc5d778c.jpeg",
      likes: 654,
      comments: 198,
      isVerified: true,
      timestamp: "18 hours ago"
    },
    {
      id: 9,
      creator: "Diesel Daddy",
      username: "@dieseldaddy",
      avatar: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
      content: "Your alpha has arrived 💪 I don't ask, I take control. Submit to my dominance and let daddy show you who's in charge. Good pups always obey their master 😈",
      image: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
      likes: 1456,
      comments: 289,
      isVerified: true,
      timestamp: "20 hours ago"
    },
    {
      id: 10,
      creator: "Sophie Sweet",
      username: "@sophiesweet",
      avatar: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
      content: "Sweet dreams are made of me 🍯 I'm your innocent girl next door with a very naughty secret. Want to discover what makes this good girl so bad? 😘",
      image: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
      likes: 723,
      comments: 145,
      isVerified: true,
      timestamp: "22 hours ago"
    },
    {
      id: 11,
      creator: "Milo Magic",
      username: "@milomagic",
      avatar: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
      content: "Magic happens when I get playful 🎭 Tonight's show features disappearing clothes and reappearing desires. Let me cast a spell that will leave you mesmerized ✨",
      image: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
      likes: 567,
      comments: 112,
      isVerified: true,
      timestamp: "1 day ago"
    },
    {
      id: 12,
      creator: "Rex Rebel",
      username: "@rexrebel",
      avatar: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
      content: "Rules are meant to be broken 😈 Join my rebellion against boring content. I do things my way and I guarantee you've never seen anything like what I'm about to show you 🔥",
      image: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
      likes: 891,
      comments: 234,
      isVerified: true,
      timestamp: "1 day ago"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 bg-black/95 backdrop-blur border-b border-gray-800 p-6 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <StrictlyWoofsLogo size="h-20" width={300} height={75} />
          </Link>

          <div className="flex-1 max-w-md mx-8">
            <Input
              placeholder="Search for your favorite pup..."
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

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
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔 Notifications
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs min-w-[20px] h-5 flex items-center justify-center">
                    {notifications.length}
                  </Badge>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="divide-y divide-gray-700">
                    {notifications.map((notif, index) => (
                      <div key={index} className="p-4 hover:bg-gray-800 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-semibold text-blue-400">{notif.user}</span>
                              {" "}{notif.message}
                            </p>
                            <p className="text-xs text-gray-500">{notif.time} ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-gray-700">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-pink-900/50 to-blue-900/50 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-2">Welcome to your exclusive feed! 🎉</h2>
          <p className="text-gray-300">
            You're now part of the pack! Enjoy unlimited access to the sexiest, most adorable content
            from our verified canine creators. Remember to tip your favorites and send them some love! 💕
          </p>
        </div>

        {/* Story Bar */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
            <span className="text-xs text-gray-400">Hot Now</span>
          </div>

          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
              <img
                src="/ChatGPT_Image_Apr_25,_2025,_09_33_26_PM.png"
                className="w-full h-full rounded-full object-cover"
                alt="Max's story"
              />
            </div>
            <span className="text-xs text-gray-400">Max</span>
          </div>

          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-0.5">
              <img
                src="https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg"
                className="w-full h-full rounded-full object-cover"
                alt="Chloe's story"
              />
            </div>
            <span className="text-xs text-gray-400">Chloe</span>
          </div>

          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 p-0.5">
              <img
                src="/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png"
                className="w-full h-full rounded-full object-cover"
                alt="Bruno's story"
              />
            </div>
            <span className="text-xs text-gray-400">Bruno</span>
          </div>

          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 p-0.5">
              <img
                src="/68b0317b-a179-4d0d-be79-5acd1397c2c8.jpeg"
                className="w-full h-full rounded-full object-cover"
                alt="Luna's story"
              />
            </div>
            <span className="text-xs text-gray-400">Luna</span>
          </div>

          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-0.5">
              <img
                src="/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg"
                className="w-full h-full rounded-full object-cover"
                alt="Diesel's story"
              />
            </div>
            <span className="text-xs text-gray-400">Diesel</span>
          </div>

          <div className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-0.5">
              <img
                src="/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg"
                className="w-full h-full rounded-full object-cover"
                alt="Sophie's story"
              />
            </div>
            <span className="text-xs text-gray-400">Sophie</span>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-0">
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Link href={`/creator/${post.username.replace('@', '')}`}>
                      <Avatar className="h-10 w-10 cursor-pointer">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.creator[0]}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/creator/${post.username.replace('@', '')}`}>
                          <span className="font-semibold cursor-pointer hover:text-blue-400">{post.creator}</span>
                        </Link>
                        {post.isVerified && <Badge className="bg-blue-500 text-xs">✓</Badge>}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{post.username}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${subscribedCreators.has(post.username) ? 'text-green-400 hover:bg-gray-800' : 'text-blue-400 hover:bg-gray-800'}`}
                    onClick={() => handleSubscribe(post.username)}
                  >
                    {subscribedCreators.has(post.username) ? 'Subscribed ✓' : 'Subscribe'}
                  </Button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-4">
                  <p className="text-gray-300 mb-4">{post.content}</p>
                </div>

                {/* Post Image */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt={`${post.creator}'s post`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button className="bg-white/20 backdrop-blur text-white hover:bg-white/30">
                      💦 Unlock Full Content
                    </Button>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
                        onClick={() => toggleLike(post.id)}
                      >
                        {likedPosts.has(post.id) ? '❤️' : '🤍'} {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        💬 {post.comments + (postComments[post.id]?.length || 0)}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        🔗 Share
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setShowTipDialog(post.id)}
                    >
                      💰 Tip
                    </Button>
                  </div>

                  <div className="text-sm text-gray-400 mb-4">
                    <span className="font-semibold text-white">{post.likes + (likedPosts.has(post.id) ? 1 : 0)} likes</span>
                  </div>

                  {/* Comments Section */}
                  {postComments[post.id] && (
                    <div className="mb-4 space-y-2 max-h-32 overflow-y-auto">
                      {postComments[post.id].map((comment, index) => (
                        <div key={index} className="text-sm text-gray-300">
                          {comment}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a comment... tell them how good they look 😍"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                      value={newComments[post.id] || ""}
                      onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                    />
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => addComment(post.id)}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
            Load more naughty content 🐕
          </Button>
        </div>
      </div>

      {/* Tip Dialog */}
      {showTipDialog && (
        <Dialog open={!!showTipDialog} onOpenChange={() => setShowTipDialog(null)}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Send a Tip 💰</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-300">Show your appreciation with a tip!</p>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => sendTip(5)}
                >
                  $5
                </Button>
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => sendTip(20)}
                >
                  $20
                </Button>
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => sendTip(50)}
                >
                  $50
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Custom amount..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur border-t border-gray-800 p-4">
        <div className="max-w-md mx-auto flex justify-around">
          <Link href="/feed">
            <Button variant="ghost" className="flex flex-col items-center text-blue-400">
              <span className="text-xl">🏠</span>
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/live">
            <Button variant="ghost" className="flex flex-col items-center text-gray-400">
              <span className="text-xl">🔴</span>
              <span className="text-xs">Live</span>
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost" className="flex flex-col items-center text-gray-400">
              <span className="text-xl">💬</span>
              <span className="text-xs">Messages</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-col items-center text-gray-400 relative">
            <span className="text-xl">🔔</span>
            <span className="text-xs">Notifications</span>
            {notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs min-w-[16px] h-4 flex items-center justify-center">
                {notifications.length}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
