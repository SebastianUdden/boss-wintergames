import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const LETTER_SPEED = 50;

interface IGameOver {
  loserCaptain?: string;
}

export const GameOver = ({ loserCaptain = "shipwrecked" }: IGameOver) => {
  const parts = [
    {
      header: "The battle fer the seas be over",
      body: `  Aye, well fought, ye scurvy dogs! As captain ${loserCaptain} has lost all their crew and then some more, they now be a captive captain, doomed to carry their ship alone in this next part o' the adventure...`,
    },
    " Arrr, after failin' to make it to the dock in time fer the ship's departure, many a salty pirate wondered what became o' the famed Ivar o' the Red Sea. Feared to have gone down to Davy Jones' locker, the crew were stunned to find a note from the legend in the pocket of their captive captain.",
    {
      header: "Ivar's note",
      body: " Ye scallywags, all yer time plunderin' the high seas means nothin' without a hoard fit fer a pirate king. Before I passed into the icy grasp o' the arctic seas, I left ye a treasure. A prize worthy o' the roughest rogues among ye. Heed my words well ye hear?!",
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
  ];

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
    if (currentPart < parts.length - 1) {
      setCurrentPart((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex m-auto max-w-[1200px]">
      <img
        src="/backgrounds/maps/pirate-map-background.png"
        alt="Pirate Map"
        className="flex flex-grow base-image"
      />
      <div className="flex flex-col gap-6 content-overlay p-[14vw] py-[12vh] 2xl:px-[15vh] text-4xl z-50">
        <>
          {typeof parts[currentPart] === "string" ? (
            <p className="whitespace-pre-wrap">{currentText}</p>
          ) : (
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
              <h2 className="text-5xl font-bold">
                {parts[currentPart].header}
              </h2>
              <p className="whitespace-pre-wrap">{currentText}</p>
            </>
          )}
          {isTypingComplete && currentPart < parts.length - 1 && (
            <button
              className={cn(
                "treasure treasure-color completed-button !font-pirata"
              )}
              onClick={handleNextPart}
            >
              Next Chapter
            </button>
          )}
        </>
      </div>
      <div className="overlay"></div>
    </div>
  );
};
