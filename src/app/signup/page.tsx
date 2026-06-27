"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Fake loading for authenticity
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Always "signup" successfully regardless of input
    router.push("/feed")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <StrictlyWoofsLogo size="h-16" width={200} height={50} />
          </Link>
          <p className="text-gray-400 mt-2">Join the hottest pack on the internet</p>
        </div>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create your account</CardTitle>
            <p className="text-center text-gray-400 text-sm">
              Start your journey into the wild side
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_sexy_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Make it strong like a good boy"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded bg-gray-800 border-gray-600"
                  required
                />
                <label htmlFor="terms" className="text-gray-300">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() =>
                      setInfo({
                        title: "Terms of Service",
                        body: "The terms are simple: no cats in the hot tub, no screenshots of the forbidden zoomies, and all fake payments are paid in emotional biscuits.",
                      })
                    }
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() =>
                      setInfo({
                        title: "Privacy Policy",
                        body: "Strictly Woofs stores toy app state in this browser. Your tail-wag analytics remain between you, localStorage, and the snack cabinet.",
                      })
                    }
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  id="age"
                  className="rounded bg-gray-800 border-gray-600"
                  required
                />
                <label htmlFor="age" className="text-gray-300">
                  I confirm I am 18+ and ready for adult dog content
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Join the pack 🐾"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300">
                  Log in here
                </Link>
              </div>
            </div>

            {/* Social Signup (Fake) */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => router.push("/feed")}
                >
                  🐕 DogBook
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => router.push("/feed")}
                >
                  🦴 BoneApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotional text */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-pink-400 mb-2">
            What you'll get with StrictlyWoofs:
          </h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>🔥 Unlimited access to exclusive pup content</li>
            <li>💬 Direct messaging with your favorite creators</li>
            <li>🎥 HD videos and premium photo sets</li>
            <li>🎁 Custom content requests and interactions</li>
            <li>🚫 Ad-free browsing experience</li>
          </ul>
        </div>
      </div>
      <Dialog open={!!info} onOpenChange={() => setInfo(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>{info?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">{info?.body}</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
