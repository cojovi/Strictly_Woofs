"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo";
import { posts, type Creator } from "@/lib/mockData";
import { appendConversationMessage, appendTransaction, readStringSet, toggleStoredId } from "@/lib/mockStorage";

export default function CreatorProfileClient({ creator }: { creator: Creator }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [customTip, setCustomTip] = useState("");
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null);

  const creatorPosts = useMemo(() => posts.filter((post) => post.creatorId === creator.id), [creator.id]);

  useEffect(() => {
    setIsSubscribed(readStringSet("subscriptions").has(creator.id));
  }, [creator.id]);

  const toggleSubscribe = () => {
    const next = toggleStoredId("subscriptions", creator.id);
    const subscribed = next.has(creator.id);
    setIsSubscribed(subscribed);
    setInfo({
      title: subscribed ? `${creator.shortName} unlocked` : `${creator.shortName} relocked`,
      body: subscribed
        ? `${creator.name} has been notified to act casual while the premium gallery unlocks on this browser.`
        : "Subscription canceled locally. The forbidden haunch angles have returned to the vault.",
    });
  };

  const sendTip = (amount: number) => {
    if (amount <= 0) return;
    appendTransaction({ creatorId: creator.id, amount, label: "Creator profile treat transfer" });
    appendConversationMessage({
      creatorId: creator.id,
      sender: "user",
      type: "tip",
      content: `Sent $${amount.toFixed(2)} from ${creator.name}'s profile because the thirst funnel worked.`,
    });
    setTipOpen(false);
    setCustomTip("");
    setInfo({
      title: "Treat transfer complete",
      body: `${creator.shortName} received $${amount.toFixed(2)} in imaginary snack liquidity and is now typing a suspicious thank-you.`,
    });
  };

  return (
    <div className="min-h-screen bg-black pb-16 text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 p-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/feed">
            <StrictlyWoofsLogo size="h-10" width={180} height={54} />
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/messages?creator=${creator.id}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-900">
                Message
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-900">
                Live
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative h-72 bg-gradient-to-r from-pink-950 to-blue-950">
        <img src={creator.coverImage} alt={`${creator.name} cover`} className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <main className="mx-auto max-w-6xl px-4">
        <section className="relative z-10 -mt-16 mb-8 flex flex-col gap-5 md:flex-row md:items-end">
          <Avatar className="h-32 w-32 border-4 border-black">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h1 className="text-4xl font-bold">{creator.name}</h1>
              <Badge className="bg-blue-600">Verified</Badge>
              <Badge className="bg-pink-600">{creator.badge}</Badge>
            </div>
            <p className="text-gray-400">{creator.username}</p>
            <p className="mt-3 max-w-2xl text-lg text-gray-200">{creator.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-400">
              <span><strong className="text-white">{creator.stats.posts}</strong> posts</span>
              <span><strong className="text-white">{creator.subscribers}</strong> subscribers</span>
              <span><strong className="text-white">{creator.stats.likes}</strong> likes</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className={isSubscribed ? "bg-gray-700 hover:bg-gray-600" : "bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700"} onClick={toggleSubscribe}>
              {isSubscribed ? "Subscribed" : `Subscribe ${creator.price}`}
            </Button>
            <Button variant="outline" className="border-gray-700 bg-black text-white hover:bg-gray-900" onClick={() => setTipOpen(true)}>
              Send treat
            </Button>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-[1fr_320px]">
          <div>
            <h2 className="mb-3 text-xl font-semibold">About {creator.shortName}</h2>
            <p className="leading-relaxed text-gray-300">{creator.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {creator.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="bg-gray-900 text-gray-300">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="border-gray-800 bg-gray-950 text-white">
            <CardContent className="space-y-3 p-5">
              <h3 className="font-semibold">Chaos stats</h3>
              {creator.chaosTraits.map((trait) => (
                <div key={trait} className="rounded-md bg-gray-900 p-3 text-sm text-gray-300">
                  {trait}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="posts">
          <TabsList className="bg-gray-950">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6 space-y-5">
            {(creatorPosts.length ? creatorPosts : posts.slice(0, 3)).map((post) => (
              <Card key={post.id} className="overflow-hidden border-gray-800 bg-gray-950 text-white">
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{creator.name}</div>
                        <div className="text-sm text-gray-500">{post.timestamp}</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{post.content}</p>
                  </div>
                  <div className="relative">
                    <img src={post.image} alt={`${creator.name} post`} className="h-80 w-full object-cover" />
                    {post.locked && !isSubscribed && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <Button className="bg-pink-600 hover:bg-pink-700" onClick={toggleSubscribe}>
                          Subscribe to view
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                  <img src={creator.gallery[index % creator.gallery.length]} alt={`${creator.name} gallery ${index + 1}`} className="h-full w-full object-cover" />
                  {!isSubscribed && index > 1 && (
                    <button className="absolute inset-0 bg-black/70 text-sm font-semibold text-white backdrop-blur-sm" onClick={toggleSubscribe}>
                      Unlock
                    </button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <button
                  key={index}
                  className="relative overflow-hidden rounded-lg bg-gray-900 text-left"
                  onClick={() =>
                    isSubscribed
                      ? setInfo({ title: "Video queued", body: `${creator.shortName}'s video player is fake, but the dramatic thumbnail is doing real emotional labor.` })
                      : toggleSubscribe()
                  }
                >
                  <img src={creator.gallery[index % creator.gallery.length]} alt={`${creator.name} video ${index + 1}`} className="h-52 w-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/60 px-5 py-4 text-2xl">Play</div>
                  </div>
                  {!isSubscribed && <Badge className="absolute right-3 top-3 bg-pink-600">Premium</Badge>}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={tipOpen} onOpenChange={setTipOpen}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>Tip {creator.shortName}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">Send fake money. Receive real nonsense.</p>
          <div className="grid grid-cols-3 gap-2">
            {[5, 20, 50].map((amount) => (
              <Button key={amount} className="bg-yellow-700 hover:bg-yellow-800" onClick={() => sendTip(amount)}>
                ${amount}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={customTip} onChange={(event) => setCustomTip(event.target.value)} placeholder="Custom amount" className="border-gray-700 bg-gray-900 text-white" />
            <Button className="bg-yellow-700 hover:bg-yellow-800" onClick={() => sendTip(Number(customTip))}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
