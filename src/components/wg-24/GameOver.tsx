import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const LETTER_SPEED = 5;

interface IGameOver {
  loserCaptain?: string;
}

export const GameOver = ({ loserCaptain = "shipwrecked" }: IGameOver) => {
  const parts = [
    {
      header: "The battle fer the seas be over",
      body: `  Aye, well fought, ye scurvy dogs! As captain ${loserCaptain} has lost all their crew and then some more, they now be a captive captain, doomed to carry their ship alone in this next part o' the adventure...`,
    },
    {
      body: " Arrr, after failin' to make it to the dock in time fer the ship's departure, many a salty pirate wondered what became o' the famed Ivar o' the Red Sea. Feared to have gone down to Davy Jones' locker, the crew were stunned to find a note from the legend in the pocket of their captive captain.",
    },
    {
      header: "Ivar's note",
      body: `
      Arrr, ye scallywags, gather ‘round an’ mark me words well! I be Ivar o’ the Red Sea, scourge o’ the saltwater lanes, and I’ve a tale worth more than all yer plundered gold. All yer years fightin’ storms an’ claimin’ the spoils mean nothin’ if ye can’t match wits with me.

Before I passed into the icy grasp o' the arctic seas, I hid a treasure so grand it’d make the gods themselves envy its gleam. I buried it deep, far beyond mortal grasp, and left a map—hidden from pryin’ eyes. But to find it, ye’ll need to solve my riddle first.

Every rhyme be a key, every verse a path. Miss even a single word, an’ ye’ll be lost to the depths. So steel yer nerves, sharpen yer wits, and listen close. The riddle o’ Ivar begins now…`,
      img: "/profiles/zoomed-ivar.jpeg",
    },
    {
      header: "The hunt fer Ivar's treasure",
      body: `       Ahoy, me hearties! The treasure lies deep,
Where secrets be buried and shadows do creep.
A tangle like seaweed ‘round anchor so tight,
Only the clever will unravel this plight.

    In darkness I rest, where the echoes do play,
Tightly rolled and hidden away.
Six paths lie before me, where dust hath its keep,
But only one leads to the shadows that sleep.

    Beware, ye mateys, this task be no game—
Ye’ll strain yer fingers or sully yer name.
Fetch me with care, or risk yer fate,
Before red seas rise and it be too late!`,
      img: "/profiles/zoomed-ivar.jpeg",
    },
    {
      header: "The hunt fer Ivar's treasure",
      body: `     So a clue you require, a way forward mate?
Perhaps a path forward to the wooden crate.

And yet there it lingers in noteworthy space,
a black hole that sings out from purple haze.
      `,
    },
    {
      header: "The hunt fer Ivar's treasure",
      body: `     Another one you say, to string you along?
Maybe if I drum up an answer and put it in song?

Search every rock and find where I roll,
I will get the blues if you can't find my soul.
      `,
    },
  ];

  const [timer, setTimer] = useState(0); // Tracks the current part being displayed
  const [currentPart, setCurrentPart] = useState(0); // Tracks the current part being displayed
  const [currentText, setCurrentText] = useState(""); // Tracks the text being typed out
  const [isTypingComplete, setIsTypingComplete] = useState(false); // Indicates when typing is complete

  useEffect(() => {
    if (currentPart < parts.length) {
      let charIndex = 0;
      setCurrentText(""); // Reset text for the new part
      setIsTypingComplete(false); // Mark typing as incomplete

      const part = parts[currentPart];
      const fullText = typeof part === "string" ? part : `${part.body}`;

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
    if (currentPart > 1) {
      setTimer(90);
    }
    if (currentPart < parts.length - 1) {
      setCurrentPart((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (timer < 91 && timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  }, [timer]);

  return (
    <div className="relative flex m-auto max-w-[1200px] overflow-scroll">
      <img
        src="/backgrounds/maps/pirate-map-background.png"
        alt="Pirate Map"
        className="flex flex-grow base-image"
      />
      <div className="flex flex-col gap-6 content-overlay py-[5vh] px-[14vw] 2xl:px-[15vh] text-3xl z-50 max-h-[80vh] mt-[10vh] mb-[10vh]">
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
          <div className="overflow-scroll">
            <p className="whitespace-pre-wrap">{currentText}</p>
            {isTypingComplete &&
              currentPart < parts.length - 1 &&
              timer === 0 && (
                <button
                  className={cn(
                    "treasure treasure-color completed-button !font-pirata"
                  )}
                  onClick={handleNextPart}
                >
                  {currentPart > 2 ? "Give us a clue!" : "Next Chapter"}
                </button>
              )}
          </div>
        </>
      </div>
      <div className="overlay"></div>
    </div>
  );
};
