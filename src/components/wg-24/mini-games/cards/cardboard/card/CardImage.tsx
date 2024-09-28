import React from "react";

const getCardImage = (name: string) => {
  if (name === "mountain") return "/games/cards/background-mountain.webp";
  if (name === "swamp") return "/games/cards/background-swamp.webp";
  if (name === "island") return "/games/cards/background-island.webp";
  if (name === "plains") return "/games/cards/background-plains.webp";
  if (name === "forest") return "/games/cards/background-forest.webp";
  if (name === "beer bear") return "/games/cards/beer-bear.webp";
  if (name === "red red wine") return "/games/cards/red-red-wine.webp";
  if (name === "city roamer") return "/games/cards/background-city.webp";
  if (name === "benzema") return "/games/cards/benzema.webp";
  if (name === "curt bergfors") return "/games/cards/curt-bergfors.webp";
  if (name === "gris") return "/games/cards/gris.webp";
  if (name === "mod") return "/games/cards/mod.webp";
  if (name === "meat club") return "/games/cards/meat-club.webp";
  if (name === "klose") return "/games/cards/klose.webp";
  if (name === "fiji time") return "/games/cards/fiji-time.webp";
  if (name === "awesome possum") return "/games/cards/awesome-possum.webp";
  if (name === "french estate") return "/games/cards/french-estate.webp";
  if (name === "salmon factory") return "/games/cards/salmon-factory.webp";
  if (name === "fifa-rules") return "/games/cards/fifa-rules.webp";
  if (name === "the tall coder") return "/games/cards/hero-tall-coder.webp";
  if (name === "string striker") return "/games/cards/hero-string-striker.webp";
  if (name === "gym maestro") return "/games/cards/hero-gym-maestro.webp";
  if (name === "the slam dunker") return "/games/cards/hero-slam-dunker.webp";
  if (name === "the bearded mailman")
    return "/games/cards/hero-the-bearded-mailman.webp";
  if (name === "plumbinator") return "/games/cards/hero-plumbinator.webp";
  if (name === "red beard raider")
    return "/games/cards/hero-red-beard-raider.webp";
  if (name === "tattooed titan") return "/games/cards/hero-tattooed-titan.webp";
  if (name === "track trickster")
    return "/games/cards/hero-track-trickster.webp";
  if (name === "brush runner") return "/games/cards/hero-brush-runner.webp";
  if (name === "the prankster painter")
    return "/games/cards/hero-the-prankster-painter.webp";
  if (name === "the speed painter")
    return "/games/cards/hero-the-speed-painter.webp";
  if (name === "the salmon dancer")
    return "/games/cards/hero-the-salmon-dancer.webp";
  if (name === "cycling tycoon") return "/games/cards/hero-cycling-tycoon.webp";
  if (name === "aloof entrepreneur")
    return "/games/cards/hero-aloof-entrepeneur.webp";
  if (name === "dancepreneur") return "/games/cards/hero-dancepreneur.webp";
  if (name === "the alpine ranger")
    return "/games/cards/hero-the-alpine-ranger.webp";
  if (name === "eco warrior") return "/games/cards/hero-eco-warrior.webp";
  if (name === "blizzard biathlete")
    return "/games/cards/hero-blizzard-biathlete.webp";
  if (name === "guardian of nature")
    return "/games/cards/hero-guardian-of-nature.webp";
  if (name === "eco warrior") return "/games/cards/hero-eco-warrior.webp";
  if (name === "truth slicer") return "/games/cards/hero-truth-slicer.webp";
  if (name === "the management maverick")
    return "/games/cards/hero-the-management-maverick.webp";
  if (name === "alpine analyst") return "/games/cards/hero-alpine-analyst.webp";
  if (name === "the golfer of legends")
    return "/games/cards/hero-the-golfer-of-legends.webp";
  if (name === "hype hero") return "/games/cards/hero-hype-hero.webp";
  if (name === "optimist prime") return "/games/cards/hero-optimist-prime.webp";
  if (name === "the motivator") return "/games/cards/hero-the-motivator.webp";
  if (name === "sales slammer") return "/games/cards/hero-sales-slammer.webp";
  if (name === "excel-erator") return "/games/cards/hero-excel-erator.webp";
  if (name === "the calculating dancer")
    return "/games/cards/hero-the-calculating-dancer.webp";
  if (name === "number cruncher")
    return "/games/cards/hero-number-cruncher.webp";
  if (name === "the silent solver")
    return "/games/cards/hero-the-silent-solver.webp";
  if (name === "deal maker") return "/games/cards/hero-deal-maker.webp";
  if (name === "the vocal vanguard")
    return "/games/cards/hero-the-vocal-vanguard.webp";
  if (name === "game master") return "/games/cards/hero-game-master.webp";
  if (name === "pitch king") return "/games/cards/hero-pitch-king.webp";
  if (name === "the chuckler") return "/games/cards/hero-the-chuckler.webp";
  if (name === "insurance ace") return "/games/cards/hero-insurance-ace.webp";
  if (name === "red hot striker")
    return "/games/cards/hero-red-hot-striker.webp";
  if (name === "pokerface prodigy")
    return "/games/cards/hero-pokerface-prodigy.webp";
  if (name === "humble high roller")
    return "/games/cards/hero-humble-high-roller.webp";
  if (name === "strategist supreme")
    return "/games/cards/hero-strategist-supreme.webp";
  if (name === "the quiet genius")
    return "/games/cards/hero-the-quiet-genius.webp";
  if (name === "the short circuit")
    return "/games/cards/hero-the-short-circuit.webp";
  if (name === "indoor illuminator")
    return "/games/cards/hero-indoor-illuminator.webp";
  if (name === "chili pepper") return "/games/cards/hero-chili-pepper.webp";
  if (name === "the groove guardian")
    return "/games/cards/hero-the-groove-guardian.webp";
  if (name === "the connector") return "/games/cards/hero-the-connector.webp";
  if (name === "mountain maven") return "/games/cards/hero-mountain-maven.webp";
  if (name === "hr heroine") return "/games/cards/hero-hr-heroine.webp";
  if (name === "curly crusader") return "/games/cards/hero-curly-crusader.webp";
  if (name === "the alpine archeress")
    return "/games/cards/hero-the-alpine-archeress.webp";

  if (name === "blonde blizzard")
    return "/games/cards/hero-blonde-blizzard.webp";
  return "/environments/clouds.png";
};

interface CardImageProps {
  name: string;
  altText: string;
}

export const CardImage: React.FC<CardImageProps> = ({ name, altText }) => {
  return (
    <div className="relative h-[190px] bg-gray-950 border border-gray-950 mx-1 -my-0.5 z-1">
      <img
        src={getCardImage(name)}
        alt={altText}
        className="absolute inset-0 object-cover w-full h-full"
      />
    </div>
  );
};
