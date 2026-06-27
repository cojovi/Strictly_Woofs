export interface Creator {
  id: string;
  name: string;
  username: string;
  shortName: string;
  avatar: string;
  coverImage: string;
  price: string;
  subscribers: string;
  bio: string;
  tagline: string;
  status: "online" | "live" | "offline";
  badge: string;
  stats: {
    posts: number;
    likes: string;
    videos: number;
    photos: number;
  };
  specialties: string[];
  gallery: string[];
  chaosTraits: string[];
}

export interface Post {
  id: number;
  creatorId: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
  locked?: boolean;
  ppvPrice?: string;
}

export interface StorySlide {
  id: string;
  creatorId: string;
  image: string;
  caption: string;
  prompt: string;
}

export interface Story {
  id: string;
  label: string;
  creatorId?: string;
  slides: StorySlide[];
}

export interface MockNotification {
  id: string;
  creatorId: string;
  message: string;
  time: string;
  type: "message" | "live" | "tip" | "post" | "story";
}

export interface LiveStream {
  id: string;
  creatorId: string;
  title: string;
  viewers: number;
  tags: string[];
  isLive: boolean;
}

export interface MockTransaction {
  id: string;
  creatorId: string;
  amount: number;
  label: string;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  creatorId: string;
  sender: "user" | "creator";
  content: string;
  timestamp: string;
  type: "text" | "tip" | "teaser" | "story";
}

const dogPool =
  "https://thumbs.dreamstime.com/b/adorable-corgi-dog-enyoing-swim-pool-vacation-pink-swimsuit-sunglasses-themes-hot-holidays-funny-pet-meme-318403919.jpg";
const dogPoolTwo =
  "https://thumbs.dreamstime.com/b/cute-corgi-looking-camera-sitting-pool-blue-water-vacation-meme-humor-hot-summer-holidays-dogs-317833592.jpg";
const memePug = "https://media.makeameme.org/created/when-you-see-5c4538.jpg";

export const creators: Creator[] = [
  {
    id: "maxmuscles",
    name: "Max Muscles",
    username: "@maxmuscles",
    shortName: "Max",
    avatar: "/MaxMuscles.jpg",
    coverImage: "/MaxMuscles.jpg",
    price: "$24.99/month",
    subscribers: "4.2k",
    status: "live",
    badge: "Top 0.1%",
    tagline: "Certified personal trainer, uncertified couch thief.",
    bio: "German Shepherd with a body that would make Zeus jealous. I spend my days pumping iron and my nights guarding the treat drawer with suspicious intensity.",
    stats: { posts: 247, likes: "12.3k", videos: 89, photos: 158 },
    specialties: ["Muscle worship", "Alpha zoomies", "Protein shakes", "Dominant eye contact"],
    gallery: ["/MaxMuscles.jpg", "/ChatGPT_Image_Apr_25,_2025,_09_33_26_PM.png", "/strictly_logo_full1.png"],
    chaosTraits: ["bench presses squeaky toys", "calls every walk leg day", "sleeps in compression shorts"],
  },
  {
    id: "chloeswims",
    name: "Chloe Corgi",
    username: "@chloeswims",
    shortName: "Chloe",
    avatar: dogPool,
    coverImage: dogPool,
    price: "$9.99/month",
    subscribers: "847",
    status: "online",
    badge: "Poolside menace",
    tagline: "Short legs. Tall standards. Wet paws.",
    bio: "Petite corgi with big pool energy. I make dramatic splashes, steal pool noodles, and refuse to apologize for looking incredible in goggles.",
    stats: { posts: 156, likes: "8.7k", videos: 45, photos: 111 },
    specialties: ["Pool play", "Swimsuit chaos", "Noodle theft", "Petite fantasy"],
    gallery: [dogPool, dogPoolTwo, dogPool],
    chaosTraits: ["charges extra for towel shakes", "blocked by three pool filters", "tiny but unionized"],
  },
  {
    id: "brunomilk",
    name: "Bruno Milk",
    username: "@brunomilk",
    shortName: "Bruno",
    avatar: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
    coverImage: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
    price: "$14.99/month",
    subscribers: "1.8k",
    status: "online",
    badge: "Verified licker",
    tagline: "The glass is half full because I already drank the rest.",
    bio: "Mysterious boxer with an intense gaze and a dairy-forward personal brand. My ASMR is mostly slurping and legal disclaimers.",
    stats: { posts: 198, likes: "9.4k", videos: 67, photos: 131 },
    specialties: ["Milk ASMR", "Slow teasing", "Unbroken stare", "Bowl cleanup"],
    gallery: ["/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png", "/BrunoMilk.jpg", "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png"],
    chaosTraits: ["has a lactose lawyer", "stares into the Ring camera", "licked the subscribe button"],
  },
  {
    id: "bellaswims",
    name: "Bella Poolside",
    username: "@bellaswims",
    shortName: "Bella",
    avatar: dogPoolTwo,
    coverImage: dogPoolTwo,
    price: "$12.99/month",
    subscribers: "1.2k",
    status: "offline",
    badge: "VIP floof",
    tagline: "Currently wet. Emotionally wetter.",
    bio: "Sweet corgi who loves making a splash and acting innocent while absolutely knowing what she did to the patio furniture.",
    stats: { posts: 134, likes: "6.8k", videos: 38, photos: 96 },
    specialties: ["Pool content", "Natural beauty", "Playful sessions", "Innocent look"],
    gallery: [dogPoolTwo, dogPoolTwo, dogPool],
    chaosTraits: ["sells pool water as artisan broth", "banned from floaties", "winks with both eyes"],
  },
  {
    id: "puffyhusky",
    name: "Puffy Husky",
    username: "@puffyhusky",
    shortName: "Puffy",
    avatar: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
    coverImage: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
    price: "$19.99/month",
    subscribers: "623",
    status: "online",
    badge: "Exclusive",
    tagline: "Fluff expands to fill available attention.",
    bio: "A husky with premium volume and opera-level opinions. Subscribe for expansion, dramatic sighing, and forbidden couch footage.",
    stats: { posts: 89, likes: "4.2k", videos: 25, photos: 64 },
    specialties: ["Inflation fantasy", "Singing at sirens", "Size play", "Creative sessions"],
    gallery: ["/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png", "/Gemini_Generated_Image_naz2rsnaz2rsnaz2.png", "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png"],
    chaosTraits: ["howls in sponsored content", "requires 4K for fluff detail", "ate the ring light"],
  },
  {
    id: "rockyrascal",
    name: "Rocky Rascal",
    username: "@rockyrascal",
    shortName: "Rocky",
    avatar: memePug,
    coverImage: memePug,
    price: "$15.99/month",
    subscribers: "2.8k",
    status: "online",
    badge: "Bad boy",
    tagline: "That look means the trash can is already open.",
    bio: "Bad boy pug with legal problems and a stare that says he knows where the snacks are hidden.",
    stats: { posts: 201, likes: "11.2k", videos: 72, photos: 129 },
    specialties: ["Bad boy fantasy", "Rebellion play", "Trash raids", "Punishment scenarios"],
    gallery: [memePug, memePug, memePug],
    chaosTraits: ["owes money to the Roomba", "forbidden from brunch", "wears one tiny chain"],
  },
  {
    id: "lunaluxe",
    name: "Luna Luxe",
    username: "@lunaluxe",
    shortName: "Luna",
    avatar: "/LunaLuxe.jpg",
    coverImage: "/LunaLuxe.jpg",
    price: "$18.99/month",
    subscribers: "2.1k",
    status: "online",
    badge: "Premium",
    tagline: "Elegance, but with stolen socks.",
    bio: "Sophisticated glam dog with premium taste and a suspicious number of velvet blankets.",
    stats: { posts: 167, likes: "8.9k", videos: 45, photos: 122 },
    specialties: ["Elegant content", "Luxury lounging", "Premium experience", "Sock couture"],
    gallery: ["/LunaLuxe.jpg", "/68b0317b-a179-4d0d-be79-5acd1397c2c8.jpeg", "/LunaLuxe.jpg"],
    chaosTraits: ["has a rider for filtered water", "calls kibble rustic", "owns a chaise lounge"],
  },
  {
    id: "zarawild",
    name: "Zara Wild",
    username: "@zarawild",
    shortName: "Zara",
    avatar: "/ZaraWild.jpg",
    coverImage: "/ZaraWild.jpg",
    price: "$11.99/month",
    subscribers: "892",
    status: "online",
    badge: "New",
    tagline: "Fresh to the pack. Already banned from curtains.",
    bio: "New girl alert with wild zoomies and a concerning relationship with throw pillows.",
    stats: { posts: 78, likes: "3.4k", videos: 22, photos: 56 },
    specialties: ["New girl experience", "Wild sessions", "Curtain climbing", "Fresh content"],
    gallery: ["/ZaraWild.jpg", "/7f940b83-ea3f-46da-8761-d26dbc5d778c.jpeg", "/ZaraWild.jpg"],
    chaosTraits: ["learned monetization yesterday", "speedruns hallway laps", "barks at tax software"],
  },
  {
    id: "dieseldaddy",
    name: "Diesel Daddy",
    username: "@dieseldaddy",
    shortName: "Diesel",
    avatar: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
    coverImage: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
    price: "$22.99/month",
    subscribers: "3.5k",
    status: "offline",
    badge: "Alpha",
    tagline: "He does not fetch. He delegates.",
    bio: "Your alpha has arrived with contractually obligated growls and a premium leadership package.",
    stats: { posts: 298, likes: "15.7k", videos: 89, photos: 209 },
    specialties: ["Alpha dominance", "Control play", "Master/pet dynamic", "Authority"],
    gallery: ["/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg", "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg", "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg"],
    chaosTraits: ["charges a leadership fee", "refuses baby voice", "sits like a CEO"],
  },
  {
    id: "sophiesweet",
    name: "Sophie Sweet",
    username: "@sophiesweet",
    shortName: "Sophie",
    avatar: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
    coverImage: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
    price: "$13.99/month",
    subscribers: "1.7k",
    status: "online",
    badge: "Sweetheart",
    tagline: "Looks innocent. Knows exactly where the cheese lives.",
    bio: "Sweet as honey, suspiciously fast near an unattended plate, and emotionally available for premium belly rubs.",
    stats: { posts: 145, likes: "7.3k", videos: 41, photos: 104 },
    specialties: ["Sweet and naughty", "Girl next door", "Cheese detection", "Innocent look"],
    gallery: ["/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg", "/bb85ecc0-632b-45a1-97af-987fa2d64f28 2.jpeg", "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg"],
    chaosTraits: ["weaponized puppy eyes", "keeps receipts in the toy bin", "flirts for cheddar"],
  },
  {
    id: "milomagic",
    name: "Milo Magic",
    username: "@milomagic",
    shortName: "Milo",
    avatar: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
    coverImage: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
    price: "$16.99/month",
    subscribers: "1.4k",
    status: "offline",
    badge: "Mystic",
    tagline: "Now you see the treat. Now you don't.",
    bio: "Magic happens when Milo gets playful. Mostly because your sandwich vanishes during the applause.",
    stats: { posts: 112, likes: "5.8k", videos: 34, photos: 78 },
    specialties: ["Magic shows", "Illusion play", "Mystical content", "Treat disappearance"],
    gallery: ["/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg", "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg", "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg"],
    chaosTraits: ["sawed the leash in half", "misdirects with tail wag", "banned from birthday parties"],
  },
  {
    id: "rexrebel",
    name: "Rex Rebel",
    username: "@rexrebel",
    shortName: "Rex",
    avatar: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
    coverImage: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
    price: "$17.99/month",
    subscribers: "2.9k",
    status: "online",
    badge: "Rebel",
    tagline: "Rules are for cats and people with clean rugs.",
    bio: "Rules are meant to be broken, especially the one about not standing on the coffee table.",
    stats: { posts: 189, likes: "9.7k", videos: 56, photos: 133 },
    specialties: ["Rule breaking", "Rebellious content", "Counter surfing", "Going against norms"],
    gallery: ["/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg", "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg", "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg"],
    chaosTraits: ["ate the terms of service", "does not acknowledge bedtime", "anti-leash activist"],
  },
  {
    id: "daisydukes",
    name: "Daisy Dukes",
    username: "@daisydukes",
    shortName: "Daisy",
    avatar: "/DaisyDukes_1.jpg",
    coverImage: "/DaisyDukes_2.jpg",
    price: "$16.49/month",
    subscribers: "2.4k",
    status: "online",
    badge: "Country glam",
    tagline: "Daisy by name, chaos by subscription.",
    bio: "Southern belle energy with enough sass to make a porch swing nervous. Subscribe for hay bale glamour, suspicious wink tutorials, and premium biscuit thirst traps.",
    stats: { posts: 171, likes: "10.1k", videos: 53, photos: 118 },
    specialties: ["Porch glam", "Country flirt", "Biscuit bait", "Dramatic side-eye"],
    gallery: ["/DaisyDukes_1.jpg", "/DaisyDukes_2.jpg", "/DaisyDukes_1.jpg"],
    chaosTraits: ["says bless your heart threateningly", "sells premium biscuit crumbs", "owns rhinestone paw boots"],
  },
  {
    id: "sashasizzle",
    name: "Sasha Sizzle",
    username: "@sashasizzle",
    shortName: "Sasha",
    avatar: "/SashaSizzle_1.jpg",
    coverImage: "/SashaSizzle_2.jpg",
    price: "$21.00/month",
    subscribers: "3.1k",
    status: "live",
    badge: "Sizzle verified",
    tagline: "Hotter than sidewalk paws in July.",
    bio: "High-glam firecracker with a strict no-boring-content policy. Sasha specializes in dramatic entrances, luxury panting, and weaponized confidence.",
    stats: { posts: 214, likes: "14.8k", videos: 77, photos: 137 },
    specialties: ["Heat checks", "Glam shots", "Luxury panting", "Main character zoomies"],
    gallery: ["/SashaSizzle_1.jpg", "/SashaSizzle_2.jpg", "/SashaSizzle_1.jpg"],
    chaosTraits: ["requires a wind machine", "blocked the sun for better lighting", "charges extra for smolder"],
  },
  {
    id: "tankthicc",
    name: "Tank Thicc",
    username: "@tankthicc",
    shortName: "Tank",
    avatar: "/TankThicc_1.jpg",
    coverImage: "/TankThicc_2.jpg",
    price: "$26.99/month",
    subscribers: "5.6k",
    status: "online",
    badge: "Thicc legend",
    tagline: "Built like a loveseat. Moves like a rumor.",
    bio: "Tank is all mass, mystery, and premium tail torque. He does not enter rooms; rooms accept him.",
    stats: { posts: 305, likes: "19.2k", videos: 101, photos: 204 },
    specialties: ["Thicc cam", "Couch domination", "Slow-motion stomps", "Snack intimidation"],
    gallery: ["/TankThicc_1.jpg", "/TankThicc_2.jpg", "/TankThicc_1.jpg"],
    chaosTraits: ["has gravitational pull", "sits once and owns the furniture", "premium subscribers hear the floor creak"],
  },
];

export const getCreator = (id: string) => creators.find((creator) => creator.id === id);

export const posts: Post[] = [
  {
    id: 1,
    creatorId: "maxmuscles",
    content: "Just finished my workout. These glutes do not guard themselves. Subscribe for the forbidden flex and a 14-page treat macro plan.",
    image: "/MaxMuscles.jpg",
    likes: 1234,
    comments: 289,
    timestamp: "1 hour ago",
    locked: true,
    ppvPrice: "$8.99",
  },
  {
    id: 2,
    creatorId: "chloeswims",
    content: "Pool day. Tiny legs, giant splash radius. DM me the word WET PAWS and I will send you my most illegal towel shake.",
    image: dogPool,
    likes: 567,
    comments: 123,
    timestamp: "3 hours ago",
  },
  {
    id: 3,
    creatorId: "brunomilk",
    content: "Slow milk tasting at sunset. The glass was nervous. I was professional.",
    image: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png",
    likes: 789,
    comments: 156,
    timestamp: "5 hours ago",
    locked: true,
    ppvPrice: "$5.50",
  },
  {
    id: 4,
    creatorId: "bellaswims",
    content: "I said I would behave by the pool. The pool signed an NDA.",
    image: dogPoolTwo,
    likes: 891,
    comments: 234,
    timestamp: "7 hours ago",
  },
  {
    id: 5,
    creatorId: "puffyhusky",
    content: "Exclusive fluff expansion test. Scientists hate me because the volume knob keeps going.",
    image: "/Gemini_Generated_Image_fcsw1ufcsw1ufcsw.png",
    likes: 445,
    comments: 87,
    timestamp: "9 hours ago",
    locked: true,
    ppvPrice: "$12.00",
  },
  {
    id: 6,
    creatorId: "rockyrascal",
    content: "That look when I already opened the trash and you still think this is a negotiation.",
    image: memePug,
    likes: 1123,
    comments: 378,
    timestamp: "12 hours ago",
  },
  {
    id: 7,
    creatorId: "lunaluxe",
    content: "Premium chaise lounge set dropped. Includes one tasteful ankle, three stolen socks, and a candle called Consequences.",
    image: "/LunaLuxe.jpg",
    likes: 892,
    comments: 167,
    timestamp: "15 hours ago",
    locked: true,
    ppvPrice: "$10.99",
  },
  {
    id: 8,
    creatorId: "zarawild",
    content: "New girl, same hallway speed record. Rate my zoomies but be respectful, my lawyer is a tennis ball.",
    image: "/ZaraWild.jpg",
    likes: 654,
    comments: 198,
    timestamp: "18 hours ago",
  },
  {
    id: 9,
    creatorId: "dieseldaddy",
    content: "I do not fetch. I allow you to throw things near me. Premium leadership starts now.",
    image: "/8292b600-75fe-4c57-a858-4c940e5d7b29.jpeg",
    likes: 1456,
    comments: 289,
    timestamp: "20 hours ago",
    locked: true,
    ppvPrice: "$15.00",
  },
  {
    id: 10,
    creatorId: "sophiesweet",
    content: "Girl next door energy if the girl next door stole your cheese and winked at the camera.",
    image: "/bb85ecc0-632b-45a1-97af-987fa2d64f28.jpeg",
    likes: 723,
    comments: 145,
    timestamp: "22 hours ago",
  },
  {
    id: 11,
    creatorId: "milomagic",
    content: "Tonight's illusion: your treat disappears, my subscription count reappears.",
    image: "/c90855c0-341f-4b4c-be8e-336ad29d5a69.jpeg",
    likes: 567,
    comments: 112,
    timestamp: "1 day ago",
  },
  {
    id: 12,
    creatorId: "rexrebel",
    content: "I ate the community guidelines and they were delicious. Join the rebellion.",
    image: "/Gemini_Generated_Image_7qn87e7qn87e7qn8.jpeg",
    likes: 891,
    comments: 234,
    timestamp: "1 day ago",
    locked: true,
    ppvPrice: "$7.77",
  },
  {
    id: 13,
    creatorId: "daisydukes",
    content: "Dropped my hay bale set. It is tasteful, rustic, and somehow already under investigation by the treat board.",
    image: "/DaisyDukes_1.jpg",
    likes: 1019,
    comments: 221,
    timestamp: "2 days ago",
  },
  {
    id: 14,
    creatorId: "sashasizzle",
    content: "Lighting test got too powerful. Three ring lights resigned and one asked for my autograph.",
    image: "/SashaSizzle_1.jpg",
    likes: 1588,
    comments: 306,
    timestamp: "2 days ago",
    locked: true,
    ppvPrice: "$13.37",
  },
  {
    id: 15,
    creatorId: "tankthicc",
    content: "New thicc cam angle. Viewer discretion advised: this much haunch may affect local Wi-Fi.",
    image: "/TankThicc_1.jpg",
    likes: 2104,
    comments: 512,
    timestamp: "3 days ago",
    locked: true,
    ppvPrice: "$18.00",
  },
];

export const stories: Story[] = [
  {
    id: "hot",
    label: "Hot Now",
    slides: [
      { id: "hot-1", creatorId: "maxmuscles", image: "/MaxMuscles.jpg", caption: "Heat check: Max just bench-pressed a squeaky toy.", prompt: "Tell Max he is dangerously swole" },
      { id: "hot-2", creatorId: "chloeswims", image: dogPool, caption: "Chloe shook water directly into the monetization funnel.", prompt: "Ask Chloe for the towel-shake cut" },
      { id: "hot-3", creatorId: "brunomilk", image: "/ChatGPT_Image_Apr_25,_2025,_09_38_06_PM.png", caption: "Bruno posted a milk close-up. The internet is healing.", prompt: "Request the forbidden slurp" },
    ],
  },
  ...creators.map((creator) => ({
    id: creator.id,
    label: creator.shortName,
    creatorId: creator.id,
    slides: [
      {
        id: `${creator.id}-1`,
        creatorId: creator.id,
        image: creator.gallery[0],
        caption: `${creator.shortName} dropped a 24-hour thirst trap for premium treat holders.`,
        prompt: `Tell ${creator.shortName} you saw the story`,
      },
      {
        id: `${creator.id}-2`,
        creatorId: creator.id,
        image: creator.gallery[1] || creator.gallery[0],
        caption: creator.chaosTraits[0],
        prompt: `Send ${creator.shortName} a chaotic compliment`,
      },
    ],
  })),
];

export const notifications: MockNotification[] = [
  { id: "n1", creatorId: "maxmuscles", message: "sent you a private flex audit", time: "2m", type: "message" },
  { id: "n2", creatorId: "chloeswims", message: "wants you to rate the towel shake", time: "5m", type: "story" },
  { id: "n3", creatorId: "brunomilk", message: "tipped YOU one suspicious dairy coupon", time: "8m", type: "tip" },
  { id: "n4", creatorId: "bellaswims", message: "is splashing live from the deep end", time: "12m", type: "live" },
  { id: "n5", creatorId: "rockyrascal", message: "commented: 'delete the evidence'", time: "15m", type: "post" },
  { id: "n6", creatorId: "puffyhusky", message: "is typing in all caps again", time: "18m", type: "message" },
];

export const liveStreams: LiveStream[] = [
  { id: "maxmuscles-live", creatorId: "maxmuscles", title: "Late Night Leg Day and Emotional Support Kibble", viewers: 2847, tags: ["Muscle", "Workout", "Interactive"], isLive: true },
  { id: "chloeswims-live", creatorId: "chloeswims", title: "Pool Party: Do Not Tell The Lifeguard", viewers: 1653, tags: ["Pool", "Swimwear", "Splashing"], isLive: true },
  { id: "brunomilk-live", creatorId: "brunomilk", title: "Milk Tasting ASMR With Uncomfortable Eye Contact", viewers: 934, tags: ["ASMR", "Drinking", "Intense"], isLive: true },
  { id: "sashasizzle-live", creatorId: "sashasizzle", title: "Sasha Sizzle Heat Check: Ring Light Casualties", viewers: 4211, tags: ["Glam", "Chaos", "Requests"], isLive: true },
  { id: "tankthicc-live", creatorId: "tankthicc", title: "Thicc Cam After Dark: Couch Under Pressure", viewers: 5099, tags: ["Thicc", "Couch", "Legend"], isLive: true },
  { id: "bellaswims-live", creatorId: "bellaswims", title: "Good Girl Gone Splash", viewers: 3241, tags: ["Naughty", "Interactive", "Requests"], isLive: false },
];

export const quickReplies = [
  "Show me the forbidden zoomies",
  "Send belly-rub proof",
  "Is this paw-per-view?",
  "I brought premium treats",
];

export const creatorReplies: Record<string, string[]> = {
  maxmuscles: [
    "I just flexed so hard the treat jar opened by itself.",
    "Say less. I am putting on the tiny gym towel.",
    "Premium members get the post-workout panting cut.",
  ],
  chloeswims: [
    "The pool noodle and I are not just friends.",
    "I can send the slow-motion towel shake, but it is emotionally powerful.",
    "Your message made my tiny legs sprint in a circle.",
  ],
  brunomilk: [
    "I read that while maintaining eye contact with a full bowl.",
    "The milk glass signed a release. We are cleared for chaos.",
    "I will send a teaser after one dramatic lick.",
  ],
  bellaswims: [
    "I am pretending to be innocent by the pool again.",
    "The patio is wet and so is my legal team.",
    "Send a treat and I will splash responsibly.",
  ],
  daisydukes: [
    "Bless your heart, that message just unlocked my porch mode.",
    "I can send the hay bale teaser, but you have to promise not to tell the biscuits.",
    "My rhinestone paw boots are on and the Wi-Fi is nervous.",
  ],
  sashasizzle: [
    "Careful, I am already smoldering at 4K.",
    "The ring light asked for a break. I said premium never sleeps.",
    "Send one more compliment and I am legally required to hair flip.",
  ],
  tankthicc: [
    "I just sat down and the app gained three subscribers.",
    "This much haunch takes time to upload. Respect the bandwidth.",
    "I can send the couch angle, but your device may need a spotter.",
  ],
};

export const defaultCreatorReply = [
  "I just tilted my head in a financially persuasive way.",
  "That message made my tail open a premium support ticket.",
  "I am typing with one paw, please respect the craft.",
];
