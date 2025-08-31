import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StrictlyWoofsLogo width={150} height={40} />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/live">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                🔴 Live
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo Animation */}
          <div className="mb-8 flex justify-center">
            <div className="animate-bounce">
              <StrictlyWoofsLogo size="h-64" width={800} height={200} />
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-6 leading-tight">
            The most <span className="text-blue-400">exclusive</span>
            <br />
            content from the
            <br />
            <span className="text-pink-400">hottest</span> pups
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join StrictlyWoofs and get access to the most seductive tail-wagging,
            belly-showing, and absolutely irresistible content from dogs who know
            exactly how to work their charm.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-4 text-lg animate-pulse">
              Start getting naughty 🐕
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why good boys and girls choose <span className="text-blue-400">StrictlyWoofs</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold mb-3">Exclusive Tail Content</h3>
                <p className="text-gray-300">
                  Get access to premium tail wags, booty shakes, and exclusive "come hither" looks
                  that will make you melt.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-semibold mb-3">Direct Messaging</h3>
                <p className="text-gray-300">
                  Chat privately with your favorite furry creators. Send treats, get personalized
                  "good boy" messages, and maybe even a private belly rub session.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-3">Custom Requests</h3>
                <p className="text-gray-300">
                  Request custom content: specific poses, costumes, or that special "bedroom eyes"
                  look that only your favorite pup can deliver.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Creators Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Meet our <span className="text-pink-400">sexiest</span> creators
          </h2>
          <p className="text-center text-gray-300 mb-12">
            These irresistible pups are waiting to show you their most intimate moments
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/creator/chloeswims">
              <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className="relative">
                  <img
                    src="https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg"
                    alt="Chloe Corgi"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500">🔥 ONLINE</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Chloe Corgi</h3>
                    <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    "I love showing off my curves by the pool 💦 Subscribe for exclusive swimsuit content!"
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">847 subscribers</span>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      $9.99/month
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/creator/maxmuscles">
              <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className="relative">
                  <img
                    src="/ChatGPT_Image_Apr_25,_2025,_09_33_26_PM.png"
                    alt="Max Muscles"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-purple-500">👑 TOP 0.1%</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Max Muscles</h3>
                    <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    "I work out for you 💪 My abs and pecs aren't the only things that are rock hard..."
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">4.2k subscribers</span>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      $24.99/month
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/creator/brunomilk">
              <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className="relative">
                  <img
                    src="/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png"
                    alt="Bruno Milk"
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">💚 VERIFIED</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Bruno Milk</h3>
                    <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    "That intense stare when I'm drinking my special milk 👀 Want to see what else I lick?"
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">1.8k subscribers</span>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                      $14.99/month
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg"
                  alt="Bella Poolside"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-green-500">💚 VIP</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Bella Poolside</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "Come get wet with me 💧 I love making a splash and showing off my natural beauty"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">1.2k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $12.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="https://media.makeameme.org/created/when-you-see-5c4538.jpg"
                  alt="Rocky Rascal"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">🔥 TRENDING</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Rocky Rascal</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "That look when I catch you staring 😏 I'll be your bad boy fantasy come true"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2.8k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $15.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png"
                  alt="Puffy Husky"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-yellow-500">⚡ EXCLUSIVE</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Puffy Husky</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "I'm all pumped up and ready to burst 💥 Want to see how big I can get?"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">623 subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $19.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Row */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/68b0317b-a179-4d0d-be79-5acd1397c2c8.jpeg"
                  alt="Luna Luxe"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-blue-500">💎 PREMIUM</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Luna Luxe</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "Elegance meets passion 💫 Let me show you what class and seduction look like"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2.1k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $18.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/7f940b83-ea3f-46da-8761-d26dbc5d778c.jpeg"
                  alt="Zara Wild"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-orange-500">🔥 NEW</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Zara Wild</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "I'm new but I'm ready to get wild 🌪️ Watch me unleash my inner beast"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">892 subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $11.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg"
                  alt="Diesel Daddy"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">🔥 ALPHA</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Diesel Daddy</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "Your alpha is here 💪 Submit to my dominance and let me lead the pack"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">3.5k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $22.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fourth Row */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg"
                  alt="Sophie Sweet"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-pink-500">💕 SWEETHEART</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Sophie Sweet</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "Sweet as honey but naughty as sin 🍯 Let me be your guilty pleasure"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">1.7k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $13.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg"
                  alt="Milo Magic"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-purple-500">✨ MYSTIC</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Milo Magic</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "Magic happens when I get playful 🎭 Let me cast a spell on you"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">1.4k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $16.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src="/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg"
                  alt="Rex Rebel"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-yellow-500">⚡ REBEL</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Rex Rebel</h3>
                  <span className="text-pink-400">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "Rules are meant to be broken 😈 Join my rebellion against boring content"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2.9k subscribers</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    $17.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to unleash your desires?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of satisfied subscribers getting their daily dose of adorable,
            naughty pup content. Your wildest dog dreams are just a click away.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold">
              Join the pack now 🐾
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <StrictlyWoofsLogo size="h-10" width={120} height={30} />
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate destination for premium canine content and exclusive pup experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Safety</Link></li>
                <li><Link href="#" className="hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 StrictlyWoofs. All rights reserved. 🐕 Woof responsibly.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
