// import { IMiniGame } from "../wg-24/mini-games/MiniGame";

// export const newMiniGames: IMiniGame[] = [
//   {
//     id: -1,
//     color: "#FFD700",
//     name: "Allmänna tankar",
//     category: "Lagkamp",
//     song: "Sea of Thieves - Call to Adventure",
//     description: [
//       "Hur hanterar vi slavar?",
//       "Kan de köpa sig loss?",
//       "Kan de bli en del va det nya laget?",
//       "Kaptenen lämnar skeppet sist av alla",
//       "Förlorar kaptenen får han välja ut en medspelare att offra",
//       "Räknar vinster/förluster",
//       "Strafftyper: Byta lag, ",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: -1,
//     color: "#FFD700",
//     name: "Kaptenen",
//     category: "Roll",
//     song: "",
//     description: [
//       "Kaptenen väljs ut eller tävlas fram?",
//       "Symbol, kaptenshatt",
//       "Kan inte byta lag förräns han/hon är sist kvar",
//       "Måste offra medspelare istället",
//       "Kan kaptenen vinna tillbaka slavar?",
//       "Duell?",
//       "Om matroserna inte gör som kaptenen säger får hen dela ut straff?",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: -1,
//     color: "#FFD700",
//     name: "Styrman",
//     category: "Roll",
//     song: "",
//     description: ["Styrman väljs av kaptenen", "Symbol, skeppsratt"],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: -1,
//     color: "#FFD700",
//     name: "Matroser",
//     category: "Roll",
//     song: "",
//     description: [
//       "Matroser byter skepp vid förluster",
//       "Ställer de sig bakom sin kapten, eller hoppar de skepp?",
//       "Myteri?",
//       "Efter 10 omgångar kan de som har leder göra myteri för att bli kapten",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 0,
//     color: "#FFD700",
//     name: "Shipbuilder",
//     category: "Lagkamp",
//     song: "Sea of Thieves - Call to Adventure",
//     description: [
//       "Oklart timing-mässigt när detta ska ske",
//       "BOSS Pirate Games inleds med en introduktion till låten 'Sea of Thieves - Call to Adventure'",
//       "Lagen ska bygga varsitt skepp som representerar deras BOSS-stolthet.",
//       "Skeppen ska vara 1m långa och väga max 15kg",
//       "Lagen har 1h på sig",
//       "Lagen kommer sedan bära med sig sitt skepp och stolthet vart de än går under dagen.",
//       "Det är såklart straffbart att lämna skutan utan tillåtelse.",
//       "Laget måste utse en kapten och en förste styrman",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: -1,
//     color: "#FFD700",
//     name: "Treasure hunt",
//     category: "Lagkamp",
//     song: "Sea of Thieves - Call to Adventure",
//     description: [
//       "När 2 lag har blivit 1 är det dags för skattjakt.",
//       "Deltagarna får följa ledtrådar som leder till nya ledtrådar.",
//       "Till slut får de gräva upp skatten som är märkt på kartan med X",
//       "De hittar en skattkista fylld med medaljer, guldpengar, cigarrer och rom.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: -2,
//     color: "#FFD700",
//     name: "She burns",
//     category: "Lagkamp",
//     song: "Sea of Thieves - Call to Adventure",
//     description: [
//       "Inuti skattkistan ligger även tänddon etc.",
//       "För att sluta cirkeln får laget får nu tända eld på det skepp som tillhör det förlorande laget.",
//       "Lagbild tas omkring skeppsbrasan",
//       "Använd samma låt som vi började BOSS Pirate Games med",
//       "Sea of Thieves - Call to Adventure",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 16,
//     color: "#FFD700",
//     name: "Walk the Plank",
//     category: "Solo",
//     song: "Pirates of the Caribbean - Skull and Crossbones",
//     description: [
//       "Spelaren måste balansera sig över en smal planka.",
//       "Andra spelare kastar mjuka föremål för att rubba balansen.",
//       "Om spelaren klarar sig över plankan utan att ramla får de poäng.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 17,
//     color: "#8B4513",
//     name: "Cannon Blast",
//     category: "2v2",
//     song: "Sabaton - To Hell and Back",
//     description: [
//       "Två spelare från varje lag står på varsin sida av ett 'skepp'.",
//       "Kasta mjuka bollar (kanonkulor) mot motståndarlaget för att sänka dem.",
//       "Laget med minst träffade spelare efter en viss tid vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 18,
//     color: "#C0C0C0",
//     name: "Pirate Code",
//     category: "Solo",
//     song: "Hans Zimmer - One Day",
//     description: [
//       "Spelaren måste lösa kodbaserade gåtor för att hitta skatten.",
//       "Varje löst kod leder till nästa ledtråd.",
//       "Ju snabbare spelaren löser koderna, desto fler poäng.",
//     ],
//     isAnalog: false,
//     weight: 1,
//   },
//   {
//     id: 19,
//     color: "#FF4500",
//     name: "Rum Relay",
//     category: "Lagkamp",
//     song: "Flogging Molly - Drunken Lullabies",
//     description: [
//       "Lagmedlemmar springer en stafett med en 'rummugg' fylld med vatten.",
//       "Håll muggen stabil medan ni springer och fyll på vattnet i slutstationen.",
//       "Laget som får över mest vatten vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 20,
//     color: "#000080",
//     name: "Pirate's Dice",
//     category: "Duell",
//     song: "Klaus Badelt - The Medallion Calls",
//     description: [
//       "En piratinspirerad version av 'Liar's Dice'.",
//       "Bluffa och lura din motståndare att tro att du har fler av en tärningssymbol än du faktiskt har.",
//       "Den som avslöjas förlorar rundan, sista piraten kvar vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 21,
//     color: "#FF6347",
//     name: "Capture the Treasure",
//     category: "Lagkamp",
//     song: "Two Steps From Hell - Victory",
//     description: [
//       "Varje lag försvarar sin skattkista och försöker stjäla motståndarnas.",
//       "Laget som lyckas stjäla flest skatter eller behålla sin egen skatt längst tid vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 22,
//     color: "#8A2BE2",
//     name: "Parrot Toss",
//     category: "Duell",
//     song: "Johnny Cash - A Pirate Looks at Forty",
//     description: [
//       "Två spelare kastar 'papegojor' genom en ring.",
//       "De måste kasta papegojorna medan motståndaren inte tittar.",
//       "Den som får in flest papegojor genom ringen vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 23,
//     color: "#32CD32",
//     name: "Skull Island Scramble",
//     category: "Lagkamp",
//     song: "AC/DC - Highway to Hell",
//     description: [
//       "Lagen samlar skallar (markörer) som är spridda över området.",
//       "Vissa skallar är värda poäng, men andra är förbannade och förlorar poäng.",
//       "Lagets strategi avgör hur mycket de vågar samla.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 24,
//     color: "#FF8C00",
//     name: "Pirate Duel at Dawn",
//     category: "Duell",
//     song: "Morricone - The Ecstasy of Gold",
//     description: [
//       "Två spelare duellerar med Nerf-pistoler.",
//       "De går tre steg, vänder sig om och skjuter.",
//       "Den som träffar först vinner, båda har bara ett skott.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 25,
//     color: "#FFA07A",
//     name: "Tug of War",
//     category: "Lagkamp",
//     song: "Dropkick Murphys - I'm Shipping Up to Boston",
//     description: [
//       "En klassisk dragkamp där lagen försöker dra repet över mittlinjen.",
//       "Det vinnande laget får en symbolisk piratkrona.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
// ];

// export const captiveMiniGames: IMiniGame[] = [
//   {
//     id: 26,
//     color: "#FFB6C1",
//     name: "Captive's Dilemma",
//     category: "Solo",
//     song: "Hans Zimmer - Jack Sparrow",
//     description: [
//       "Som fånge måste du lösa tre logiska pussel innan tiden går ut.",
//       "Misslyckas du med att lösa pusslen får du stanna kvar som fånge.",
//       "Lyckas du, blir du befriad och fullvärdig medlem i laget.",
//       "Om ingen fånge lyckas, kan motståndarna välja att förlänga fångenskapen.",
//     ],
//     isAnalog: false,
//     weight: 1,
//   },
//   {
//     id: 27,
//     color: "#FF4500",
//     name: "Shipwrecked Escape",
//     category: "Solo",
//     song: "AC/DC - Back in Black",
//     description: [
//       "Som fånge börjar du spelet på en 'ö' (avgränsat område).",
//       "För att vinna din frihet måste du bygga en flotte med material du hittar på ön.",
//       "Om din flotte inte klarar 'vattentestet' (testas av en tävlingsledare), blir du kvar som fånge.",
//       "Lyckas du, får du gå med i laget och undviker extra straff.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 28,
//     color: "#98FB98",
//     name: "Prisoner's Dilemma",
//     category: "2v2",
//     song: "The White Stripes - Icky Thump",
//     description: [
//       "Fångar från två olika lag måste samarbeta i en utmaning.",
//       "Om båda fångarna samarbetar och löser uppgiften, blir båda fria.",
//       "Om en av dem väljer att lura den andra, blir bara en befriad.",
//       "Lagen måste strategiskt överväga om de ska stödja eller sabotera fångarnas försök.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 29,
//     color: "#D2691E",
//     name: "Cursed Treasure",
//     category: "Lagkamp",
//     song: "Pirates of the Caribbean - Davy Jones Theme",
//     description: [
//       "Lag med fångar måste spela om en skatt.",
//       "Om laget vinner skatten, kan de köpa frihet för sin fånge.",
//       "Om laget förlorar, får motståndarlaget välja att förlänga fångens fångenskap eller använda skatten till sin fördel.",
//       "Fångens prestation påverkar skattens värde.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 30,
//     color: "#1E90FF",
//     name: "Parrot's Rescue",
//     category: "Lagkamp",
//     song: "The Rolling Stones - Paint It Black",
//     description: [
//       "En fånge har en 'fången papegoja' som måste räddas.",
//       "Fången måste samarbeta med sitt lag för att lösa uppgifter och återfå papegojan.",
//       "Om fången lyckas rädda papegojan, blir de befriade och får dubbla poäng i nästa spel.",
//       "Om de misslyckas, stannar de kvar som fånge och får negativa poäng för laget.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
// ];

// export const chainedMiniGames: IMiniGame[] = [
//   {
//     id: 31,
//     color: "#800000",
//     name: "Shackled Relay",
//     category: "Lagkamp",
//     song: "Metallica - Master of Puppets",
//     description: [
//       "Fångarna är fastkedjade i händerna och måste springa stafett tillsammans med sitt lag.",
//       "Fångarna får bara använda en hand medan de är bundna till en stolpe.",
//       "Om fången lyckas genomföra stafetten utan att riva några hinder, blir de befriade och får poäng för sitt lag.",
//       "Misslyckas fången, får laget ett tidsstraff.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 32,
//     color: "#4682B4",
//     name: "Anchor Escape",
//     category: "Solo",
//     song: "Hans Zimmer - The Kraken",
//     description: [
//       "Fångarna är fastkedjade vid ett tungt ankare.",
//       "De måste genomföra ett pussel eller fysisk uppgift för att lyfta ankaret och befria sig själva.",
//       "Lyckas de inom tidsgränsen blir de fria och får ansluta till sitt lag, annars stannar de kvar som fånge.",
//       "Laget kan hjälpa fången genom att lösa ledtrådar för att minska ankarets vikt.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 33,
//     color: "#FF6347",
//     name: "Chain Reaction",
//     category: "Lagkamp",
//     song: "Queen - I Want to Break Free",
//     description: [
//       "Fångarna är kedjade tillsammans två och två.",
//       "De måste samarbeta för att lösa en uppgift, till exempel samla föremål på olika sidor av rummet.",
//       "Lyckas de inom tidsgränsen, befrias båda fångarna och återansluter till sina lag.",
//       "Om de misslyckas, måste de stanna kvar som fångar under nästa spel.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 34,
//     color: "#FFD700",
//     name: "The Chain Gang",
//     category: "Lagkamp",
//     song: "Fleetwood Mac - The Chain",
//     description: [
//       "Fångarna är kedjade fast vid varandra och måste dra ett tungt föremål över en bana.",
//       "Laget kan hjälpa dem genom att lösa olika uppgifter på vägen, som att lösa gåtor eller bygga broar.",
//       "Om fångarna lyckas dra föremålet till mållinjen, befrias de och vinner poäng.",
//       "Om de misslyckas, blir de kvar som fångar och får ett straff.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 35,
//     color: "#708090",
//     name: "Shackled Showdown",
//     category: "Duell",
//     song: "Johnny Cash - Folsom Prison Blues",
//     description: [
//       "Två fångar är fastkedjade vid en stolpe mitt på spelplanen.",
//       "De måste dra i kedjan för att nå olika objekt som är utplacerade runt dem.",
//       "Den första fången att samla flest objekt eller nå ett specifikt mål befrias och får poäng.",
//       "Den förlorande fången förblir fastkedjad och får ett straff för nästa omgång.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
// ];

// export const funMiniGames: IMiniGame[] = [
//   {
//     id: 36,
//     color: "#FF69B4",
//     name: "Coconut Toss",
//     category: "Lagkamp",
//     song: "Harry Belafonte - Jump In The Line",
//     description: [
//       "Varje spelare får en plastkokosnöt som de måste kasta genom en hula-hoop-ring.",
//       "Fångarna får bara kasta med sin icke-dominanta hand, vilket gör det svårare.",
//       "För varje missat kast, måste laget göra en 'piratdans' som straff innan de får kasta igen.",
//       "Laget med flest poäng (kokosnötter genom ringen) vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 37,
//     color: "#FF4500",
//     name: "Sinking Ship",
//     category: "Duell",
//     song: "The Beach Boys - Sloop John B",
//     description: [
//       "Två spelare sitter i varsin uppblåsbar pool och måste paddla med bara händerna för att 'fly' ett sjunkande skepp.",
//       "Fångarna får bara paddla med plastskedar istället för händer, vilket gör det svårare.",
//       "Förloraren måste stanna kvar i poolen tills nästa runda och får inte hjälpa sitt lag förrän de är räddade.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 38,
//     color: "#8A2BE2",
//     name: "Drunken Compass",
//     category: "Solo",
//     song: "Flogging Molly - If I Ever Leave This World Alive",
//     description: [
//       "Spelaren får ett 'piratkompass' (som alltid pekar fel) och måste navigera en bana.",
//       "Fångarna får dessutom bära ögonbindel och måste lita på sina lagkamraters instruktioner.",
//       "Om spelaren går fel, måste de snurra runt tre gånger och försöka igen.",
//       "Första personen som hittar vägen vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 39,
//     color: "#228B22",
//     name: "Parrot Pile-up",
//     category: "Lagkamp",
//     song: "Monty Python - Always Look on the Bright Side of Life",
//     description: [
//       "Varje spelare får en uppblåsbar 'papegoja' att balansera på huvudet medan de går över en hinderbana.",
//       "Fångarna får två papegojor att balansera, en på huvudet och en på axeln.",
//       "Om papegojan faller, måste spelaren starta om.",
//       "Det lag som lyckas få flest spelare till mål utan att tappa sina papegojor vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 40,
//     color: "#FF6347",
//     name: "Pirate Karaoke",
//     category: "Solo",
//     song: "The Pirates of the Caribbean Theme (a capella)",
//     description: [
//       "Spelaren måste sjunga en piratsång medan de håller en 'papegojmikrofon'.",
//       "Fångarna måste sjunga med en pirataccent och dansa samtidigt.",
//       "Publiken röstar på den bästa piraten baserat på inlevelse och humor.",
//       "Den som får flest röster vinner och befrias från fångenskap.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 41,
//     color: "#0000CD",
//     name: "Knotty Pirates",
//     category: "Lagkamp",
//     song: "Bob Marley - Three Little Birds",
//     description: [
//       "Varje lag måste knyta ett komplicerat sjömansknop på tid.",
//       "Fångarna får endast använda en hand för att göra knopen.",
//       "Om fången misslyckas inom tidsgränsen, får laget en tidsstraff, men lyckas de, får de tillbaka två poäng.",
//       "Det snabbaste laget med korrekt knut vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 42,
//     color: "#FFD700",
//     name: "The Great Rum Chase",
//     category: "Lagkamp",
//     song: "Dropkick Murphys - The Dirty Glass",
//     description: [
//       "Spelarna måste jaga en 'flaska rom' (en uppblåsbar flaska) som kastas runt av tävlingsledaren.",
//       "Fångarna får sina ben ihopbundna (som en trebenstävling) medan de jagar flaskan.",
//       "Första spelaren som fångar flaskan vinner rommen för sitt lag, men den som misslyckas får ett straff (sjunga en piratsång).",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 43,
//     color: "#87CEEB",
//     name: "One-Legged Pirate Race",
//     category: "Solo",
//     song: "The Dubliners - The Irish Rover",
//     description: [
//       "Spelaren måste hoppa på ett ben längs en bana medan de bär en skum 'papegojkompis' på sin axel.",
//       "Fångarna får dessutom en ögonbindel och måste navigera med hjälp av sina lagkamrater.",
//       "För varje fall måste de starta om.",
//       "Den första piraten över mållinjen vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 44,
//     color: "#DAA520",
//     name: "Pirate Pie Face",
//     category: "Duell",
//     song: "Jimmy Buffett - A Pirate Looks at Forty",
//     description: [
//       "Två spelare sitter framför varsin 'piratkatapult' som är laddad med en skumgummikaka.",
//       "De får tre försök att skjuta kakan i ansiktet på motståndaren.",
//       "Fångarna får bara använda en hand för att sikta och skjuta.",
//       "Den första spelaren att träffa motståndaren med alla tre kakor vinner och får befria sig själv.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 45,
//     color: "#20B2AA",
//     name: "Fishy Footrace",
//     category: "Lagkamp",
//     song: "The Village People - In the Navy",
//     description: [
//       "Varje spelare måste balansera en plastfisk på foten medan de springer en bana.",
//       "Fångarna får balansvikter på sina fötter, vilket gör det svårare.",
//       "För varje tappad fisk måste spelaren snurra runt tre gånger innan de fortsätter.",
//       "Första laget över mållinjen med alla fiskar intakta vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
// ];

// export const moreFunMiniGames: IMiniGame[] = [
//   {
//     id: 46,
//     color: "#8B0000",
//     name: "Booty Blindfold",
//     category: "Lagkamp",
//     song: "Bobby McFerrin - Don't Worry, Be Happy",
//     description: [
//       "Lagmedlemmarna har ögonbindel och måste hitta gömda 'skatter' (små föremål) i rummet.",
//       "Fångarna är dessutom fastbundna vid varandra i en lång kedja, vilket gör det ännu svårare.",
//       "Laget som hittar flest skatter inom tidsgränsen vinner.",
//       "Om fången råkar snubbla eller gå fel, måste hela laget börja om från början.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 47,
//     color: "#FFD700",
//     name: "Rum Barrel Roll",
//     category: "Lagkamp",
//     song: "The Irish Rovers - Drunken Sailor",
//     description: [
//       "Varje lag måste rulla en stor tunna över en bana medan de låtsas vara 'fulla pirater'.",
//       "Fångarna måste göra detta med endast en hand, vilket gör det mycket svårare.",
//       "Om någon spelare ramlar eller tappar greppet om tunnan, får laget ett tidsstraff.",
//       "Första laget över mållinjen med sin tunna vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 48,
//     color: "#4B0082",
//     name: "Peg-Leg Race",
//     category: "Solo",
//     song: "The Dubliners - The Rocky Road to Dublin",
//     description: [
//       "Spelarna måste springa en kort bana medan de låtsas ha ett 'träben' (ett ben hopbundet).",
//       "Fångarna måste dessutom hålla en ögonlapp på ett öga, vilket gör det ännu svårare att balansera.",
//       "Den som först hoppar över mållinjen utan att ramla vinner och får frihet från fångenskap.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 49,
//     color: "#FF4500",
//     name: "Captain's Orders",
//     category: "Lagkamp",
//     song: "Randy Newman - You've Got a Friend in Me",
//     description: [
//       "Kaptenen (en tävlingsledare) ropar ut komiska 'piratorder' som laget måste följa (t.ex. 'Alla måste hoppa på ett ben' eller 'Gör en piratdans').",
//       "Fångarna måste utföra alla order dubbelt så snabbt som resten av laget för att få chansen att bli befriade.",
//       "Det lag som snabbast och mest korrekt följer flest order vinner spelet.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 50,
//     color: "#FF69B4",
//     name: "Parrot Pictionary",
//     category: "Lagkamp",
//     song: "Jimmy Buffett - Margaritaville",
//     description: [
//       "En spelare från varje lag måste rita en piratinspirerad bild med en 'papegoja' fäst vid handen.",
//       "Fångarna måste dessutom rita med sina fötter istället för händer, vilket skapar riktigt roliga situationer.",
//       "Laget måste gissa vad deras lagmedlem ritar, och det lag som gissar flest bilder rätt vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 51,
//     color: "#FFA07A",
//     name: "Cannonball Catch",
//     category: "Duell",
//     song: "AC/DC - Thunderstruck",
//     description: [
//       "Två spelare står på varsin sida av ett rep och måste kasta mjuka 'kanonkulor' över repet.",
//       "Fångarna får en hand bakbunden, vilket gör det svårare att fånga och kasta.",
//       "För varje fångad kanonkula får spelaren ett poäng, och den som först får fem poäng vinner och befrias.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 52,
//     color: "#B0E0E6",
//     name: "Pirate Limbo",
//     category: "Solo",
//     song: "The Champs - Tequila",
//     description: [
//       "Spelarna måste dansa under en limbo-stång utan att nudda den, samtidigt som de håller en 'papegoja' på huvudet.",
//       "Fångarna får dessutom en extra vikt på huvudet, vilket gör det svårare att hålla balansen.",
//       "Den som klarar sig under den lägsta stången utan att tappa balansen vinner och befrias.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 53,
//     color: "#00CED1",
//     name: "Pirate Plank Push",
//     category: "Lagkamp",
//     song: "Dropkick Murphys - I'm Shipping Up to Boston",
//     description: [
//       "Lagen står på varsin 'planka' (markerat område) och måste försöka putta motståndarna av plankan.",
//       "Fångarna måste stå på ett ben medan de puttar, vilket gör det svårare.",
//       "Det lag som får flest spelare att stå kvar på plankan efter varje runda vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 54,
//     color: "#FA8072",
//     name: "Mutiny Madness",
//     category: "Lagkamp",
//     song: "Queen - I Want to Break Free",
//     description: [
//       "Varje lag ska iscensätta en rolig och överdriven 'myteri-scen' med improvisation.",
//       "Fångarna måste spela huvudrollen som 'kapten' som blir myteristad och måste försöka 'stoppa' myteriet.",
//       "Det lag med den roligaste och mest kreativa scenen, enligt publiken, vinner och befriar fångarna.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 55,
//     color: "#F08080",
//     name: "Swashbuckler Showdown",
//     category: "Duell",
//     song: "Pirates of the Caribbean - He's a Pirate",
//     description: [
//       "Två spelare duellerar med skumsvärd och försöker 'träffa' varandra tre gånger.",
//       "Fångarna får en arm bakbunden, vilket gör duellen mer utmanande och komisk.",
//       "Första spelaren som träffar motståndaren tre gånger vinner och befrias från fångenskap.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
// ];

// export const catapultMiniGames: IMiniGame[] = [
//   {
//     id: 56,
//     color: "#8B4513",
//     name: "Catapult Chaos",
//     category: "Lagkamp",
//     song: "Sabaton - Primo Victoria",
//     description: [
//       "Varje lag får byggmaterial för att bygga en katapult (t.ex. gummiband, skedar, kartong).",
//       "Efter att katapulterna är byggda, skjuter de mjuka projektiler (t.ex. pingisbollar) mot det andra laget.",
//       "För varje träff får laget poäng.",
//       "Det lag som skjuter ner flest projektiler på motståndarna vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 57,
//     color: "#2E8B57",
//     name: "Pirate Plunder Catapult",
//     category: "Lagkamp",
//     song: "AC/DC - Hells Bells",
//     description: [
//       "Lagen bygger katapulter av enkla material och försöker skjuta 'skattkistor' (små föremål) över ett rep in på motståndarlagets planhalva.",
//       "Motståndarlaget försöker fånga eller blockera dessa skattkistor.",
//       "För varje skattkista som landar på det andra lagets sida får laget poäng.",
//       "Laget med flest skattkistor på motståndarnas sida vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 58,
//     color: "#4682B4",
//     name: "Catapult Carnage",
//     category: "Lagkamp",
//     song: "Rammstein - Feuer Frei!",
//     description: [
//       "Lagen tävlar om att bygga de mest effektiva katapulterna och skjuta 'kanonkulor' (mjuka bollar) mot motståndarlagets torn (en stapel av plastmuggar).",
//       "Målet är att välta motståndarnas torn innan de välter ditt.",
//       "Varje vält torn ger poäng.",
//       "Det lag som först välter alla motståndarnas torn vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 59,
//     color: "#DC143C",
//     name: "Catapult Duel",
//     category: "Duell",
//     song: "The Rolling Stones - Paint It Black",
//     description: [
//       "Två lagduellerar genom att bygga varsin katapult.",
//       "De får fem minuter på sig att bygga och sedan skjuta på varandras lagkamrater med mjuka projektiler.",
//       "Varje träff eliminerar en spelare från det andra laget.",
//       "Det lag som har flest överlevande spelare efter tre omgångar vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 60,
//     color: "#FF4500",
//     name: "Treasure Catapult",
//     category: "Lagkamp",
//     song: "Alestorm - Captain Morgan's Revenge",
//     description: [
//       "Lagen bygger katapulter och skjuter små 'skatter' (små föremål som plastmynt eller leksaksguld) in på motståndarlagets planhalva.",
//       "Motståndarlaget försöker försvara sig genom att fånga eller blockera skatterna.",
//       "För varje träffad skatt som landar på motståndarlagets planhalva, får laget poäng.",
//       "Laget med flest skatter på andra sidan efter 10 minuter vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
//   {
//     id: 61,
//     color: "#FF6347",
//     name: "Catapult Capture the Flag",
//     category: "Lagkamp",
//     song: "AC/DC - Thunderstruck",
//     description: [
//       "Lagen bygger katapulter och skjuter mjuka projektiler (t.ex. pingisbollar) mot motståndarlagets flagg (ett föremål som kan vara en leksakskrokodil eller liknande).",
//       "Motståndarlaget försöker försvara flaggen och fånga projektilerna.",
//       "För varje träffad projektil som landar på motståndarlagets flagg, får laget poäng.",
//       "Det lag som först fångar flaggen och håller den på sin egen sida vinner.",
//     ],
//     isAnalog: true,
//     weight: 1,
//   },
// ];

// export const miniGameIdeas = [
//   ...newMiniGames,
//   ...captiveMiniGames,
//   ...chainedMiniGames,
//   ...funMiniGames,
//   ...moreFunMiniGames,
//   ...catapultMiniGames,
// ];
