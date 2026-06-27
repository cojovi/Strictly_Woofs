"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import StrictlyWoofsLogo from "@/components/StrictlyWoofsLogo";
import {
  creators,
  getCreator,
  notifications as defaultNotifications,
  posts,
  stories,
  type Creator,
  type MockNotification,
  type Post,
  type Story,
} from "@/lib/mockData";
import {
  appendConversationMessage,
  appendTransaction,
  readStored,
  readStringSet,
  toggleStoredId,
  writeStored,
  writeStringSet,
} from "@/lib/mockStorage";

const storyReactions = ["Bark", "Howl", "Send treat", "Need paw-per-view"];

type TipTarget = { creator: Creator; post?: Post } | null;
type PaywallTarget = { creator: Creator; post?: Post } | null;
type ShareTarget = { creator: Creator; post: Post } | null;
type InfoModal = { title: string; body: string; action?: string } | null;

function creatorForPost(post: Post) {
  return getCreator(post.creatorId) || creators[0];
}

function moneyFromPrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : 5;
}

function StoryViewer({
  story,
  onClose,
  onReply,
}: {
  story: Story;
  onClose: () => void;
  onReply: (creatorId: string, prompt: string) => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = story.slides[slideIndex];
  const creator = getCreator(slide.creatorId) || creators[0];

  useEffect(() => {
    setSlideIndex(0);
  }, [story.id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % story.slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [story.slides.length]);

  return (
    <div className="fixed inset-0 z-[80] bg-black text-white">
      <div className="mx-auto flex h-full max-w-md flex-col bg-gray-950">
        <div className="flex gap-1 p-3">
          {story.slides.map((item, index) => (
            <button
              key={item.id}
              className={`h-1 flex-1 rounded-full ${index <= slideIndex ? "bg-white" : "bg-gray-700"}`}
              onClick={() => setSlideIndex(index)}
              aria-label={`Story slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{creator.name}</div>
              <div className="text-xs text-gray-400">24h chaos drop</div>
            </div>
          </div>
          <Button variant="ghost" className="text-white hover:bg-gray-800" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <img src={slide.image} alt={slide.caption} className="h-full w-full object-cover" />
          <button
            className="absolute left-0 top-0 h-full w-1/3"
            onClick={() => setSlideIndex((current) => (current === 0 ? story.slides.length - 1 : current - 1))}
            aria-label="Previous story"
          />
          <button
            className="absolute right-0 top-0 h-full w-1/3"
            onClick={() => setSlideIndex((current) => (current + 1) % story.slides.length)}
            aria-label="Next story"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
            <Badge className="mb-3 bg-pink-600">{creator.badge}</Badge>
            <p className="text-xl font-bold leading-tight">{slide.caption}</p>
            <p className="mt-2 text-sm text-gray-300">{creator.tagline}</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-gray-800 p-4">
          <div className="grid grid-cols-2 gap-2">
            {storyReactions.map((reaction) => (
              <Button
                key={reaction}
                variant="outline"
                className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
                onClick={() => onReply(creator.id, `${reaction}: ${slide.prompt}`)}
              >
                {reaction}
              </Button>
            ))}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => onReply(creator.id, slide.prompt)}>
            Reply in DMs
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [subscribedCreators, setSubscribedCreators] = useState<Set<string>>(new Set());
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<MockNotification[]>(defaultNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [tipTarget, setTipTarget] = useState<TipTarget>(null);
  const [customTip, setCustomTip] = useState("");
  const [paywallTarget, setPaywallTarget] = useState<PaywallTarget>(null);
  const [shareTarget, setShareTarget] = useState<ShareTarget>(null);
  const [infoModal, setInfoModal] = useState<InfoModal>(null);
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [postComments, setPostComments] = useState<Record<number, string[]>>({});

  useEffect(() => {
    setLikedPosts(readStringSet("liked-posts"));
    setSubscribedCreators(readStringSet("subscriptions"));
    setReadNotifications(readStringSet("read-notifications"));
    setNotifications(readStored<MockNotification[]>("notifications", defaultNotifications));
    setPostComments(readStored<Record<number, string[]>>("post-comments", {}));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const random = defaultNotifications[Math.floor(Math.random() * defaultNotifications.length)];
      const nextNotification = {
        ...random,
        id: `${random.id}-${Date.now()}`,
        time: "now",
        message: `${random.message} and also wants a legally binding belly rub`,
      };
      setNotifications((current) => {
        const next = [nextNotification, ...current].slice(0, 12);
        writeStored("notifications", next);
        return next;
      });
    }, 18000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts.slice(0, visibleCount);

    return posts.filter((post) => {
      const creator = creatorForPost(post);
      return (
        post.content.toLowerCase().includes(normalized) ||
        creator.name.toLowerCase().includes(normalized) ||
        creator.username.toLowerCase().includes(normalized) ||
        creator.specialties.some((specialty) => specialty.toLowerCase().includes(normalized))
      );
    });
  }, [query, visibleCount]);

  const searchCreators = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return creators
      .filter(
        (creator) =>
          creator.name.toLowerCase().includes(normalized) ||
          creator.username.toLowerCase().includes(normalized) ||
          creator.specialties.some((specialty) => specialty.toLowerCase().includes(normalized)),
      )
      .slice(0, 4);
  }, [query]);

  const unreadCount = notifications.filter((notification) => !readNotifications.has(notification.id)).length;

  const toggleLike = (postId: number) => {
    const next = toggleStoredId("liked-posts", String(postId));
    setLikedPosts(new Set(next));
  };

  const toggleSubscribe = (creatorId: string) => {
    const next = toggleStoredId("subscriptions", creatorId);
    setSubscribedCreators(new Set(next));
    const creator = getCreator(creatorId);
    if (creator && next.has(creatorId)) {
      setInfoModal({
        title: `${creator.shortName} unlocked`,
        body: `Subscription confirmed. The forbidden zoomies are now available, and ${creator.shortName} has been notified to act mysterious.`,
      });
    }
  };

  const submitComment = (post: Post) => {
    const value = newComments[post.id]?.trim();
    if (!value) return;
    const creator = creatorForPost(post);
    const comments = postComments[post.id] || [];
    const nextComments = {
      ...postComments,
      [post.id]: [...comments, `You: ${value}`, `${creator.shortName}: I saw that comment and wagged professionally.`],
    };
    setPostComments(nextComments);
    writeStored("post-comments", nextComments);
    setNewComments((current) => ({ ...current, [post.id]: "" }));
  };

  const sendTip = (amount: number) => {
    if (!tipTarget || amount <= 0) return;
    const receipt = appendTransaction({
      creatorId: tipTarget.creator.id,
      amount,
      label: tipTarget.post ? `Post tip for #${tipTarget.post.id}` : "Direct treat transfer",
    });
    appendConversationMessage({
      creatorId: tipTarget.creator.id,
      sender: "user",
      type: "tip",
      content: `Sent $${receipt.amount.toFixed(2)} in premium treat money.`,
    });
    setTipTarget(null);
    setCustomTip("");
    setInfoModal({
      title: "Treat receipt generated",
      body: `${tipTarget.creator.name} received $${amount.toFixed(2)} and immediately spent it emotionally on a squeaky luxury asset.`,
    });
  };

  const subscribeFromPaywall = () => {
    if (!paywallTarget) return;
    toggleSubscribe(paywallTarget.creator.id);
    setPaywallTarget(null);
  };

  const sharePost = async () => {
    if (!shareTarget) return;
    const url = `${window.location.origin}/creator/${shareTarget.creator.id}`;
    const text = `Strictly Woofs leak: ${shareTarget.creator.name} just posted "${shareTarget.post.content.slice(0, 70)}..." ${url}`;
    try {
      await navigator.clipboard?.writeText(text);
      setInfoModal({ title: "Share copied", body: "Copied a deeply unserious promo link to your clipboard." });
    } catch {
      setInfoModal({ title: "Share ready", body: text });
    }
    setShareTarget(null);
  };

  const markNotification = (notification: MockNotification) => {
    const next = new Set(readNotifications);
    next.add(notification.id);
    setReadNotifications(next);
    writeStringSet("read-notifications", next);
    setShowNotifications(false);

    if (notification.type === "message") {
      router.push(`/messages?creator=${notification.creatorId}`);
    } else if (notification.type === "live") {
      router.push("/live");
    } else if (notification.type === "story") {
      setSelectedStory(stories.find((story) => story.creatorId === notification.creatorId) || stories[0]);
    } else {
      router.push(`/creator/${notification.creatorId}`);
    }
  };

  const clearNotifications = () => {
    const next = new Set(notifications.map((notification) => notification.id));
    setReadNotifications(next);
    writeStringSet("read-notifications", next);
  };

  const sendStoryReply = (creatorId: string, prompt: string) => {
    appendConversationMessage({
      creatorId,
      sender: "user",
      type: "story",
      content: `Story reply: ${prompt}`,
    });
    setSelectedStory(null);
    router.push(`/messages?creator=${creatorId}`);
  };

  return (
    <div className="min-h-screen bg-black pb-24 text-white">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link href="/feed" className="shrink-0">
            <StrictlyWoofsLogo size="h-14" width={220} height={70} />
          </Link>

          <div className="relative min-w-0 flex-1">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pups, kinks, treats, suspicious milk..."
              className="h-12 border-gray-700 bg-gray-900 text-white placeholder-gray-500"
            />
            {query.trim() && (
              <div className="absolute left-0 right-0 top-14 z-50 rounded-lg border border-gray-700 bg-gray-950 p-3 shadow-2xl">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-gray-500">
                  <span>Search results</span>
                  <button onClick={() => setQuery("")} className="text-blue-400">
                    Clear
                  </button>
                </div>
                {searchCreators.length === 0 && filteredPosts.length === 0 && (
                  <p className="text-sm text-gray-400">No pup found. The search dog is under the couch.</p>
                )}
                <div className="space-y-2">
                  {searchCreators.map((creator) => (
                    <Link key={creator.id} href={`/creator/${creator.id}`} className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-900">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{creator.name}</div>
                        <div className="text-xs text-gray-500">{creator.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/messages">
              <Button variant="ghost" className="text-white hover:bg-gray-900">
                Messages
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="ghost" className="text-white hover:bg-gray-900">
                Live
              </Button>
            </Link>
            <div className="relative">
              <Button variant="ghost" className="relative text-white hover:bg-gray-900" onClick={() => setShowNotifications((value) => !value)}>
                Notifications
                {unreadCount > 0 && <Badge className="absolute -right-2 -top-2 bg-red-500">{unreadCount}</Badge>}
              </Button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-96 rounded-lg border border-gray-700 bg-gray-950 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-gray-800 p-4">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-gray-900" onClick={clearNotifications}>
                      Mark read
                    </Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => {
                      const creator = getCreator(notification.creatorId) || creators[0];
                      const isRead = readNotifications.has(notification.id);
                      return (
                        <button
                          key={notification.id}
                          className="flex w-full items-start gap-3 border-b border-gray-900 p-4 text-left hover:bg-gray-900"
                          onClick={() => markNotification(notification)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={creator.avatar} />
                            <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className={isRead ? "text-gray-500" : "text-white"}>
                              <span className="font-semibold text-blue-400">{creator.name}</span> {notification.message}
                            </p>
                            <p className="text-xs text-gray-500">{notification.time} ago</p>
                          </div>
                          {!isRead && <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setShowAccount((value) => !value)} aria-label="Open account menu">
                <Avatar className="h-10 w-10 border border-gray-700">
                  <AvatarFallback className="bg-gray-800">U</AvatarFallback>
                </Avatar>
              </button>
              {showAccount && (
                <div className="absolute right-0 top-12 w-72 rounded-lg border border-gray-700 bg-gray-950 p-3 shadow-2xl">
                  {["Wallet full of imaginary biscuits", "Creator dashboard rejected: not enough paws", "Privacy: your tail wags are encrypted", "Log out of the treat economy"].map((item) => (
                    <button
                      key={item}
                      className="block w-full rounded-md p-3 text-left text-sm hover:bg-gray-900"
                      onClick={() => {
                        setShowAccount(false);
                        setInfoModal({ title: "Account menu", body: `${item}. This is a local parody control, so nothing scary happened.` });
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_340px]">
        <section className="min-w-0">
          <div className="mb-6 rounded-lg border border-gray-800 bg-gradient-to-r from-pink-950/80 to-blue-950/80 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Your premium pup feed</h1>
                <p className="text-gray-300">Every interaction is fake. Every wag is legally compelling.</p>
              </div>
              <Button
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => setInfoModal({ title: "Daily bone bonus", body: "You claimed 3 imaginary biscuits and one deeply problematic wink." })}
              >
                Claim daily bone
              </Button>
            </div>
          </div>

          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex min-w-max gap-5">
              {stories.map((story) => {
                const creator = story.creatorId ? getCreator(story.creatorId) : undefined;
                return (
                  <button key={story.id} className="flex w-20 flex-col items-center gap-2" onClick={() => setSelectedStory(story)}>
                    <div className="rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-1">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-900">
                        {creator ? (
                          <img src={creator.avatar} alt={`${creator.name} story`} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-2xl">Hot</span>
                        )}
                      </div>
                    </div>
                    <span className="w-full truncate text-xs text-gray-400">{story.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post) => {
              const creator = creatorForPost(post);
              const liked = likedPosts.has(String(post.id));
              const subscribed = subscribedCreators.has(creator.id);
              const locked = post.locked && !subscribed;

              return (
                <Card key={post.id} className="overflow-hidden border-gray-800 bg-gray-950 text-white">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4">
                      <Link href={`/creator/${creator.id}`} className="flex items-center gap-3">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={creator.avatar} />
                          <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{creator.name}</span>
                            <Badge className="bg-blue-600">Verified</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {creator.username} - {post.timestamp}
                          </div>
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        className={subscribed ? "text-green-400 hover:bg-gray-900" : "text-blue-400 hover:bg-gray-900"}
                        onClick={() => toggleSubscribe(creator.id)}
                      >
                        {subscribed ? "Subscribed" : "Subscribe"}
                      </Button>
                    </div>

                    <p className="px-4 pb-4 text-gray-300">{post.content}</p>

                    <div className="relative bg-gray-900">
                      <img src={post.image} alt={`${creator.name} post`} className="h-[420px] w-full object-cover" />
                      {locked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                          <div className="max-w-sm text-center">
                            <div className="mb-2 text-4xl">Locked</div>
                            <h3 className="text-xl font-bold">Paw-per-view chaos</h3>
                            <p className="mt-2 text-sm text-gray-300">Subscribe to unlock {creator.shortName}'s forbidden zoomies and suspiciously curated haunch angles.</p>
                            <Button className="mt-4 bg-pink-600 hover:bg-pink-700" onClick={() => setPaywallTarget({ creator, post })}>
                              Unlock {post.ppvPrice || creator.price}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" className={liked ? "text-red-400 hover:bg-gray-900" : "text-gray-400 hover:bg-gray-900"} onClick={() => toggleLike(post.id)}>
                            {liked ? "Liked" : "Like"} {post.likes + (liked ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" className="text-gray-400 hover:bg-gray-900" onClick={() => setInfoModal({ title: "Comments", body: "Comment drawer already lives below the post. The moderation dog is awake." })}>
                            Comments {post.comments + (postComments[post.id]?.length || 0)}
                          </Button>
                          <Button variant="ghost" className="text-gray-400 hover:bg-gray-900" onClick={() => setShareTarget({ creator, post })}>
                            Share
                          </Button>
                        </div>
                        <Button variant="ghost" className="text-yellow-400 hover:bg-gray-900" onClick={() => setTipTarget({ creator, post })}>
                          Send treat money
                        </Button>
                      </div>

                      {postComments[post.id]?.length > 0 && (
                        <div className="space-y-2 rounded-lg bg-gray-900 p-3 text-sm text-gray-300">
                          {postComments[post.id].map((comment, index) => (
                            <div key={`${post.id}-${index}`}>{comment}</div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Input
                          value={newComments[post.id] || ""}
                          onChange={(event) => setNewComments((current) => ({ ...current, [post.id]: event.target.value }))}
                          onKeyDown={(event) => event.key === "Enter" && submitComment(post)}
                          placeholder={`Tell ${creator.shortName} something financially irresponsible...`}
                          className="border-gray-700 bg-gray-900 text-white placeholder-gray-500"
                        />
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => submitComment(post)}>
                          Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!query.trim() && visibleCount < posts.length && (
            <div className="py-8 text-center">
              <Button className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700" onClick={() => setVisibleCount((count) => count + 4)}>
                Load more suspicious content
              </Button>
            </div>
          )}
        </section>

        <aside className="hidden space-y-4 lg:block">
          <Card className="border-gray-800 bg-gray-950 text-white">
            <CardContent className="p-4">
              <h2 className="mb-3 font-semibold">Suggested creators</h2>
              <div className="space-y-3">
                {creators.slice(0, 6).map((creator) => (
                  <div key={creator.id} className="flex items-center justify-between gap-3">
                    <Link href={`/creator/${creator.id}`} className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.shortName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{creator.name}</div>
                        <div className="truncate text-xs text-gray-500">{creator.badge}</div>
                      </div>
                    </Link>
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-gray-900" onClick={() => toggleSubscribe(creator.id)}>
                      {subscribedCreators.has(creator.id) ? "On" : "Sub"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-950 text-white">
            <CardContent className="p-4">
              <h2 className="mb-3 font-semibold">Trending chaos</h2>
              {["Paw-per-view milk discourse", "Tank Thicc broke the couch algorithm", "Daisy Dukes biscuit scandal", "Sasha Sizzle ring light strike"].map((item) => (
                <button
                  key={item}
                  className="block w-full rounded-md p-3 text-left text-sm text-gray-300 hover:bg-gray-900"
                  onClick={() => setQuery(item.split(" ")[0])}
                >
                  {item}
                </button>
              ))}
            </CardContent>
          </Card>
        </aside>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800 bg-black/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md justify-around">
          <Link href="/feed">
            <Button variant="ghost" className="text-blue-400">Home</Button>
          </Link>
          <Link href="/live">
            <Button variant="ghost" className="text-gray-400">Live</Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost" className="text-gray-400">Messages</Button>
          </Link>
          <Button variant="ghost" className="relative text-gray-400" onClick={() => setShowNotifications(true)}>
            Alerts
            {unreadCount > 0 && <Badge className="absolute -right-1 -top-1 bg-red-500">{unreadCount}</Badge>}
          </Button>
        </div>
      </div>

      {selectedStory && <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} onReply={sendStoryReply} />}

      <Dialog open={!!tipTarget} onOpenChange={() => setTipTarget(null)}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>Send premium treat money</DialogTitle>
          </DialogHeader>
          {tipTarget && (
            <div className="space-y-4">
              <p className="text-gray-300">{tipTarget.creator.name} will receive a fake receipt, a real ego boost, and zero actual currency.</p>
              <div className="grid grid-cols-3 gap-2">
                {[5, 20, 50].map((amount) => (
                  <Button key={amount} className="bg-yellow-600 hover:bg-yellow-700" onClick={() => sendTip(amount)}>
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={customTip} onChange={(event) => setCustomTip(event.target.value)} placeholder="Custom treat budget" className="border-gray-700 bg-gray-900 text-white" />
                <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={() => sendTip(Number(customTip))}>
                  Send
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!paywallTarget} onOpenChange={() => setPaywallTarget(null)}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>Unlock the forbidden zoomies</DialogTitle>
          </DialogHeader>
          {paywallTarget && (
            <div className="space-y-4">
              <p className="text-gray-300">
                Subscribe to {paywallTarget.creator.name} for {paywallTarget.creator.price}. Includes premium paws, suspiciously intimate snack reviews, and locked posts on this device.
              </p>
              <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={subscribeFromPaywall}>
                Subscribe locally
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!shareTarget} onOpenChange={() => setShareTarget(null)}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>Share this pup</DialogTitle>
          </DialogHeader>
          {shareTarget && (
            <div className="space-y-4">
              <p className="text-gray-300">Copy a parody promo link for {shareTarget.creator.name}. Use responsibly or at least dramatically.</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={sharePost}>
                Copy share text
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!infoModal} onOpenChange={() => setInfoModal(null)}>
        <DialogContent className="border-gray-700 bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle>{infoModal?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">{infoModal?.body}</p>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setInfoModal(null)}>
            {infoModal?.action || "Understood"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
