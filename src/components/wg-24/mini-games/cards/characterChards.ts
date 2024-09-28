import { ICard } from "./types";

const sebbeCards: Omit<ICard, "id">[] = [
  {
    name: "The Slam Dunker",
    manaCost: "4R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Athlete",
    description:
      "Basketball Bash deals 3 damage to each opponent creature. Guitar Riff Shockwave: Stun opponents' creatures.",
    flavorText: "Basketball in hand, guitar on his back, chaos everywhere.",
    power: 5,
    toughness: 3,
    rarity: "Rare",
    value: 20,
  },
  {
    name: "Gym Maestro",
    manaCost: "3W",
    land: "plains",
    type: "Creature",
    subtype: "Human Trainer",
    description:
      "Dumbbell Dash lets Gym Maestro attack twice in the same combat. Protein Shake Power-Up: Gain +2/+2 until end of turn.",
    flavorText: "With gains comes pain, but he's unstoppable.",
    power: 4,
    toughness: 4,
    rarity: "Uncommon",
    value: 15,
  },
  {
    name: "String Striker",
    manaCost: "2G",
    land: "forest",
    type: "Creature",
    subtype: "Musician Warrior",
    description:
      "Guitar Whip deals 2 damage to target creature or player. Hoop Portal: Teleport to a different battlefield zone.",
    flavorText: "Melody of destruction, harmony of victory.",
    power: 3,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "The Tall Coder",
    manaCost: "5U",
    land: "island",
    type: "Creature",
    subtype: "Programmer Mage",
    description:
      "Firewall Blast deals 5 damage to all creatures and players. System Override: Opponents' spells cost 2 more mana to cast next turn.",
    flavorText: "He controls both the court and the code.",
    power: 6,
    toughness: 4,
    rarity: "Mythic Rare",
    value: 30,
  },
];

const dennanCards = [
  {
    name: "The Bearded Mailman",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Mailman",
    description:
      "Special Delivery: Deal 4 damage to target creature or player. Pipe Wrench Swing: The Bearded Mailman gets +3/+0 during combat.",
    flavorText: "With a swing of his wrench, the mail is never late.",
    power: 4,
    toughness: 4,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "Plumbinator",
    manaCost: "4U",
    land: "island",
    type: "Creature",
    subtype: "Human Plumber",
    description:
      "Pipe Burst: Return up to two target creatures to their owners' hands. Letter Shield: Prevent all damage that would be dealt to Plumbinator this turn.",
    flavorText: "Water and letters flow in his wake, an unstoppable force.",
    power: 3,
    toughness: 5,
    rarity: "Uncommon",
    value: 15,
  },
  {
    name: "Red Beard Raider",
    manaCost: "5R",
    land: "mountain",
    type: "Creature",
    subtype: "Pirate Mailman",
    description:
      "Anchor Toss deals 6 damage to target creature. Cannonball Letters: Red Beard Raider deals 2 damage to each opponent.",
    flavorText: "With anchor and letters, he rules the seas and skies alike.",
    power: 6,
    toughness: 4,
    rarity: "Rare",
    value: 20,
  },
  {
    name: "Tattooed Titan",
    manaCost: "6G",
    land: "forest",
    type: "Creature",
    subtype: "Titan Mailman",
    description:
      "Ink Impact: Put two +1/+1 counters on Tattooed Titan. Mail Storm: Deal 3 damage to each opponent's creature. Plumber's Plunge: Tattooed Titan gains indestructible until end of turn.",
    flavorText: "The tattoos tell his story, but his fists write history.",
    power: 7,
    toughness: 6,
    rarity: "Mythic Rare",
    value: 25,
  },
];

const mattisCards = [
  {
    name: "The Speed Painter",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Painter",
    description:
      "Paint Splash: Opponent creatures lose vision for 2 turns. Sprint Stroke: Mattis dashes forward, slowing enemies by 2 on contact.",
    flavorText: "His art? A masterpiece of chaos.",
    power: 3,
    toughness: 3,
    rarity: "Uncommon",
    value: 15,
  },
  {
    name: "Track Trickster",
    manaCost: "4G",
    land: "forest",
    type: "Creature",
    subtype: "Human Runner",
    description:
      "Artistic Dash: Create a trail that causes opponents to slip. Canvas Shield: Prevent all damage that would be dealt to Mattis this turn.",
    flavorText: "Speed and art in perfect harmony.",
    power: 4,
    toughness: 4,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "The Prankster Painter",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Trickster",
    description:
      "Whoopee Cushion Mines: Place traps that emit funny sounds and stun. Color Burst: Deal 3 damage and disorient opponents for 1 turn.",
    flavorText: "Colors and chaos, one brushstroke at a time.",
    power: 2,
    toughness: 4,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "Brush Runner",
    manaCost: "2G",
    land: "forest",
    type: "Creature",
    subtype: "Human Artist",
    description:
      "Speedy Sketches: Draw pathways that boost Mattis' speed by +3 until end of turn. Artful Dodge: Evade all attacks this turn.",
    flavorText: "He runs faster than his art dries.",
    power: 3,
    toughness: 2,
    rarity: "Uncommon",
    value: 12,
  },
];

const freddeCards = [
  {
    name: "The Salmon Dancer",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Dancer",
    description:
      "Salmon Slap: Deal 4 damage to target creature. Dance Fever: All opponents' creatures lose control and are forced to dance for 2 turns.",
    flavorText: "With each step, success follows.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "Cycling Tycoon",
    manaCost: "4G",
    land: "forest",
    type: "Creature",
    subtype: "Human Entrepreneur",
    description:
      "Bike Blitz: Knock aside target creatures for 3 damage. Market Shift: Alter terrain to gain +1/+1 for 2 turns, driven by AI market predictions.",
    flavorText: "Wherever the road leads, profits follow.",
    power: 4,
    toughness: 5,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "Aloof Entrepreneur",
    manaCost: "3B",
    land: "swamp",
    type: "Creature",
    subtype: "Human Businessman",
    description:
      "Idea Spark: Stun target creature for 1 turn. Business Boom: Summon an AI-driven briefcase drone that deals 3 damage per turn to opponents.",
    flavorText: "A casual genius, unfazed by competition.",
    power: 2,
    toughness: 4,
    rarity: "Uncommon",
    value: 14,
  },
  {
    name: "Dancepreneur",
    manaCost: "5U",
    land: "island",
    type: "Creature",
    subtype: "Human Performer",
    description:
      "Rhythm Riot: Create shockwaves dealing 2 damage to all enemy creatures. Profit Shield: Block incoming damage using AI-analyzed graphs and charts.",
    flavorText: "Dancing through data, a master of rhythm and returns.",
    power: 3,
    toughness: 3,
    rarity: "Mythic Rare",
    value: 20,
  },
];

const schaeranCards = [
  {
    name: "The Alpine Ranger",
    manaCost: "3G",
    land: "forest",
    type: "Creature",
    subtype: "Human Gunman",
    description:
      "Frost Shot: Freeze target creature for 2 turns. Nature's Call: Summon wildlife to deal 2 damage to all opponent creatures.",
    flavorText:
      "He strikes with the precision of winter, and nature answers his call.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "Eco Warrior",
    manaCost: "4G",
    land: "forest",
    type: "Creature",
    subtype: "Human Environmentalist",
    description:
      "Leaf Blade: Deal 3 damage to target creature. Reforestation: Plant trees that block and deal 2 damage to opponent creatures. Solar Flare: Blind all opponents for 1 turn.",
    flavorText: "His fight is for the earth, and his weapons are its gifts.",
    power: 3,
    toughness: 5,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "Blizzard Biathlete",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Biathlete",
    description:
      "Precision Shot: Deal 5 damage to target creature. Ski Sprint: Dash across the battlefield, leaving an icy trail that slows opponents. Environmental Shield: Reduce all incoming damage by 2 for 2 turns.",
    flavorText: "Speed and accuracy, honed by the chill of the mountains.",
    power: 3,
    toughness: 4,
    rarity: "Uncommon",
    value: 14,
  },
  {
    name: "Guardian of Nature",
    manaCost: "5G",
    land: "forest",
    type: "Creature",
    subtype: "Elemental Guardian",
    description:
      "Elemental Burst: Choose wind, earth, or ice to deal 4 damage to all creatures. Eco Boost: Heal 2 life each turn while near plants. Wildfire Ward: Summon controlled fire that deals 2 damage to attacking creatures.",
    flavorText:
      "Nature's guardian, protector of the balance between life and death.",
    power: 5,
    toughness: 5,
    rarity: "Mythic Rare",
    value: 20,
  },
];

const klingenCards = [
  {
    name: "Truth Slicer",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Skier",
    description:
      "Ski Slash: Deal 3 damage to target creature while moving past. Spicy Truth Bomb: Reveal all hidden enemies for 1 turn.",
    flavorText: "Truth cuts deeper than any blade, and so does he.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 15,
  },
  {
    name: "The Management Maverick",
    manaCost: "4G",
    land: "forest",
    type: "Creature",
    subtype: "Human Businessman",
    description:
      "Slide Tackle: Deal 4 damage to an opponent and push them back. Presentation Projectiles: Deal 2 damage to all enemy creatures by throwing sharp documents.",
    flavorText: "With a keen mind and sharper projectiles, he manages chaos.",
    power: 3,
    toughness: 5,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "Alpine Analyst",
    manaCost: "3G",
    land: "forest",
    type: "Creature",
    subtype: "Human Analyst",
    description:
      "Data Storm: Confuse all enemies, lowering their accuracy by 50% for 2 turns. Ski Lift: Evade danger by elevating to higher ground.",
    flavorText: "A storm of numbers and statistics blinds the unprepared.",
    power: 3,
    toughness: 4,
    rarity: "Uncommon",
    value: 13,
  },
  {
    name: "The Golfer of Legends",
    manaCost: "4G",
    land: "forest",
    type: "Creature",
    subtype: "Human Golfer",
    description:
      "Story Swing: Deal 2 damage, increase damage by 1 each consecutive use. Catalan Connection: Summon girlfriend for support, +1/+1 to allies. Embellish Drive: Deal 3 damage to one enemy, each subsequent hit is +1 damage.",
    flavorText:
      "With every swing, his tales grow taller and his shots more powerful.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
];

const anteCards = [
  {
    name: "Hype Hero",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Athlete",
    description:
      "Optimism Overdrive: Boost the speed and strength of all allies by +2 for 2 turns. Sales Pitch: Charm enemies into lowering their defenses by 1 for 1 turn. Basketball Barrage: Throw 3 basketballs rapidly, each hit increasing in power.",
    flavorText: "With every throw, the energy grows.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "The Motivator",
    manaCost: "4W",
    land: "plains",
    type: "Creature",
    subtype: "Human Coach",
    description:
      "Pep Talk: Heal and buff all allies within range by +3 for 2 turns. Slam Dunk Smash: Deal 4 area damage with a slam dunk. Hype Wave: Release a wave of energy, boosting ally attack speed and knocking back enemies.",
    flavorText: "Enthusiasm is contagious.",
    power: 3,
    toughness: 4,
    rarity: "Uncommon",
    value: 15,
  },
  {
    name: "Sales Slammer",
    manaCost: "3B",
    land: "swamp",
    type: "Creature",
    subtype: "Human Salesman",
    description:
      "Deal Maker: Switch places with target enemy and confuse them for 1 turn. Commission Strike: Deal damage and increase attack power by +2 for the next attack. Enthusiasm Echo: Repeat the last move with double the effect.",
    flavorText: "He closes the deal and seals the win.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "Optimist Prime",
    manaCost: "5U",
    land: "island",
    type: "Creature",
    subtype: "Human Optimist",
    description:
      "Positivity Beam: Boost the power and toughness of all allies by +2 for 2 turns. Charge Tackle: Rush forward, dealing 3 damage to enemies in your path. Hope Shield: Create a protective barrier around all allies for 2 turns.",
    flavorText: "Hope is the ultimate power.",
    power: 4,
    toughness: 5,
    rarity: "Mythic Rare",
    value: 20,
  },
];

const palmenCards = [
  {
    name: "Excel-erator",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Engineer",
    description:
      "Data Blast: Throw explosive charts that deal 3 damage to all enemies in an area. Formula Shield: Use complex formulas to deflect incoming attacks for 1 turn. Cell Division: Create duplicates of yourself for 2 turns, confusing enemies.",
    flavorText: "With the power of data, he controls the battlefield.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "The Calculating Dancer",
    manaCost: "4R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Dancer",
    description:
      "Pivot Table Twist: Spin to create a whirlwind, dealing 4 damage to all enemies within range. Jazzy Moves: Dodge the next attack with stylish dance steps. Graph Grapple: Pull an enemy closer using graph lines, dealing 2 damage.",
    flavorText: "He crunches numbers, and opponents, with style.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "Number Cruncher",
    manaCost: "5G",
    land: "forest",
    type: "Creature",
    subtype: "Human Mathematician",
    description:
      "Sum Strike: Deal combo hits that add up to an extra 3 damage. Spreadsheet Slam: Drop a giant sheet on foes, dealing 5 damage. Calm Calculus: Slow down time for 1 turn to plan your next move.",
    flavorText: "Precision, planning, and pure power in every strike.",
    power: 4,
    toughness: 5,
    rarity: "Mythic Rare",
    value: 20,
  },
  {
    name: "The Silent Solver",
    manaCost: "3W",
    land: "plains",
    type: "Creature",
    subtype: "Human Problem Solver",
    description:
      "Tranquil Tide: Emit a calming aura that slows all enemies within range for 2 turns. Equation Explosion: Set traps that detonate when solved, dealing 3 damage to nearby enemies. Balance Beam: Walk across thin air, allowing you to reach high places.",
    flavorText: "In stillness, he finds the solution to every problem.",
    power: 3,
    toughness: 4,
    rarity: "Uncommon",
    value: 14,
  },
];

const virreCards = [
  {
    name: "Deal Maker",
    manaCost: "3B",
    land: "swamp",
    type: "Creature",
    subtype: "Human Negotiator",
    description:
      "Silver Tongue: Charm an enemy and have them fight for you for 1 turn. Contract Clash: Throw scrolls that bind target opponent, immobilizing them for 2 turns. Power Pose: Buff yourself by +2 power with a commanding stance for 1 turn.",
    flavorText: "Confidence is his currency, and deals are his weapons.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "The Vocal Vanguard",
    manaCost: "4R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Speaker",
    description:
      "Echoing Voice: Push all enemies back with a blast of sound, dealing 2 damage. Sales Surge: Boost all allies' stats by +1 for 2 turns with motivational speeches. CEO Slam: Leap forward and strike, dealing 4 damage to an enemy.",
    flavorText: "His words echo with the force of an avalanche.",
    power: 3,
    toughness: 4,
    rarity: "Uncommon",
    value: 15,
  },
  {
    name: "Game Master",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Gamer",
    description:
      "Desert Eagle: Deal 3 damage to a single target with a precision shot. Lag Switch: Slow all opponents' movement for 2 turns. High Score: For every consecutive hit, gain +1 attack power.",
    flavorText: "With every hit, his skills level up.",
    power: 3,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "Pitch King",
    manaCost: "5W",
    land: "plains",
    type: "Creature",
    subtype: "Human Leader",
    description:
      "Royal Command: Freeze all enemies for 1 turn, stopping their actions. Persuasion Pulse: Deal 2 damage and weaken all opponents for 1 turn. Negotiation Nuke: Deal 6 damage to target enemy after charging for 1 turn.",
    flavorText: "His words can topple kingdoms and build empires.",
    power: 5,
    toughness: 5,
    rarity: "Mythic Rare",
    value: 20,
  },
];

const robinCards = [
  {
    name: "The Chuckler",
    manaCost: "3G",
    land: "forest",
    type: "Creature",
    subtype: "Human Comedian",
    description:
      "Laugh Riot: Stun all enemies with infectious laughter for 1 turn. Bass Boost: Create sound waves that deal 3 damage to all enemies in range. Friendly Fire: Temporarily charm enemies, turning them into allies for 1 turn.",
    flavorText:
      "With a laugh that disarms and a bass that booms, he controls the battlefield.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "Insurance Ace",
    manaCost: "4W",
    land: "plains",
    type: "Creature",
    subtype: "Human Professional",
    description:
      "Policy Shield: Generate a shield that absorbs up to 5 damage. Premium Payout: Reflect 3 damage back to attackers. Claim Collector: Drain 2 life from enemies and heal yourself.",
    flavorText: "Every policy is a weapon in his hands.",
    power: 3,
    toughness: 5,
    rarity: "Uncommon",
    value: 16,
  },
  {
    name: "Red Hot Striker",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Musician",
    description:
      "Californication Flame: Engulf your attacks in fire, dealing 4 damage and burning enemies for 2 turns. Funky Groove: Dodge the next incoming attack with unpredictable movement. Bass Bomb: Drop a sonic explosion from your guitar, dealing 5 damage to all enemies.",
    flavorText: "When the groove hits, the battlefield ignites.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "The Connector",
    manaCost: "3U",
    land: "island",
    type: "Creature",
    subtype: "Human Diplomat",
    description:
      "Handshake Snare: Trap target enemy for 1 turn with a friendly gesture. Network Web: Summon NPC friends to deal 2 damage each to all enemies. Chuckle Chain: Chain attacks that increase in power, gaining +1 damage with each successive hit.",
    flavorText:
      "Through friendship and laughter, he weaves an unstoppable network.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 17,
  },
];

const ivarCards = [
  {
    name: "Pokerface Prodigy",
    manaCost: "3B",
    land: "swamp",
    type: "Creature",
    subtype: "Human Gambler",
    description:
      "Card Throw: Throw sharp playing cards dealing 3 damage to target enemy. All-In Attack: Deal massive damage, 6 points, with a 2-turn cooldown. Luck Shift: Temporarily alter odds, giving yourself a 50% chance of dodging all attacks for 1 turn.",
    flavorText: "Luck is no coincidence; it’s the hand he was dealt.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "Humble High Roller",
    manaCost: "4W",
    land: "plains",
    type: "Creature",
    subtype: "Human High Roller",
    description:
      "Wealth Wave: Send a wave of energy dealing 4 damage to all enemies. Calculating Calm: Slow down time, allowing you to plan and execute precise attacks, giving +2 accuracy for 2 turns. Chip Shield: Use poker chips to create a barrier that absorbs up to 5 damage.",
    flavorText:
      "He plays with subtle elegance, but his stakes are anything but modest.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "Strategist Supreme",
    manaCost: "5U",
    land: "island",
    type: "Creature",
    subtype: "Human Strategist",
    description:
      "Mind Game: Predict enemy moves, reducing their damage by 50% for 1 turn. Pawn Promotion: Summon 2 minions to assist in battle. Endgame Executor: Deal a powerful 5 damage combo after setting up 3 consecutive moves.",
    flavorText: "In every game, he’s already thinking five moves ahead.",
    power: 4,
    toughness: 3,
    rarity: "Mythic Rare",
    value: 20,
  },
  {
    name: "The Quiet Genius",
    manaCost: "3G",
    land: "forest",
    type: "Creature",
    subtype: "Human Genius",
    description:
      "Analytical Strike: Deal extra damage to weakened enemies, +3 damage. Zen Mode: Become immune to debuffs for 2 turns. Energy Balance: Redistribute health between yourself and your allies, healing 2 points.",
    flavorText: "In stillness, he finds the perfect strategy.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 17,
  },
];

const amandaCards = [
  {
    name: "Mountain Maven",
    manaCost: "3G",
    land: "forest",
    type: "Creature",
    subtype: "Human Skier",
    description:
      "Snow Slide: Glide quickly, leaving icy trails that slow enemies. Avalanche Aura: Summon falling snow to deal 3 damage to all enemies in an area. Nature's Embrace: Heal 2 life every turn when near natural elements.",
    flavorText: "Elegance and power, carving a path through the mountains.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "HR Heroine",
    manaCost: "4W",
    land: "plains",
    type: "Creature",
    subtype: "Human Professional",
    description:
      "Policy Enforcement: Stun target enemy for 1 turn with a violation notice. Team Builder: Buff all allies, increasing their stats by +1 for 2 turns. Conflict Resolution: Temporarily disarm all enemies for 1 turn.",
    flavorText: "She turns policies into power and harmony into strength.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "Curly Crusader",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Warrior",
    description:
      "Hair Whip: Strike with her curls, dealing 3 damage. Ski Jump Smash: Leap and slam down, dealing 4 area damage. Wildlife Whisperer: Summon animals to assist in battle, dealing 2 damage to all enemies.",
    flavorText: "Her curls whip, and the wild answers her call.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "The Alpine Archeress",
    manaCost: "4U",
    land: "island",
    type: "Creature",
    subtype: "Human Archer",
    description:
      "Frost Arrow: Freeze target enemy upon impact for 1 turn. Ski Sprint: Swiftly move across the battlefield, dodging attacks. Blizzard Blast: Unleash a chilling wind, dealing 3 damage to all enemies and slowing them for 1 turn.",
    flavorText: "With each arrow, winter’s bite is felt.",
    power: 3,
    toughness: 4,
    rarity: "Mythic Rare",
    value: 20,
  },
  {
    name: "Blonde Blizzard",
    manaCost: "5W",
    land: "plains",
    type: "Creature",
    subtype: "Human Elementalist",
    description:
      "Frostbite: Deal 3 damage and freeze target creature. Truth Mirror: Reflect all projectiles back at their attackers this turn.",
    flavorText: "The cold truth comes for you, whether you're ready or not.",
    power: 4,
    toughness: 5,
    rarity: "Mythic Rare",
    value: 20,
  },
];

const robbanCards = [
  {
    name: "The Short Circuit",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Musician",
    description:
      "Bass Bolt: Shoot electric charges, dealing 3 damage to target enemy. Light Show: Blind all enemies for 1 turn with flashing lights. Red Hot Rush: Dash forward, dealing 4 damage to all enemies in your path.",
    flavorText: "He moves with the speed of light and hits like thunder.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 18,
  },
  {
    name: "Indoor Illuminator",
    manaCost: "4W",
    land: "plains",
    type: "Creature",
    subtype: "Human Electrician",
    description:
      "Blinding Flash: Overload the lights, stunning all enemies for 1 turn. Fixture Flurry: Throw light fixtures, dealing 3 damage to multiple enemies. Neon Shield: Create a glowing barrier that absorbs 5 damage.",
    flavorText: "When the lights go out, he’s just getting started.",
    power: 3,
    toughness: 4,
    rarity: "Rare",
    value: 16,
  },
  {
    name: "Chili Pepper",
    manaCost: "3R",
    land: "mountain",
    type: "Creature",
    subtype: "Human Musician",
    description:
      "Spicy Solo: Play a bass solo that ignites the area, dealing 4 damage and burning enemies for 2 turns. Pepper Grenade: Throw explosive peppers, dealing 3 damage in an area. Rhythm Rampage: Gain attack speed with each successful hit, adding +1 to each strike.",
    flavorText: "The rhythm is fiery, and so is the battlefield.",
    power: 4,
    toughness: 3,
    rarity: "Rare",
    value: 17,
  },
  {
    name: "The Groove Guardian",
    manaCost: "4G",
    land: "forest",
    type: "Creature",
    subtype: "Human Rockstar",
    description:
      "Sonic Boom: Strike the bass to create shockwaves that deal 4 damage to all enemies. Friendship Vibes: Buff all allies with uplifting tunes, giving +2 to their attack power for 1 turn. Echo Strike: Attacks have a delayed secondary impact, dealing 2 extra damage.",
    flavorText: "With every note, he strikes both fear and friendship.",
    power: 4,
    toughness: 4,
    rarity: "Mythic Rare",
    value: 20,
  },
];

export const characterCards = [
  ...sebbeCards,
  ...dennanCards,
  ...mattisCards,
  ...freddeCards,
  ...schaeranCards,
  ...klingenCards,
  ...anteCards,
  ...palmenCards,
  ...virreCards,
  ...robinCards,
  ...ivarCards,
  ...robbanCards,
  ...amandaCards,
];