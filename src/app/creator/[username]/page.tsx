import Link from "next/link"
import { Button } from "@/components/ui/button"
import CreatorProfileClient from "./CreatorProfileClient"

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

const creatorData: Record<string, CreatorData> = {
  "maxmuscles": {
    name: "Max Muscles",
    username: "@maxmuscles",
    avatar: "/MaxMuscles.jpg",
    coverImage: "/MaxMuscles.jpg",
    price: "$24.99/month",
    subscribers: "4.2k",
    bio: "German Shepherd with a body that would make Zeus jealous 💪 I spend my days pumping iron and my nights making your wildest fantasies come true. These muscles aren't just for show - I know exactly how to use them to make you beg for more. I'm looking for someone who appreciates a real alpha male who can go all night long. My stamina is legendary, and my technique is... let's just say I've never had any complaints 😈",
    stats: {
      posts: 247,
      likes: "12.3k",
      videos: 89,
      photos: 158
    },
    specialties: ["Muscle Worship", "Alpha Roleplay", "Workout Sessions", "Domination"],
    gallery: [
      "/MaxMuscles.jpg",
      "/MaxMuscles.jpg",
      "/MaxMuscles.jpg"
    ]
  },
  "chloeswims": {
    name: "Chloe Corgi",
    username: "@chloeswims",
    avatar: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
    coverImage: "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
    price: "$9.99/month",
    subscribers: "847",
    bio: "Petite Corgi with curves in all the right places 🏊‍♀️ I love getting wet and showing off my natural assets by the pool. My swimsuit collection is extensive, but I prefer au naturel. I'm a water baby who knows how to make waves - both in the pool and in the bedroom. My small size means I can fit into any position you desire. I specialize in making big splashes despite my compact frame 💦",
    stats: {
      posts: 156,
      likes: "8.7k",
      videos: 45,
      photos: 111
    },
    specialties: ["Pool Play", "Swimsuit Content", "Underwater Shots", "Petite Fantasy"],
    gallery: [
      "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg",
      "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
      "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg"
    ]
  },
  "brunomilk": {
    name: "Bruno Milk",
    username: "@brunomilk",
    avatar: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
    coverImage: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
    price: "$14.99/month",
    subscribers: "1.8k",
    bio: "Mysterious Boxer with an intense gaze that penetrates your soul 👀 I have a very particular way of drinking my milk - slow, deliberate, and incredibly sensual. My tongue work is legendary in these parts. I stare deep into your eyes while I lick, making sure you feel every moment of anticipation. My specialty is building tension until you can't take it anymore. The way I handle liquids will leave you absolutely mesmerized 🥛",
    stats: {
      posts: 198,
      likes: "9.4k",
      videos: 67,
      photos: 131
    },
    specialties: ["Intense Eye Contact", "Liquid Play", "ASMR Content", "Slow Teasing"],
    gallery: [
      "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
      "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
      "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png"
    ]
  },
  "bellaswims": {
    name: "Bella Poolside",
    username: "@bellaswims",
    avatar: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
    coverImage: "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
    price: "$12.99/month",
    subscribers: "1.2k",
    bio: "Sweet Corgi who loves making a splash 💧 I love showing off my natural beauty and getting wet by the water. My playful nature and innocent looks hide a very naughty side that I only share with my special subscribers. I enjoy long days by the pool and even longer nights with my fans 🌊",
    stats: {
      posts: 134,
      likes: "6.8k",
      videos: 38,
      photos: 96
    },
    specialties: ["Pool Content", "Natural Beauty", "Playful Sessions", "Innocent Look"],
    gallery: [
      "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
      "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg",
      "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg"
    ]
  },
  "puffyhusky": {
    name: "Puffy Husky",
    username: "@puffyhusky",
    avatar: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
    coverImage: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
    price: "$19.99/month",
    subscribers: "623",
    bio: "Fluffy Husky with a unique inflation fantasy 🎈 I love getting pumped up and showing off how big I can get. My specialty content involves expansion play and unique fantasies you won't find anywhere else. Want to see how big this pup can grow? 💥",
    stats: {
      posts: 89,
      likes: "4.2k",
      videos: 25,
      photos: 64
    },
    specialties: ["Inflation Fantasy", "Unique Content", "Size Play", "Creative Sessions"],
    gallery: [
      "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
      "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
      "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png"
    ]
  },
  "rockyrascal": {
    name: "Rocky Rascal",
    username: "@rockyrascal",
    avatar: "https://media.makeameme.org/created/when-you-see-5c4538.jpg",
    coverImage: "https://media.makeameme.org/created/when-you-see-5c4538.jpg",
    price: "$15.99/month",
    subscribers: "2.8k",
    bio: "Bad boy pug with that look that drives you wild 😈 I've been a very bad boy and need some punishment. Who's up for taming this rebel? I promise I'll be worth every moment of your time. My rebellious streak extends to the bedroom too 🔥",
    stats: {
      posts: 201,
      likes: "11.2k",
      videos: 72,
      photos: 129
    },
    specialties: ["Bad Boy Fantasy", "Rebellion Play", "Intense Looks", "Punishment Scenarios"],
    gallery: [
      "https://media.makeameme.org/created/when-you-see-5c4538.jpg",
      "https://media.makeameme.org/created/when-you-see-5c4538.jpg",
      "https://media.makeameme.org/created/when-you-see-5c4538.jpg"
    ]
  },
  "lunaluxe": {
    name: "Luna Luxe",
    username: "@lunaluxe",
    avatar: "/LunaLuxe.jpg",
    coverImage: "/LunaLuxe.jpg",
    price: "$18.99/month",
    subscribers: "2.1k",
    bio: "Elegant dog with sophistication and passion 💫 When elegance meets naughty... you know it's going to be special. My premium content is designed for discerning tastes only. Class and seduction in perfect harmony 💎",
    stats: {
      posts: 167,
      likes: "8.9k",
      videos: 45,
      photos: 122
    },
    specialties: ["Elegant Content", "Sophisticated Play", "Premium Experience", "Class & Seduction"],
    gallery: [
      "/LunaLuxe.jpg",
      "/LunaLuxe.jpg",
      "/LunaLuxe.jpg"
    ]
  },
  "zarawild": {
    name: "Zara Wild",
    username: "@zarawild",
    avatar: "/ZaraWild.jpg",
    coverImage: "/ZaraWild.jpg",
    price: "$11.99/month",
    subscribers: "892",
    bio: "New girl alert! 🚨 I may be fresh to the scene but I'm ready to show you wild things you've never seen before. Who wants to break me in? I'm eager to learn and even more eager to please 😈",
    stats: {
      posts: 78,
      likes: "3.4k",
      videos: 22,
      photos: 56
    },
    specialties: ["New Girl Experience", "Wild Sessions", "Learning & Growing", "Fresh Content"],
    gallery: [
      "/ZaraWild.jpg",
      "/ZaraWild.jpg",
      "/ZaraWild.jpg"
    ]
  },
  "dieseldaddy": {
    name: "Diesel Daddy",
    username: "@dieseldaddy",
    avatar: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
    coverImage: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
    price: "$22.99/month",
    subscribers: "3.5k",
    bio: "Your alpha has arrived 💪 I don't ask, I take control. Submit to my dominance and let daddy show you who's in charge. Good pups always obey their master. My authority is absolute 😈",
    stats: {
      posts: 298,
      likes: "15.7k",
      videos: 89,
      photos: 209
    },
    specialties: ["Alpha Dominance", "Control Play", "Master/Pet Dynamic", "Authority"],
    gallery: [
      "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
      "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
      "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg"
    ]
  },
  "sophiesweet": {
    name: "Sophie Sweet",
    username: "@sophiesweet",
    avatar: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
    coverImage: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
    price: "$13.99/month",
    subscribers: "1.7k",
    bio: "Sweet as honey but naughty as sin 🍯 I'm your innocent girl next door with a very naughty secret. Want to discover what makes this good girl so bad? Let me be your guilty pleasure 😘",
    stats: {
      posts: 145,
      likes: "7.3k",
      videos: 41,
      photos: 104
    },
    specialties: ["Sweet & Naughty", "Girl Next Door", "Secret Desires", "Innocent Look"],
    gallery: [
      "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
      "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
      "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg"
    ]
  },
  "milomagic": {
    name: "Milo Magic",
    username: "@milomagic",
    avatar: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
    coverImage: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
    price: "$16.99/month",
    subscribers: "1.4k",
    bio: "Magic happens when I get playful 🎭 Tonight's show features disappearing clothes and reappearing desires. Let me cast a spell that will leave you mesmerized. Abracadabra... and your clothes are gone ✨",
    stats: {
      posts: 112,
      likes: "5.8k",
      videos: 34,
      photos: 78
    },
    specialties: ["Magic Shows", "Illusion Play", "Mystical Content", "Spell Casting"],
    gallery: [
      "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
      "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
      "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg"
    ]
  },
  "rexrebel": {
    name: "Rex Rebel",
    username: "@rexrebel",
    avatar: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
    coverImage: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
    price: "$17.99/month",
    subscribers: "2.9k",
    bio: "Rules are meant to be broken 😈 Join my rebellion against boring content. I do things my way and I guarantee you've never seen anything like what I'm about to show you. Ready to break some rules? 🔥",
    stats: {
      posts: 189,
      likes: "9.7k",
      videos: 56,
      photos: 133
    },
    specialties: ["Rule Breaking", "Rebellious Content", "Unique Style", "Going Against Norms"],
    gallery: [
      "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
      "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
      "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg"
    ]
  }
}

export async function generateStaticParams() {
  const usernames = [
    "maxmuscles",
    "chloeswims",
    "brunomilk",
    "bellaswims",
    "puffyhusky",
    "rockyrascal",
    "lunaluxe",
    "zarawild",
    "dieseldaddy",
    "sophiesweet",
    "milomagic",
    "rexrebel"
  ]

  return usernames.map((username) => ({
    username: username,
  }))
}

export default async function CreatorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const creator = creatorData[username]

  if (!creator) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Creator Not Found</h1>
          <p className="text-gray-400 mb-8">This pup seems to have run away...</p>
          <Link href="/feed">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Feed
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return <CreatorProfileClient creator={creator} username={username} />
}
