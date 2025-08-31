"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Fake loading for authenticity
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Always "login" successfully regardless of credentials
    router.push("/feed")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Logo Section - Wider container */}
      <div className="w-full max-w-2xl text-center mb-8">
        <Link href="/" className="inline-block">
          <StrictlyWoofsLogo size="h-40" width={500} height={125} />
        </Link>
        <p className="text-gray-400 mt-2">Welcome back, you naughty pup</p>
      </div>

      {/* Form Section - Normal width */}
      <div className="w-full max-w-md">

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Log in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in and get frisky 🐕"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <Link
                href="#"
                className="block text-center text-blue-400 hover:text-blue-300 text-sm"
              >
                Forgot your password?
              </Link>

              <div className="text-center text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                  Sign up for free
                </Link>
              </div>
            </div>

            {/* Social Login (Fake) */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
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

        {/* Bottom text */}
        <p className="text-center text-gray-500 text-xs mt-8">
          By logging in, you agree to our Terms of Service and Privacy Policy.
          <br />
          Must be 18+ to view this tail-wagging content.
        </p>
      </div>
    </div>
  )
}
