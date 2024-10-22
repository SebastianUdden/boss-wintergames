import { IMiniGame } from "./MiniGame";

export const miniGames: IMiniGame[] = [
  {
    id: 0,
    color: "#FFCC33",
    name: "Memory",
    category: "Lagkamp",
    song: "David Guetta - Memories",
    description: [
      "Matcha alla BOSSar genom tiden.",
      "Max 30 sekunders betänketid/diskussion, annars går turen över",
      "Hitta flest par för att vinna.",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 1,
    color: "#FF9933",
    name: "The floor",
    category: "Duell",
    song: "Slagsmålsklubben - Ovningskora",
    description: [
      "Bilder inom ett visst tema kommer visas upp på en skärm.",
      "Ni har båda 1 minut tillgodo i svarstid för alla bilder.",
      "{p1}s tid börjar ticka ned och den ska då säga vad som är på första bilden.",
      "Om {p1} svarar rätt stannar din klocka och turen går över till {p2}, din klocka startar då och en ny bild visas.",
      "Om {p1} svarar säger pass ökar tiden med 3 sekunder och den får ett nytt försök med en ny bild som visas.",
      "Bilderna börjar väldigt lätta och ökar sedan successivt i svårighetsgrad.",
      "Den vars tid först tar slut förlorar.",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 2,
    color: "#FF6633",
    name: "Jaunt",
    category: "Lagkamp",
    song: "Caravan Palace - Brotherswing alt. BOSS-låt",
    description: [
      "Koreografera en dans till Caravan Palace - Brotherswing (alt. BOSS-låt om jag hinner/får inspiration att göra en)",
      "Lagen kommer dela på sången i 30 sekundspartier.",
      "{team1} kommer börja.",
      "Rekvisita: Glowsticks, lysglasögon, lyssladd, Bobbo the rave monkey",
    ],
    criteria: ["Synkronisering", "Coolhet", "Fysisk prestation", "Inlevelse"],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 3,
    color: "#FF3366",
    name: "Duel",
    category: "Duell",
    song: "Ennio Morricone - The Good, The Bad And The Ugly",
    description: [
      "Tre personer, tre pistoler, en mexikank standoff.",
      "Vänster/Skjut/Höger:",
      "{p1}: A/S/D)",
      "{p2}: L/Ö/Ä)",
      "{p3}: 1/2/3)",
      "När pistolerna vänder kan du sikta på dina motståndare.",
      "När du är redo trycker du på skjutknappen",
      "Går din pistol i backlås måste du vänta 2 sekunder.",
      "Drar du din pistol 1:a har den 30% risk att gå i baklås.",
      "Drar du din pistol 2:a har den 20% risk att gå i baklås.",
      "Drar du din pistol 3:a har den 10% risk att gå i baklås.",
      "Vågar du ta chansen? Vågar dina motståndare vänta in dig?",
      "Tryck på din knapp för att höja pistolen och skjuta, överlevaren vinner.",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 4,
    color: "#FF007F",
    name: "Maze",
    category: "Duell",
    song: "The Chemical Brothers - Salmon Dance, Bobby McFerrin - Don't Worry Be Happy",
    description: [
      "Undvik fienderna och hitta ut ur labyrinthen.",
      "Samla extrapoäng på vägen.",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 5,
    color: "#FF00FF",
    name: "The clicker",
    category: "Solo",
    song: "BELL - PANG! BOOM!",
    description: [
      "{p1} mot tiden.",
      "Klicka så mycket du kan.",
      "Leta tidsbonus för att spela längre.",
      "Klicka snabbare.",
      "SNABBARE!",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 6,
    color: "#7F00FF",
    name: "Hangman",
    category: "Solo",
    song: "Jennifer Lawrence - The Hanging Tree",
    description: [
      "{p1}, häng så länge du kan.",
      "Varje 10 sekunder som går kommer motståndarlaget få 1 skott till sitt vapen.",
      "Rekvisita: Nerf-gun",
    ],
    isAnalog: true,
    weight: 1,
  },
  // {
  //   id: 7,
  //   color: "#0000FF",
  //   name: "The blues",
  //   category: "Solo",
  //   song: "Jacob Collier - Little Blue",
  //   description: ["Måla något litet och blått", "Du har 2 minuter på dig"],
  //   criteria: ["Tydlighet", "Söthet", "Blåhet", "Mörker", "Mängd färger"],
  //   isAnalog: true,
  //   weight: 1,
  // },
  // {
  //   id: 7,
  //   color: "#0000FF",
  //   name: "Jumper",
  //   category: "Solo",
  //   song: "Super Mario Brothers",
  //   description: ["Klara dig till slutet av banan."],
  //   isAnalog: false,
  //   weight: 1,
  // },
  {
    id: 7,
    color: "#007FFF",
    name: "Sea shanty",
    category: "Lagkamp",
    song: "The White Stripes - Seven Nation Army",
    description: [
      "Kom på en kampsång för erat lag",
      "Ni har 15 minuter på er",
      "Det får inte vara mer än 5 meningar",
    ],
    criteria: ["Rim", "Hyllning", "Diss", "Trallvänlighet"],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 8,
    color: "#00FFFF",
    name: "Monuments",
    category: "Lagkamp",
    song: "Harry Gregson-Williams - Arrival at Aslan's How",
    description: [
      "Bygg ett episkt monument till BOSS ära.",
      "Ni har 30 minuter på er.",
      "Rekvisita: Duplo, Papper, Pennor, Trä, Skruvar, Tyg, Nål, Tråd, Pysselbox",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 9,
    color: "#00FF7F",
    name: "Rope",
    category: "Lagkamp",
    song: "Foo Fighters - Rope",
    description: [
      "En klassisk dragkamp.",
      "Båda lagen får ta tag i repet och när den person som är närmast linjen i vardera lag har sagt REDO kommer dragkampen börja.",
      "Få motståndarlaget att kliva över linjen för att vinna.",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 10,
    color: "#00FF00",
    name: "Shipwreck",
    category: "Lagkamp",
    song: "Monty Python - Always Look on The Bright Side of Life",
    description: [
      "Bygg en bro av duplo över vattnet.",
      "Ni har 9 minuter på er",
    ],
    criteria: ["Hållfasthet", "Skönhet", "Detaljer", "Episkhet"],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 11,
    color: "#7FFF00",
    name: "Killerball",
    category: "2v2",
    song: "The Greatest Bits - Dr. Wily Stage 1 - 2",
    description: [
      "En variation av det klassiska Pong-spelet",
      "Spelare 1 från varje lag styr respektive pongbräda upp och ned.",
      "Spelare 2 från varje lag kan göra brädan större och mindre samt skjuta projektiler mot de andra.",
      "3 träffar stannar brädan i 3 sekunder",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 12,
    color: "#000000",
    name: "Darkshot",
    category: "2v2",
    song: "Disturbed, CYRIL - The sound of Silence",
    description: [
      "En symbios mellan ögon och händer med kommunikation däremellan krävs i denna nerf-battle.",
      "{p1} och {p3} har vapen men kan inte se något.",
      "{p2} och {p4} måste guida dem till att skjuta den andra.",
      "Blir {p2} eller {p4} träffade måste ni dricka 5 klunkar innan de kan fortsätta guida",
    ],
    isAnalog: true,
    weight: 1,
  },
  // {
  //   id: 14,
  //   color: "#FF7F00",
  //   name: "Adventure",
  //   category: "Solo",
  //   song: "Wintergatan - Starmachine2000",
  //   description: [
  //     "Ta dig igenom det här BOSS-äventyret i klassisk text-spels-tappning.",
  //     "Varje vägskäl ger dig 2-4 val som du måste ta ställning till och kombinationen av alla dina beslut längs vägskälen kommer ge dig slutresultatet.",
  //   ],
  //   isAnalog: false,
  //   weight: 1,
  // },
  {
    id: 13,
    color: "#FF7F00",
    name: "Cards",
    category: "Duell",
    song: "Wintergatan - Starmachine2000",
    description: [
      "BOSS cards!",
      "Första spelaren att tappa all sin hälsa förlorar.",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 14,
    color: "#FF0000",
    name: "Little Stereo",
    category: "Duell",
    song: "Teddybears - Little Stereo",
    concept:
      "Little Stereo är jagad av 3 ninjas och behöver beskydd från Mr. Boombox",
    instructions: [
      "{p1}: Du är Mr. Boombox, Little Stereo kommer åka på din rygg för beskydd.",
      "{p2}: Du har ögonbindel, men har ett Nerf gun ska försöka lyssna efter vart Mr. Boombox är.",
      "{p1}: Vinn genom att inte bli träffad under hela låten.",
      "{p2}: Vinn genom att träffa Mr. Boombox innan låten tar slut.",
      "Rekvisita: Boombox-huvud, Little Stereo-låda, nerf-gun",
    ],
    isAnalog: true,
    weight: 1,
  },
  // {
  //   id: 15,
  //   color: "#FF0000",
  //   name: "Little Stereo",
  //   category: "1v1",
  //   song: "Teddybears - Little Stereo",
  //   concept: "Little Stereo är jagad av 3 ninjas och behöver beskydd från Mr. Boombox",
  //   instructions: [
  //     "Utmanare: Du är Mr. Boombox, Little Stereo kommer åka på din rygg för beskydd.",
  //     "Försvarare: Ni är 3 ninjas, sno Little Stereo från Mr. Boombox utan att bli träffade.",
  //     "Mr. Boombox ser inget, men har ett Nerf gun och svärd på armarna, blir ni träffade på något sätt av dessa är ni döda.",
  //     "Rekvisita: Mörklagd Boombox-huvud, Little Stereo-låda, ninja-bandanas, nerf-gun och plastsvärd-attrapper",
  //   ],
  //   isAnalog: true,
  //   weight: 1,
  // },
];

// [
// { color: "#FFCC33", name: "Slice16", weight: 1 },
// { color: "#FF9933", name: "Slice15", weight: 1 },
// { color: "#FF6633", name: "Slice14", weight: 1 },
// { color: "#FF3366", name: "Slice13", weight: 1 },
// { color: "#FF007F", name: "Slice12", weight: 1 },
// { color: "#FF00FF", name: "Slice11", weight: 1 },
// { color: "#7F00FF", name: "Slice10", weight: 1 },
// { color: "#0000FF", name: "Slice9", weight: 1 },
// { color: "#007FFF", name: "Slice8", weight: 1 },
// { color: "#00FFFF", name: "Slice7", weight: 1 },
// { color: "#00FF7F", name: "Slice6", weight: 1 },
// { color: "#00FF00", name: "Slice5", weight: 1 },
// { color: "#7FFF00", name: "Slice4", weight: 1 },
// { color: "#FFFF00", name: "Slice3", weight: 1 },
// { color: "#FF7F00", name: "Slice2", weight: 1 },
// { color: "#FF0000", name: "Slice1", weight: 1 },
// ]
