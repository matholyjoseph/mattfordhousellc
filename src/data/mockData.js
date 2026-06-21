export const mockBooks = [
  {
    id: "1",
    title: "Whispers in the Pines",
    slug: "whispers-in-the-pines",
    coverUrl: "/whispers_in_the_pines.png",
    penName: "Elias Thorne",
    releaseDate: "Oct 24, 2024",
    genres: ["Gothic Mystery", "Mystery"],
    tropes: ["Rejected Mate", "Second Chance", "Fated Mate", "Enemies to Lovers", "Secret Baby", "Forbidden Romance"],
    language: "English",
    status: "New Release",
    bookNum: "1",
    description: "Deep within the ancient, frost-bitten forests of the north, the Thorne family lodge stands as a testament to a legacy built on silence.",
    buyLinks: {
      amazon: "https://amazon.com",
      appleBooks: "https://apple.com",
      kobo: "https://kobo.com"
    },
    series: "The Northern Echoes",
    sneakPeek: "The wind didn't just blow through the pines; it spoke..."
  },
  {
    id: "2",
    title: "The Emerald Crown",
    slug: "the-emerald-crown",
    coverUrl: "/emerald_crown.png",
    penName: "E.T. Penrose",
    releaseDate: "2026-05-15",
    genres: ["High Fantasy", "Fantasy"],
    tropes: ["Royal Court", "Forgotten Magic"],
    language: "English",
    status: "Featured",
    bookNum: "1",
    description: "In a kingdom of iron and steam, a forgotten magic awakens.",
    buyLinks: {
      amazon: "https://amazon.com"
    },
    series: "Iron & Constellations",
    sneakPeek: "The clockwork heart in the center of the citadel began to beat..."
  },
  {
    id: "3",
    title: "Sinking Roots",
    slug: "sinking-roots",
    coverUrl: "/sinking_roots.png",
    penName: "Benjamin Fairfax",
    releaseDate: "Dec 2024",
    genres: ["Philosophy", "Culinary & Travel"],
    tropes: ["Solitude", "Slow Living"],
    language: "English",
    status: "Coming Soon",
    bookNum: "1",
    description: "An exploration of solitude, connection, and slow food traditions in the modern age.",
    buyLinks: {
      amazon: "https://amazon.com"
    },
    series: "Quiet Living",
    sneakPeek: "True connection requires us to first sink our roots deep..."
  },
  {
    id: "4",
    title: "The Glass Orchard",
    slug: "the-glass-orchard",
    coverUrl: "/glass_orchard.png",
    penName: "Thorne",
    releaseDate: "2026-02-10",
    genres: ["Literary Fiction", "Drama"],
    tropes: ["Family Legacy", "Resilience"],
    language: "English",
    status: "Featured",
    bookNum: "1",
    description: "Fragility meets resilience in this lyrical examination of a family's legacy during the great winter of '47.",
    buyLinks: {
      amazon: "https://amazon.com"
    },
    series: "Winter Chronicles",
    sneakPeek: "The glass window panes of the greenhouse were frostbitten..."
  },
  {
    id: "5",
    title: "The Silent Peak",
    slug: "the-silent-peak",
    coverUrl: "/whispers_in_the_pines.png",
    penName: "Adam Woodrow",
    releaseDate: "2026-06-01",
    genres: ["Suspense", "Thriller"],
    tropes: ["Survivalism", "Isolated Cabin"],
    language: "English",
    status: "Featured",
    bookNum: "4",
    description: "Atmospheric survivalism and deep psychological exploration set in the remote peaks Adam Woodrow calls home.",
    buyLinks: {
      amazon: "https://amazon.com"
    },
    series: "Mountain Library Series",
    sneakPeek: "The peak stood silent, a white tooth piercing the dark sky. The cold was a physical weight, pressing against my lungs..."
  }
];

export const mockPenNames = [
  {
    id: "p1",
    name: "Laura Dalton",
    slug: "laura-dalton",
    genreName: "PARANORMAL ROMANCE",
    photoUrl: "LD",
    bio: "Capturing the tension between the mundane and the magical, Laura specializes in gritty werewolf lore and fated mate narratives.",
    tags: ["Fated Mates", "Road Trip", "Enemies to Lovers"]
  },
  {
    id: "p2",
    name: "Lucien Hart",
    slug: "lucien-hart",
    genreName: "MM ROMANCE",
    photoUrl: "LH",
    bio: "Poetic, emotional, and deeply character-driven, Lucien explores the complexities of identity and love in slow burn narratives.",
    tags: ["Dark Academia", "Slow Burn", "Found Family"]
  },
  {
    id: "p3",
    name: "Benjamin Fairfax",
    slug: "benjamin-fairfax",
    genreName: "CULINARY & TRAVEL",
    photoUrl: "BF",
    bio: "Specializing in artisanal cookbooks and narrative travelogues that celebrate the connection between organic farming and slow living.",
    tags: ["Farm to Table", "Alpine Living", "Non Fiction"]
  },
  {
    id: "p4",
    name: "Adam Woodrow",
    slug: "adam-woodrow",
    genreName: "SUSPENSE & SURVIVAL",
    photoUrl: "AW",
    bio: "Adam Woodrow is the voice behind the internationally acclaimed Mountain Library Series. His work blends atmospheric survivalism with deep psychological exploration, often set in the remote peaks he calls home.",
    tags: ["Survivalism", "Isolated Cabin", "Mental Grit"],
    featured: true
  }
];


export const mockGenres = [
  { name: "Gothic Mystery", count: 12, iconName: "moon" },
  { name: "High Fantasy", count: 8, iconName: "shield" },
  { name: "Philosophy", count: 15, iconName: "compass" },
  { name: "Literary Fiction", count: 4, iconName: "book" }
];

export const mockBlogs = [
  {
    id: "b1",
    title: "My Writing Process: From Idea to Finished Draft",
    slug: "writing-process-idea-draft",
    date: "2026-06-12",
    author: "Elias Thorne",
    category: "Writing Tips",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    summary: "Getting from a spark of inspiration to a full manuscript is a marathon, not a sprint. Here is my daily process.",
    featured: true,
    content: `<p>I begin with a simple premise or "what-if" question...</p>`
  }
];
