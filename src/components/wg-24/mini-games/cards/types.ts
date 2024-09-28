export type CardType = "Attack" | "Heal";

export interface ICard {
  id: string; // Unique identifier for the card
  name: string; // Card name
  manaCost?: string; // Mana cost (e.g., "2G" for 2 colorless and 1 green)
  land: "forest" | "plains" | "island" | "mountain" | "swamp";
  type?: string; // Card subtype (e.g., "Elf Druid")
  subtype?: string; // Card subtype (e.g., "Elf Druid")
  description: string; // Card ability/effect
  tap?: string;
  flavorText?: string; // Optional flavor text for lore
  power?: number; // Power (for creatures)
  toughness?: number; // Toughness (for creatures)
  rarity?: "Common" | "Uncommon" | "Rare" | "Mythic Rare"; // Card rarity
  value?: number; // Card value for any additional purposes
}

export interface IPlayer {
  name: string;
  health: number;
  hand: ICard[];
}

export type Phase = "draw" | "action" | "discard";
