import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Players } from "./Players";
import { IPlayer, players } from "../teams/players";

const LETTER_SPEED = 5;

interface IStart {
  onUpdateTeam: (teamIndex: number, players: IPlayer[]) => void;
  onComplete?: () => void;
}

export const Start = ({ onUpdateTeam, onComplete }: IStart) => {
  const [availablePlayers, setAvailablePlayers] = useState(
    players.filter((p) => p.name !== "Sebbe" && p.name !== "Mattis")
  );
  const [disableSelection, setDisableSelection] = useState(false);
  const parts = [
    {
      header: "Welcome to the BOSS Pirate Games!",
      body: `  Before we begin, two captains arise. Fight for your glory and then claim your prize.`,
    },
    {
      header: "Blue captain, step forth!",
      playerSelection: true,
      teamName: "Blue",
    },
    {
      header: "Red captain, stand proud!",
      playerSelection: true,
      teamName: "Red",
    },
    {
      body: `  Next we must know, how the teams will be set. This is a chance for the captain's regret.`,
    },
    {
      header: "Blue captain, select!",
      playerSelection: true,
      teamName: "Blue",
    },
    {
      header: "Red captain, select!",
      playerSelection: true,
      teamName: "Red",
    },
    {
      header: "Blue captain, select!",
      playerSelection: true,
      teamName: "Blue",
    },
    {
      header: "Red captain, select!",
      playerSelection: true,
      teamName: "Red",
    },
    {
      header: "Blue captain, select!",
      playerSelection: true,
      teamName: "Blue",
    },
    {
      header: "Red captain, select!",
      playerSelection: true,
      teamName: "Red",
    },
    {
      header: "Blue captain, select!",
      playerSelection: true,
      teamName: "Blue",
    },
    {
      body: `  Now that they've recruited such a rugged crew. In but a short while can we let them stew.
        With dangers abound they must never slip, helmsmen step forth, as a coin you will flip.
        A skull for the Red and a chest for the Blue, both helmsmen assigned to join a crew.`,
    },
    {
      header: "Red helmsman, greet your captain!",
      playerSelection: true,
      teamName: "Red",
    },
    {
      header: "Blue helmsman, greet your captain!",
      playerSelection: true,
      teamName: "Blue",
    },
    {
      body: `  With helmsmen and crew each captain stand tall, but what of the ship that should carry them all?
        They must toil to create it with blood, sweat and tears. Then bring it with them for all of their years.
        This ship be their pride and it carries their fame, but she can not do so with no proper name.
        The prefix important, one Red and one Blue, the rest of the naming I leave up to you!
        Now go out and build them for glory and pride, find all the tools that these shipyards provide.
        When each ship is ready for the rest of the game, come back to this place and write in her name.
        `,
    },
    {
      body: `  Thus each ship is readied for the voyage ahead, with patience and virtue all doubts you have shed.
        Now we revel as each ship leaves the port, bring out the champaign as she now sallies forth.`,
    },
    {
      body: `   With ships and crew ready the voyage begins, helmsmen grab the rudders and follow the winds!
        Captain and crew you must heed their calls, they've wrestled with krakens and both got huge balls.
        If their advice you can follow and voyage beyond, there's bounties galore when you leave this small pond.`,
    },
  ];

  const [currentPart, setCurrentPart] = useState(0); // Tracks the current part being displayed
  const [currentText, setCurrentText] = useState(""); // Tracks the text being typed out
  const [isTypingComplete, setIsTypingComplete] = useState(false); // Indicates when typing is complete

  const handleSelect = (type: string, player: IPlayer) => {
    if (type === "Blue") {
      setDisableSelection(true);
      setAvailablePlayers(
        availablePlayers.filter((p) => player.name !== p.name)
      );
      onUpdateTeam(0, [
        currentPart < 3
          ? { ...player, isCaptain: true }
          : { ...player, isCaptain: false },
      ]);
      setTimeout(() => {
        handleNextPart();
        if (currentPart === 10) {
          setAvailablePlayers(
            players.filter((p) => p.name === "Sebbe" || p.name === "Mattis")
          );
        }
      }, 1100);
    } else if (type === "Red") {
      setDisableSelection(true);
      setAvailablePlayers(
        availablePlayers.filter((p) => player.name !== p.name)
      );
      onUpdateTeam(1, [
        currentPart < 3
          ? { ...player, isCaptain: true }
          : { ...player, isCaptain: false },
      ]);
      setTimeout(() => {
        handleNextPart();
      }, 1100);
    }
  };

  useEffect(() => {
    if (currentPart < parts.length) {
      let charIndex = 0;
      setCurrentText(""); // Reset text for the new part
      setIsTypingComplete(false); // Mark typing as incomplete

      const part = parts[currentPart];
      const fullText = typeof part === "string" ? part : part.body ?? "";

      const typeEffect = setInterval(() => {
        if (charIndex < fullText.length - 1) {
          setCurrentText((prev) => prev + fullText[charIndex]); // Append character
          charIndex++;
        } else {
          clearInterval(typeEffect); // Stop interval when done
          setIsTypingComplete(true); // Mark typing as complete
        }
      }, LETTER_SPEED); // Typing speed in milliseconds

      return () => clearInterval(typeEffect); // Cleanup interval
    }
  }, [currentPart]);

  const handleNextPart = () => {
    if (currentPart < parts.length - 1) {
      setDisableSelection(false);
      setCurrentPart((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex m-auto max-w-[1200px] select-none">
      <img
        src="/backgrounds/maps/pirate-map-background.png"
        alt="Pirate Map"
        className="flex flex-grow base-image"
      />
      <div className="flex flex-col gap-6 content-overlay p-[14vw] py-[12vh] 2xl:px-[15vh] text-3xl z-50">
        <>
          {parts[currentPart].img && (
            <img
              className="object-cover transition-transform origin-center rounded-full aspect-square"
              src={parts[currentPart].img}
              style={{
                width: "15vh",
                height: "15vh",
                transformOrigin: "center",
              }}
            />
          )}
          <h2 className="text-5xl font-bold">{parts[currentPart].header}</h2>
          <p className="whitespace-pre-wrap">{currentText}</p>
          {parts[currentPart].playerSelection && (
            <Players
              players={availablePlayers}
              onSelect={(p) => handleSelect(parts[currentPart].teamName, p)}
              disableSelection={disableSelection}
            />
          )}
          {!parts[currentPart].playerSelection &&
            isTypingComplete &&
            currentPart < parts.length - 1 && (
              <button
                className={cn(
                  "treasure treasure-color completed-button !font-pirata"
                )}
                onClick={handleNextPart}
              >
                Next Chapter
              </button>
            )}
          {isTypingComplete && currentPart === parts.length - 1 && (
            <button
              className={cn(
                "treasure treasure-color completed-button !font-pirata"
              )}
              onClick={onComplete}
            >
              We're ready to begin our voyage!
            </button>
          )}
        </>
      </div>
      <div className="overlay"></div>
    </div>
  );
};
