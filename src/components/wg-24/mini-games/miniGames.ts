import { IMiniGame } from "./MiniGame";

export const miniGames: IMiniGame[] = [
  {
    id: 0,
    color: "#FFCC33",
    name: "Kraken's Recall",
    gameType: "duell",
    song: "David Guetta - Memories",
    description: [
      "Två pirater ställs mot varandra i en duell av minne och skärpa.",
      "De måste avslöja dolda symboler och para ihop matchande par snabbare än sin motståndare.",
      "Den pirat som visar sig ha bäst minne och lyckas hitta flest par vinner spelet, medan den andra får gå på plankan!",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 1,
    color: "#FF9933",
    name: "Shipmate's Wit",
    gameType: "duell",
    song: "Slagsmålsklubben - Ovningskora",
    description: [
      "Två pirater möts i en snabb duell av skarpsynthet och snabbhet. De får se bilder och ska så snabbt som möjligt ropa ut vad de ser.",
      "Om en pirat gissar rätt går turen över till motståndaren, men om de gissar fel eller tvekar, förlorar de tre värdefulla sekunder.",
      "Varje pirat har 30 sekunder på klockan – när tiden rinner ut är spelet över, och den som förlorat sina sekunder först kommer att skickas ner i djupet!",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 2,
    color: "#FF6633",
    name: "Cursed coins",
    gameType: "duell",
    song: "Bobby McFerrin - Don't Worry Be Happy",
    description: [
      "Hissa flaggan, era landkrabbor! Skattjakten är igång! Spelare 1, den listiga piraten, rusar för att samla de förbannade aztekiska mynten som är utspridda över kartan. När de har samlat varenda ett, är deras sista uppdrag att hitta skattkistan, ta sitt pris och bryta den urgamla förbannelsen.",
      "Men Spelare 2, den fruktade odöda väktaren av skatten, tänker inte låta det ske! Bunden av mörk magi för att skydda bytet, jagar den långsamma och släpande Spelare 2 piraten, i hopp om att stoppa dem i deras framfart. Om den odöda piraten fångar Spelare 1 innan de når kistan, är skatten trygg och Spelare 2 vinner.",
      "Kommer Spelare 1 att vara snabb nog för att överlista den förbannade väktaren, eller kommer skatten att förbli förlorad i djupens mörker?",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 3,
    color: "#FF3366",
    name: "Clicker",
    gameType: "duell",
    song: "Caravan Palace - Brotherswing",
    description: [
      "Två pirater möts i en kamp om snabbhet och precision, i ett spel som väcker minnen från förr.",
      "Varje pirat klickar frenetiskt för att samla poäng, men det gäller att vara kvick! Klicka i mitten för poäng, och håll ögonen öppna för speciella minnen som ger extra tid.",
      "Den pirat som lyckas samla flest poäng innan tiden tar slut står som segrare, medan den andra får nöja sig med minnen av sina förlorade chanser!",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 4,
    color: "#FF007F",
    name: "Hangman’s Hold",
    gameType: "2v2",
    song: "Jennifer Lawrence - The Hanging Tree",
    description: [
      "Håll dig fast vid masten med järnhand, som om ditt liv hängde på det!",
      "Den duo som håller sig kvar längst utan att släppa taget står som segrare.",
      "Men var beredd, för den som tappar greppet först kommer att bli hånad av besättningen som en svag landkrabba!",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 5,
    color: "#FF00FF",
    name: "Sea shanty",
    gameType: "lagkamp",
    song: "Sean Dagher - Leave Her Johnny",
    description: [
      "Samla din besättning och skapa en mäktig ramsa som ger styrka inför kommande sjöslag!",
      "Varje besättning ska komponera en ramsa med kraftfulla rim, slagkraft och ett utförande som får den att eka över de sju haven.",
      "De som skapar den bästa ramsan kommer att segla med hög moral, medan förlorarna riskerar att ge upphov till myteri!",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 6,
    color: "#7F00FF",
    name: "Lady of the sea",
    gameType: "solo",
    song: "Harry Gregson-Williams - Arrival at Aslan's How",
    description: [
      "Besättningen har strandat på en öde ö och med list och kreativitet ska de bygga sitt skepp, av de material de hittar på ön.",
      "Tillsammans ska ni forma ett fartyg värdigt att segla över de sju haven.",
      "Skeppet blir er trogna följeslagare i kommande strider, tills ni erövrar de sju haven eller möter ert öde och kaptenen förliser med skeppet.",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 7,
    color: "#007FFF",
    name: "Climb the sails",
    gameType: "lagkamp",
    song: "He's a Pirate",
    description: [
      "Endast de mest modiga och skickliga piraterna kan bemästra seglens höjder!",
      "Lagen kommer att ställas inför en rad utmaningar som kommer att pröva både styrka och smidighet.",
      "De som inte klarar av utmaningarna riskerar att tappa en värdefull besättningsmedlem, och utan en full besättning blir seglatsen desto farligare.",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 8,
    color: "#00FFFF",
    name: "Shipwreck",
    gameType: "2v2",
    song: "Hans Zimmer - Jack Sparrow",
    description: [
      "Två piratlag ställs mot varandra i ett episkt skeppslag ute på de stormiga haven. Varje lag bemannar sitt skepp, där en pirat styr rodret och den andra hanterar kanonerna.",
      "Tillsammans måste de navigera havets faror och avfyra sina kanoner med precision.",
      "Det lag som först lyckas sänka motståndarnas skepp står som segrare och kan segla vidare, medan förlorarna går till botten med sitt skepp!",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 9,
    color: "#00FF7F",
    name: "Cannons",
    gameType: "2v2",
    song: "Super Guitar Bros - Bowser Road",
    description: [
      "I detta klassiska piratspel med en twist ställs två lag mot varandra i en fartfylld kamp till sjöss.",
      "Varje lag har en planka som de använder för att studsa tillbaka kanonkulor. En pirat styr plankan och avfyrar kanoner, medan den andra styr plankan storlek – gör den större för försvar eller mindre för smidighet.",
      "Det lag som bäst samordnar sitt spel och överlistar motståndarna kommer att segra, medan förlorarna får se sin planka brytas itu!",
    ],
    isAnalog: false,
    weight: 1,
  },
  {
    id: 10,
    color: "#00FF00",
    name: "Pirate's Pint",
    gameType: "lagkamp",
    song: "The Sandsacks - Beer Beer Beer",
    description: [
      "Töm din bägare med öl snabbare än en pirat kan hissa segel!",
      "Den pirat som först har tömt sitt glas utan att spilla en droppe står som segrare.",
      "Men akta dig, spiller du så har du slösat på skeppets dyrbara ranson och blir kastad överbord!",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 11,
    color: "#7FFF00",
    name: "Blade in the dark",
    gameType: "2v2",
    song: "Teddybears - Little Stereo",
    description: [
      "Två pirater har strandat på en öde ö, och nu börjar en dödlig kamp.",
      "En av piraterna vandrar på stranden med en pistol och fyra skott, letandes efter sin motståndare. Den andra piraten gömmer sig i djungeln, beväpnad med en kniv, och inväntar natten för att göra sitt drag.",
      "När mörkret faller smyger djungelpiraten fram för att hugga sin fiende, men för varje steg väcks djurens rop till liv och risken att bli upptäckt växer. Ju fler skott som avfyras, desto svårare blir det att bli upptäckt",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 12,
    color: "#000000",
    name: "Shipmate's Dice",
    gameType: "2v2",
    song: "Disturbed, CYRIL - The sound of Silence",
    description: [
      "Bluffa bättre än en pirat kan smida ränker!",
      "Varje pirat gömmer sina tärningar under en kopp och gissar hur många av ett visst värde som finns totalt.",
      "Den som bluffar bäst och får sina motståndare att tvivla vinner, men avslöjas bluffen förlorar du en tärning!",
      "Sista piraten med tärningar kvar vinner skatten, medan de andra kastas överbord!",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 13,
    color: "#FF0000",
    name: "Captain's Call",
    gameType: "duell",
    song: "Joel Fry - A Pirate's Life",
    description: [
      "En av kaptenerna får nu en gyllene chans att stjäla en besättningsmedlem från det andra laget.",
      "Genom att ta en stor shot rom kan kaptenen imponera på motståndarnas besättning och locka över en medlem till sitt eget lag.",
      "Men kaptenen kan också välja att avstå – dock, ingen minns en fegis på de sju haven!",
    ],
    isAnalog: true,
    weight: 1,
  },
  {
    id: 14,
    color: "#FF050F",
    name: "Duel at Dawn",
    gameType: "duell",
    song: "Ennio Morricone - The good, the bad and the ugly",
    description: [
      "Två pirater ställs mot varandra i en klassisk prickskyttetävling med flintlåspistoler.",
      "Den pirat som har bäst sikte och lyckas hålla nerverna i styr vinner kampen.",
      "Förloraren, som visar sig vara en usel skytt, får det föga ärofyllda uppdraget att svabba däck!",
    ],
    isAnalog: true,
    weight: 1,
  },
];
