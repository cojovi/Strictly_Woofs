"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo";
import { appendConversationMessage, appendTransaction } from "@/lib/mockStorage";
import { creators, defaultCreatorReply, getCreator, liveStreams, type LiveStream } from "@/lib/mockData";

interface LiveChatMessage {
  id: string;
  user: string;
  message: string;
  tip: number;
  createdAt: string;
}

const seedChat = [
  "This stream has suspicious haunch energy.",
  "Can you bark once for premium members?",
  "The lighting is doing legal work.",
  "I just subscribed with my whole emotional budget.",
  "Please tell the couch we support it.",
];

function makeChatMessage(message: string, user = "PupFan", tip = 0): LiveChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    user,
    message,
    tip,
    createdAt: new Date().toISOString(),
  };
}

export default function LivePage() {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null);

  const currentCreator = selectedStream ? getCreator(selectedStream.creatorId) || creators[0] : null;

  useEffect(() => {
    if (!selectedStream) return;
    setViewerCount(selectedStream.viewers);
    setChatMessages(seedChat.slice(0, 4).map((message, index) => makeChatMessage(message, `Viewer${index + 1}`, index === 1 ? 20 : 0)));
  }, [selectedStream]);

  useEffect(() => {
    if (!selectedStream || !currentCreator) return;
    const timer = window.setInterval(() => {
      const reply = defaultCreatorReply[Math.floor(Math.random() * defaultCreatorReply.length)];
      setChatMessages((current) => [...current.slice(-24), makeChatMessage(reply, currentCreator.shortName, Math.random() > 0.8 ? 10 : 0)]);
      setViewerCount((count) => Math.max(1, count + Math.floor(Math.random() * 17) - 6));
    }, 3500);

    return () => window.clearInterval(timer);
  }, [selectedStream, currentCreator]);

  const live = useMemo(() => liveStreams.filter((stream) => stream.isLive), []);
  const offline = useMemo(() => liveStreams.filter((stream) => !stream.isLive), []);

  const selectStream = (stream: LiveStream) => {
    if (!stream.isLive) {
      const creator = getCreator(stream.creatorId) || creators[0];
      setInfo({
        title: `${creator.shortName} is offline`,
        body: "This stream is resting, probably because the lifeguard asked too many questions. You can still message the creator.",
      });
      return;
    }
    setSelectedStream(stream);
  };

  const sendChatMessage = () => {
    const value = chatInput.trim();
    if (!value || !currentCreator) return;
    setChatMessages((current) => [...current.slice(-24), makeChatMessage(value, "You")]);
    appendConversationMessage({
      creatorId: currentCreator.id,
      sender: "user",
      type: "text",
      content: `Live chat: ${value}`,
    });
    setChatInput("");
  };

  const sendTip = (amount: number) => {
    if (!currentCreator) return;
    appendTransaction({ creatorId: currentCreator.id, amount, label: "Live stream treat blast" });
    appendConversationMessage({
      creatorId: currentCreator.id,
      sender: "user",
      type: "tip",
      content: `Sent $${amount.toFixed(2)} during the live stream. The chat saw everything.`,
    });
    setChatMessages((current) => [...current.slice(-24), makeChatMessage(`Sent $${amount} in live treat money.`, "You", amount)]);
  };

  if (selectedStream && currentCreator) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800 p-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-gray-900" onClick={() => setSelectedStream(null)}>
                Back
              </Button>
              <Link href="/feed">
                <StrictlyWoofsLogo size="h-10" width={180} height={54} />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-red-600">Live</Badge>
              <span className="text-gray-400">{viewerCount.toLocaleString()} viewers</span>
            </div>
          </div>
        </header>

        <main className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-[1fr_360px]">
          <section className="flex flex-col">
            <div className="relative min-h-[58vh] flex-1 bg-gray-950">
              <img src={currentCreator.coverImage} alt={selectedStream.title} className="h-full min-h-[58vh] w-full object-cover" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge className="bg-red-600">Live</Badge>
                {selectedStream.tags.map((tag) => (
                  <Badge key={tag} className="bg-black/60">{tag}</Badge>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={currentCreator.avatar} />
                    <AvatarFallback>{currentCreator.shortName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">{selectedStream.title}</h1>
                    <p className="text-gray-300">{currentCreator.name} - {currentCreator.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[5, 20, 50].map((amount) => (
                    <Button key={amount} className="bg-yellow-700 hover:bg-yellow-800" onClick={() => sendTip(amount)}>
                      Tip ${amount}
                    </Button>
                  ))}
                  <Link href={`/messages?creator=${currentCreator.id}`}>
                    <Button variant="outline" className="border-gray-600 bg-black/60 text-white hover:bg-black">
                      Private chat
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <aside className="flex min-h-[420px] flex-col border-l border-gray-800 bg-gray-950">
            <div className="border-b border-gray-800 p-4">
              <h2 className="font-bold">Live chat</h2>
              <p className="text-sm text-gray-500">A legally unserious room</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className={message.user === "You" ? "font-semibold text-blue-400" : "font-semibold text-gray-200"}>{message.user}</span>
                    {message.tip > 0 && <Badge className="bg-yellow-700">${message.tip}</Badge>}
                  </div>
                  <p className={message.tip > 0 ? "text-yellow-200" : "text-gray-400"}>{message.message}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 p-4">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && sendChatMessage()}
                  placeholder="Say something chaotic..."
                  className="border-gray-700 bg-gray-900 text-white"
                />
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={sendChatMessage}>Send</Button>
              </div>
            </div>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/feed">
            <StrictlyWoofsLogo size="h-12" width={200} height={60} />
          </Link>
          <div className="flex gap-2">
            <Link href="/messages">
              <Button variant="ghost" className="text-white hover:bg-gray-900">Messages</Button>
            </Link>
            <Link href="/feed">
              <Button variant="ghost" className="text-white hover:bg-gray-900">Feed</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Live Now</h1>
            <p className="text-gray-400">Premium pups broadcasting from questionable rooms.</p>
          </div>
          <Badge className="w-fit bg-red-600 px-4 py-2 text-base">{live.length} streams live</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {live.map((stream) => {
            const creator = getCreator(stream.creatorId) || creators[0];
            return (
              <Card key={stream.id} className="cursor-pointer overflow-hidden border-gray-800 bg-gray-950 text-white transition-transform hover:scale-[1.02]" onClick={() => selectStream(stream)}>
                <div className="relative">
                  <img src={creator.coverImage} alt={stream.title} className="h-56 w-full object-cover" />
                  <Badge className="absolute left-3 top-3 bg-red-600">Live</Badge>
                  <div className="absolute right-3 top-3 rounded bg-black/70 px-2 py-1 text-sm">{stream.viewers.toLocaleString()} watching</div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{creator.name}</h2>
                      <p className="text-sm text-gray-500">{creator.username}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{stream.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <h2 className="mb-4 mt-10 text-2xl font-bold text-gray-400">Recently offline</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {offline.map((stream) => {
            const creator = getCreator(stream.creatorId) || creators[0];
            return (
              <button key={stream.id} className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950 text-left opacity-70 hover:opacity-100" onClick={() => selectStream(stream)}>
                <img src={creator.avatar} alt={creator.name} className="h-36 w-full object-cover" />
                <div className="p-3">
                  <div className="font-semibold">{creator.name}</div>
                  <div className="text-sm text-gray-500">{stream.title}</div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Dialog open={!!info} onOpenChange={() => setInfo(null)}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>{info?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">{info?.body}</p>
          {info && (
            <Link href="/messages">
              <Button className="bg-blue-600 hover:bg-blue-700">Open messages</Button>
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
