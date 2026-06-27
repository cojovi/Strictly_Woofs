"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo";
import { creators } from "@/lib/mockData";

export default function HomePage() {
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null);
  const featured = creators.slice(0, 9);

  const openFakePage = (label: string) => {
    setInfo({
      title: label,
      body: `${label} exists in spirit. The legal department is currently three dogs in a trench coat arguing over treat liability.`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <StrictlyWoofsLogo width={150} height={40} />
          <div className="flex items-center gap-2">
            <Link href="/live">
              <Button variant="ghost" className="text-white hover:bg-gray-900">Live</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-gray-900">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign up free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.28),transparent_32%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.24),transparent_30%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 flex justify-center">
            <StrictlyWoofsLogo size="h-56" width={740} height={190} />
          </div>
          <Badge className="mb-5 bg-pink-600 px-4 py-2 text-sm">The treat economy has gone too far</Badge>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Premium dog content from pups who absolutely know what they are doing.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-300">
            A deeply unserious creator platform parody where every wink, zoomie, pool shake, and couch collapse is locked behind fake paywalls and real commitment to the bit.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-blue-600 px-8 hover:from-pink-700 hover:to-blue-700">
                Join the pack
              </Button>
            </Link>
            <Link href="/feed">
              <Button size="lg" variant="outline" className="border-gray-700 bg-black text-white hover:bg-gray-900">
                Preview the feed
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-800 bg-gray-950 px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            ["Paw-per-view", "Locked posts, fake tips, and subscription gates with zero actual billing."],
            ["Live chaos", "Stream rooms where chat can tip, bark, and emotionally support furniture."],
            ["DM drama", "Message dogs who reply with suspiciously persuasive localStorage confidence."],
          ].map(([title, body]) => (
            <Card key={title} className="border-gray-800 bg-black text-white">
              <CardContent className="p-6">
                <h2 className="mb-2 text-xl font-bold">{title}</h2>
                <p className="text-gray-400">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-bold">Meet the creators</h2>
              <p className="text-gray-400">Verified pups. Questionable boundaries. Excellent thumbnails.</p>
            </div>
            <Link href="/feed">
              <Button variant="outline" className="border-gray-700 bg-black text-white hover:bg-gray-900">Open feed</Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((creator) => (
              <Link key={creator.id} href={`/creator/${creator.id}`}>
                <Card className="h-full overflow-hidden border-gray-800 bg-gray-950 text-white transition-transform hover:scale-[1.02]">
                  <div className="relative">
                    <img src={creator.avatar} alt={creator.name} className="h-56 w-full object-cover" />
                    <Badge className="absolute right-3 top-3 bg-pink-600">{creator.badge}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold">{creator.name}</h3>
                      <span className="text-sm text-blue-400">{creator.price}</span>
                    </div>
                    <p className="text-sm text-gray-400">{creator.tagline}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-pink-950 to-blue-950 px-4 py-16 text-center">
        <h2 className="text-4xl font-bold">Ready to financially enable the zoomies?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-300">Join thousands of imaginary subscribers in the world's least necessary dog creator economy.</p>
        <Link href="/signup">
          <Button size="lg" className="mt-8 bg-white text-black hover:bg-gray-200">Subscribe to nonsense</Button>
        </Link>
      </section>

      <footer className="border-t border-gray-800 px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          <div>
            <StrictlyWoofsLogo size="h-10" width={120} height={30} />
            <p className="mt-4 text-sm text-gray-500">The ultimate destination for premium canine satire.</p>
          </div>
          {[
            ["Company", ["About Us", "Careers", "Press"]],
            ["Support", ["Help Center", "Safety", "Community Guidelines"]],
            ["Legal", ["Terms of Service", "Privacy Policy", "Cookie Policy"]],
          ].map(([heading, links]) => (
            <div key={heading as string}>
              <h4 className="mb-4 font-semibold">{heading}</h4>
              <div className="space-y-2">
                {(links as string[]).map((label) => (
                  <button key={label} className="block text-sm text-gray-500 hover:text-white" onClick={() => openFakePage(label)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>

      <Dialog open={!!info} onOpenChange={() => setInfo(null)}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>{info?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">{info?.body}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
