"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo";
import {
  creators,
  getCreator,
  quickReplies,
  type ConversationMessage,
} from "@/lib/mockData";
import { appendConversationMessage, appendTransaction, readConversation, writeConversation } from "@/lib/mockStorage";

function initialMessages(creatorId: string): ConversationMessage[] {
  const creator = getCreator(creatorId) || creators[0];
  const now = Date.now();
  return [
    {
      id: `${creatorId}-welcome`,
      creatorId,
      sender: "creator",
      type: "text",
      content: `Welcome to my DMs. I am ${creator.name}, and yes, this conversation is monitored by a very judgmental tennis ball.`,
      timestamp: new Date(now - 1000 * 60 * 24).toISOString(),
    },
    {
      id: `${creatorId}-teaser`,
      creatorId,
      sender: "creator",
      type: "teaser",
      content: `Locked teaser: ${creator.chaosTraits[0]}. Subscribe or send a treat to unlock emotionally complicated barking.`,
      timestamp: new Date(now - 1000 * 60 * 12).toISOString(),
    },
  ];
}

function formatMessageTime(value: string) {
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const requestedCreator = searchParams.get("creator") || creators[0].id;
  const [selectedCreator, setSelectedCreator] = useState(getCreator(requestedCreator)?.id || creators[0].id);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [replyError, setReplyError] = useState("");
  const selectedRef = useRef(selectedCreator);
  const endRef = useRef<HTMLDivElement>(null);

  const currentCreator = getCreator(selectedCreator) || creators[0];

  useEffect(() => {
    const nextCreator = getCreator(requestedCreator)?.id || creators[0].id;
    setSelectedCreator(nextCreator);
  }, [requestedCreator]);

  useEffect(() => {
    selectedRef.current = selectedCreator;
    setReplyError("");
    setIsTyping(false);
    const stored = readConversation(selectedCreator);
    const next = stored.length ? stored : initialMessages(selectedCreator);
    if (!stored.length) writeConversation(selectedCreator, next);
    setMessages(next);
  }, [selectedCreator]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const filteredCreators = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return creators;
    return creators.filter(
      (creator) =>
        creator.name.toLowerCase().includes(normalized) ||
        creator.username.toLowerCase().includes(normalized) ||
        creator.tagline.toLowerCase().includes(normalized),
    );
  }, [search]);

  const sendCreatorReply = async (creatorId: string) => {
    setReplyError("");
    setIsTyping(true);
    try {
      const history = readConversation(creatorId).slice(-12).map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.content,
      }));
      const response = await fetch("/api/creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId, mode: "chat", messages: history }),
      });
      const result = await response.json();
      if (!response.ok || !result.text) throw new Error(result.error || "Could not get a reply.");
      appendConversationMessage({ creatorId, sender: "creator", type: "text", content: result.text });
      if (selectedRef.current === creatorId) setMessages(readConversation(creatorId));
    } catch (error) {
      if (selectedRef.current === creatorId) setReplyError(error instanceof Error ? error.message : "Could not get a reply.");
    } finally {
      if (selectedRef.current === creatorId) setIsTyping(false);
    }
  };

  const sendMessage = (content = newMessage) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    if (isTyping) return;
    appendConversationMessage({
      creatorId: selectedCreator,
      sender: "user",
      type: "text",
      content: trimmed,
    });
    setMessages(readConversation(selectedCreator));
    setNewMessage("");
    void sendCreatorReply(selectedCreator);
  };

  const sendTip = (amount: number) => {
    appendTransaction({
      creatorId: selectedCreator,
      amount,
      label: "DM treat transfer",
    });
    appendConversationMessage({
      creatorId: selectedCreator,
      sender: "user",
      type: "tip",
      content: `Sent $${amount.toFixed(2)} in treat money and one imaginary belly rub voucher.`,
    });
    setMessages(readConversation(selectedCreator));
    if (!isTyping) void sendCreatorReply(selectedCreator);
  };

  return (
    <div className="woof-messages flex min-h-screen bg-black text-white">
      <aside className="hidden w-80 shrink-0 border-r border-gray-800 md:flex md:flex-col">
        <div className="border-b border-gray-800 p-4">
          <Link href="/feed" className="mb-4 flex items-center gap-2">
            <StrictlyWoofsLogo size="h-10" width={160} height={48} />
            <span className="font-bold text-blue-400">DMs</span>
          </Link>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search needy pups..."
            className="border-gray-700 bg-gray-900 text-white placeholder-gray-500"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredCreators.map((creator) => {
            const stored = readConversation(creator.id);
            const lastMessage = stored.at(-1)?.content || creator.tagline;
            return (
              <button
                key={creator.id}
                className={`flex w-full items-center gap-3 border-b border-gray-900 p-4 text-left hover:bg-gray-900 ${selectedCreator === creator.id ? "bg-gray-900" : ""}`}
                onClick={() => setSelectedCreator(creator.id)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                  </Avatar>
                  {creator.status !== "offline" && <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-black bg-green-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold">{creator.name}</h3>
                    {creator.status === "live" && <Badge className="bg-red-500">Live</Badge>}
                  </div>
                  <p className="truncate text-sm text-gray-500">{lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-800 bg-black/95 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <Link href="/feed" className="md:hidden">
              <StrictlyWoofsLogo size="h-8" width={120} height={36} />
            </Link>
            <Avatar className="h-11 w-11">
              <AvatarImage src={currentCreator.avatar} />
              <AvatarFallback>{currentCreator.shortName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{currentCreator.name}</h1>
              <p className="text-sm text-gray-500">
                {currentCreator.status === "offline" ? "Last seen near the snack cabinet" : "Online and emotionally available"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/creator/${currentCreator.id}`}>
              <Button variant="outline" size="sm" className="border-gray-700 bg-black text-white hover:bg-gray-900">
                Profile
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="outline" size="sm" className="border-gray-700 bg-black text-white hover:bg-gray-900">
                Live
              </Button>
            </Link>
          </div>
        </header>

        <label className="block border-b border-gray-100 p-3 md:hidden">
          <span className="sr-only">Choose a creator</span>
          <select aria-label="Choose a creator" value={selectedCreator} onChange={(event) => setSelectedCreator(event.target.value)} className="w-full rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-800">
            {creators.map((creator) => <option key={creator.id} value={creator.id}>{creator.name}</option>)}
          </select>
        </label>

        <section className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {replyError && <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{replyError} <button className="underline" onClick={() => void sendCreatorReply(selectedCreator)}>Retry</button></div>}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : message.type === "tip"
                        ? "bg-yellow-700 text-white"
                        : message.type === "teaser"
                          ? "border border-pink-800 bg-pink-950/70 text-white"
                          : "bg-gray-900 text-white"
                  }`}
                >
                  {message.type === "teaser" && <Badge className="mb-2 bg-pink-600">Paw-per-view teaser</Badge>}
                  {message.type === "story" && <Badge className="mb-2 bg-purple-600">Story reply</Badge>}
                  <p>{message.content}</p>
                  <p className="mt-1 text-xs opacity-60">{formatMessageTime(message.timestamp)}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-gray-900 px-4 py-3 text-sm text-gray-300">
                  {currentCreator.shortName} is typing with suspicious paw accuracy...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </section>

        <footer className="border-t border-gray-800 bg-black p-4">
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickReplies.map((reply) => (
                <Button key={reply} disabled={isTyping} variant="outline" size="sm" className="shrink-0 border-gray-700 bg-gray-900 text-white hover:bg-gray-800" onClick={() => sendMessage(reply)}>
                  {reply}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[5, 20, 50].map((amount) => (
                <Button key={amount} size="sm" className="bg-yellow-700 hover:bg-yellow-800" onClick={() => sendTip(amount)}>
                  Tip ${amount}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                placeholder={`Message ${currentCreator.shortName} something unhinged...`}
                className="border-gray-700 bg-gray-900 text-white placeholder-gray-500"
              />
              <Button disabled={isTyping} className="bg-blue-600 hover:bg-blue-700" onClick={() => sendMessage()}>
                Send
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white">Loading DMs...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
