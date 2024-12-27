import { useState, useEffect } from "react";
import { Score } from "../Score";
import { Timer } from "./Timer";
import { provideScoresOnWinner, Winner } from "../Winner";
import { categories, Category } from "./categories";
import { StartButton } from "../StartButton";
import { IMiniGameBase } from "../MiniGame";

const TIME = 30;
type GameState = "ready" | "active" | "finished";

export const TheFloor = ({ players, onGameComplete }: IMiniGameBase) => {
  const [scores, setScores] = useState([0, 0]);
  const [player1Time, setPlayer1Time] = useState(TIME);
  const [player2Time, setPlayer2Time] = useState(TIME);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState<0 | 1>(() => (Math.random() < 0.5 ? 0 : 1));
  const [currentImage, setCurrentImage] = useState(0);
  const [gameState, setGameState] = useState<GameState>("ready");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<Category>("exoticFruits");
  const [messageState, setMessageState] = useState<
    "correct" | "pass" | "empty"
  >("empty");

  const images = categories[category];

  const startGame = () => {
    setGameState("active");
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handleAnswer = (correct: boolean) => {
    if (messageState !== "empty") return;
    if (correct) {
      setMessageState("correct");
      setTurn(turn === 0 ? 1 : 0);
      setTimeout(() => {
        setMessageState("empty");
        nextImage();
      }, 500);
    } else {
      setMessageState("pass");
      setTimeout(() => {
        setMessageState("empty");
        nextImage();
      }, 3000);
    }
  };

  useEffect(() => {
    if (gameState !== "active") return;

    const timer = setInterval(() => {
      if (turn === 0) {
        setPlayer1Time((prev) => Math.max(prev - 1, 0));
        if (player1Time <= 0) {
          setMessage(`${players[1][0].name} wins!`);
          setWinner(players[1][0].name);
          setGameState("finished");
          setScores([-1, 1]);
        }
      } else {
        setPlayer2Time((prev) => Math.max(prev - 1, 0));
        if (player2Time <= 0) {
          setMessage(`${players[0][0].name} wins!`);
          setWinner(players[0][0].name);
          setGameState("finished");
          setScores([1, -1]);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, turn, player1Time, player2Time, players]);

  useEffect(() => {
    if (messageState === "correct") {
      setMessage(`Correct! Switching to ${players[turn][0].name}!`);
    }
    if (messageState === "pass") {
      setMessage("Pass! New image after 3 seconds...");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [messageState, turn, players]);

  useEffect(() => {
    provideScoresOnWinner({ onGameComplete, winner, players });
  }, [winner, players]);

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <h1 className="mb-2">Shipmate's Wit</h1>
      <select
        className="mb-4 text-2xl"
        onChange={(e) => {
          // eslint-disable-next-line
          // @ts-ignore
          setCategory(e.target.value);
        }}
      >
        <option value="exoticFruits">Exotic fruits</option>
        <option value="fictionalPirates">Fictional pirates</option>
        <option value="pirateShip">Things found on a pirate ship</option>
      </select>
      <div className="grid grid-cols-[22.5%,1fr,22.5%] gap-4 w-full h-full">
        <Timer time={player1Time} />
        <div className="flex flex-col items-center gap-4">
          {gameState === "ready" && (
            <StartButton onStartGame={startGame}>Start Game</StartButton>
          )}
          {gameState === "finished" && (
            <Winner>
              {winner} triumphed
              <br />
              over the waves o’ time
              <br />
              and sunk yer scallywag foe!
              <br /> The sea sings yer name!
            </Winner>
          )}
          {gameState === "active" && (
            <>
              <img className="h-[45vh] rounded-xl" src={images[currentImage]} />
              <div className="flex mb-4 -translate-x-4">
                <button
                  className={`px-4 py-2 mr-2 bg-green-800 rounded-md ${
                    messageState === "pass" || messageState === "correct"
                      ? "opacity-50 pointer-events-none" // Disabled styles
                      : "bg-opacity-80 hover:bg-opacity-100" // Enabled styles
                  }`}
                  onClick={() => handleAnswer(true)}
                  disabled={
                    messageState === "pass" || messageState === "correct"
                  }
                >
                  Correct
                </button>
                <button
                  className={`px-4 py-2 bg-red-800 rounded-md ${
                    messageState === "pass" || messageState === "correct"
                      ? "opacity-50 pointer-events-none" // Disabled styles
                      : "bg-opacity-80 hover:bg-opacity-100" // Enabled styles
                  }`}
                  onClick={() => handleAnswer(false)}
                  disabled={
                    messageState === "pass" || messageState === "correct"
                  }
                >
                  Pass
                </button>
              </div>
            </>
          )}
        </div>
        <Timer time={player2Time} />
      </div>
      <p>{message}</p>
      <div className="grid grid-cols-[15%,1fr,15%] gap-4 w-full">
        <div />
        <div className="flex items-end justify-between w-full gap-2">
          {players[0].length !== 0 &&
            (!winner || players[0][0].name === winner) && (
              <Score
                players={players[0]}
                score={scores[0]}
                isActive={turn === 0 || players[0][0].name === winner}
              />
            )}
          {players[1].length !== 0 &&
            (!winner || players[1][0].name === winner) && (
              <Score
                players={players[1]}
                score={scores[1]}
                isActive={turn === 1 || players[1][0].name === winner}
                isRight={true}
              />
            )}
        </div>
        <div />
      </div>
    </div>
  );
};
