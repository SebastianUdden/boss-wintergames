import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect } from "react";
import { IScore, Score } from "../Score";
import { Timer } from "./Timer";
import { IPlayer } from "../../teams/players";
import { Winner } from "../Winner";
import { categories } from "./categories";

type GameState = "ready" | "active" | "finished";

interface ITheFloor {
  players: IPlayer[][];
  onGameComplete: (playerScores: IScore[]) => void;
}

export const TheFloor = ({ players, onGameComplete }: ITheFloor) => {
  const [scores, setScores] = useState([0, 0]);
  const [player1Time, setPlayer1Time] = useState(60);
  const [player2Time, setPlayer2Time] = useState(60);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState<0 | 1>(() => (Math.random() < 0.5 ? 0 : 1));
  const [currentImage, setCurrentImage] = useState(0);
  const [gameState, setGameState] = useState<GameState>("ready");
  const [message, setMessage] = useState("");
  const [messageState, setMessageState] = useState<
    "correct" | "pass" | "empty"
  >("empty");

  const images = categories.fictionalPirates;
  // [
  //   "data:image/jpeg;base64,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", // Replace these with actual images or URLs
  //   "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEBUTExIVFhUXEhUVFxUWGBUXFRcYGhUYGBcXGBYYHSggGBslGxgWITEhJSorLi4uGCAzODMsNygtLisBCgoKDg0OGxAQGy8lHyUtLS0tMi0tLS0vLS0vLS0tLS0tLy0tLS0tLS0vNS0tLS0tLS0tLS0tNS01LS0tLS0tLf/AABEIAMcA/QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwQBAgUGBwj/xAA4EAABAwIDBQcDAwMEAwAAAAABAAIRAyEEMUEFElFhcSKBkaGxwfAGE9EyUuEHFPEVQmKicoKS/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAMEAQIFBv/EACkRAQACAgEDAwMEAwAAAAAAAAABAgMRIQQSMRNBUQUikRQyYYEjM8H/2gAMAwEAAhEDEQA/APuKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIip4zadOn+pwngLn+Fi1orG5ZiszxC4i8rjfq3d/SxscySfZcPHfWdSDD/AAgfyqt+txV/lZp0eW3s+jIvk7fq/Ezaoe+581NU+sMWBaqMhEtYc+PZUcfUcXxKePpmaZ40+pIvkeJ+rcbNqhsBMADrkFc2V9TY1zoFSQM94NIHlfuW8ddjn5bT9KzRXe4/L6gi8xS+pnwAaYe7iJaPC6y/6ncM2M/+ipv1GP5VP0uX4emReao/WFOYc0j/AMSD5GF28DtCnVE03g8RkR1But65K28SjvhvT90LSIi3RiIiAiIgIiICIiAiIgIiICIiAiIgLStVDRLjAWXvABJyC8ft3bIM8BkNO9Q5s0Y67lNhwzktqFvaO2XOs0kN5ZnqV5faOKcZzju9iqlfahLS6eyTY6Gw/T+7NUqm+64c53Kwj/rmuVe3qc2mXax9L6cIMQ52jj881Gacmcj6hdA4J0doW638Qua55YS1wMaOi468QqOWsxPDNssw23RM8vgV/CYaR4es/hcr7kmw52nPVd3AE7klpByuIUFptvcbPXmPCSjs2N69jke5ZwmHLBExJnh5qw7HtDYJAPCRKpVtqsBgi5uJy4zZZ/T5bTuOInzsrOXJvh3CIZawjX8Li4vEtFgGu5n8lcivtp1RxaBBBIPjn08Vy620CTElpJ7nd2i6NotPFVrF0dvdexG0aYNyPH4As7N2+WPBa+CMoMFcTGYAuuImbjTu4dFz34V7QTwMHOx5hWMdY15W56bHaun3/wCmfqMVwGvtUjud/K9CvzfsX6gq0KgdMtkSNeoPFfevprbTMVQD2mTA3vyuhiyb4ny839Q6Gennuj9susiIpnNEREBERAREQEREBERAREQERa1HwCToJQee+qtp7o+2M4k+w914GtTfUflvEzEjsgcTy5LubXqb7945vdEf8deknyC3ZQAbcza/PgFw8szmyTb2d/pqxhpHy846RmC92h5WkCYA9OmsFXEPZFnEkxlO7aeQLuXML0tUDUSdB1yn5oqFTZzd+b70Z8yfHNa9mpXK5Kz5hymY+8SbC8mTOgy5KhittuLjBcMhAEa5/OK7mL2a0tnK4Fhc381UqbHabCSY0jlnI5KWv8p8fo73MKNLGVS5rYMHtG4HZ4fOKkxOPcHOv2Q2QY8dTMEm/JWhsuWuG6ZOZnMcPfjdUNu4PdY3dHZDRcwCJ0SeZhNX07WiIcbGOO+bk30Noz5K1ga2/LMgCYkj9N7Tb4QosK2wkSDplp+VUE785FsZ8rRdbzG+Fq0RMa+Fis4sqk87z1sfHNWX0g65Mggi41IzHRZxjQYtoAQLmIvl3x1WMK/ebGcLX22htO4iUtGWmDA00uI0HT0UGJmSfK6mYJF8xl1HzySo4nIW4aG+nctoRb1LjV8JN22Oo0lej+h/qA4Oq2XS0uLXtnIfj3XJqYe5g9Bqbi3A8e9VMYwfq8VLFmctK5adlvEv0tQqh7Q5pkOAIPIrdeF/pTtg1cMaLjLqeXHdJ/PqvdK/S3dG3jM+KcWSaT7CIi2RCIiAiIgIiICIiAiIgKptN0UyONvf2Vtczbj4aO/2UeWdUmW+ON2iHkJ36o3dBHISc4Vx1MOIAy1lY2dRguM5uJVqkLE81x8Xjcuza2uI9lWvQGcKD7ABl2ZHueHcrjbuA4D8fysGnIcQM8lLEbZi2uFGvhmkj5kLKN+HtEazYeSvfaOeqjruIblw6arbSSLz4U/7a0DLgqePwQLYOgHuI5LqNHYLnDLhzyVDH1NxrjnYkAdMlpbhLS1u7h4VzC2q2IvOuUCATwN0xdCCHW7QvlnbXw81riQRVL5GU5jM2IOupU7CTSHZuHX5TP4WfiXXvMxqSnSG80j9rg4ZTHPjEeCiezdfaIMH89FKacsEZj2kLNYDO8W9jPTLwSEcSjcyXSLa/wCFHiCbECwB7u7ity0QCDrlaR3KQHsxYXmTry7o81liZ0rAOOQyI+X5JVbvZ2m3ipnSxxi4cMo1AnuRxJvcmb26Qs7Nu/8A02qGhiWSf1vNM98AeZX2dfC9jVN2q08HA25EfhfdFc6a24l5z6tX/LFvkREVlyhERAREQEREBERAREQFxfqQAhoOV/z7LtLj7fbO70d7Kv1X+qyXBOrw4FNvraOFzEK24Wi0Xn3hQUwN0zxjnz+dFvSPWeB/K48X7eHUtLFEdoyNVI46aGVikQATJzy4KCuTEyR2jdSUyQRzLao7hlPtdVqrrgZ/LLO9Hve4zzVSvXyIm4tnb8qSbwlrXlIK0Ajvj2XK2s/sawDfmNfnJTFxk3+Zqhiqo3d0GTmdL2GWmiivfhax11bbgVqbd0SMtDrnOfTxWoYWggE2IOs9eaY4z+oS4WIGWY0By/CGSJNxug2kutHjktq706nPajwta7hOvdMc+qlrNgATeItw4dbKDBskm0gtJIteJVurbnp3EeqkmeWluLcKzRLYm44C+esaX8lqwSCMr28PyVM1uZjgYsDIN4+aoczpl/hGJlo4mATJI19+WiUjkDYxnoOvisuabxFgSRx8s0FON3OSzLwEWWWm13ZTpI4hv8L7pSPZHQL4hs9t+eXjZfb2CAByVvpfdwfqv7q/3/xsiIrbkCIiAiIgIiICIiAiIgLm7bpy1vUj54LpKptRk0+hB9vdRZo3jmG+OdWh5aPI/wASrNN4uNQoqzIHefU/lR4cyXE6geK87aeZdSeY2zTEtBOog+Q/K1r5C17+CmYMxySq2QRy+eiiidTuGItqXPr1AQSCbNy45DXqq9XssBOY4fnopMRh4YQcjfOFpMsjgYHTTvUs5tQsRMRHHyo1XyJZrI9j6Li1SQ82sDHcTmV36VGATzJiNCSVz6lGDOemnW609RbxZIjbz2KaQ53ZOQMai+Y7vRb4No3ZBGsDMGTnK6mLpA2IzEW9OioMYAJjLTK2Vu9WqX3VejJ3U0pYVm7N+U8bZdJ9FadcgQQI8RNukFWabwSeFvfzy8VJuaX19r8ltN+Wtsm5c6s0SREa3+d6ic0uJ3Tlx6SfDJa46sWGAOy4c5Gl+5RBo3M/9s6nL4QpojhLFZ1tZcZAE5jvKUcwSLAgT86pSBIBPwae6kzd08jx9FlDadcOrsOkX16TTrUbPe6F9pXyb6Aw5fjQcw0ud0ABj/sR4r6yr3Sx9sy879Tt/kiPiBERWXNEREBERAREQEREBERAWlZm80jiCFuiTyPJVmGCDYyfVQUrG5zAC7O2MNDt4ZO8j891x47XnC811OOcd5rLpY791U7LLV2fzqsF1lq51471Sm+oFfHQWmclTpwG2HOV0a2WXiqdP9JHNRXtwkrb7dK73WXNxIB05nn+f4XSLIsVWq0bd/v/AJWcN591jFbTnGmSZki148lUqstePwum4ZRlrPpPRVsSBmruO/Olut+dK7WjeJJzaLDiAVncJn5fr5KZhynuW1f9MRc/PFSb5Z7uXntp0yA6IuQcri4n5yUOEEQOR6ZkWv1XVxlMv32yC6BAyi41VIUw0kQZyB6ZlW6X3XS5XL9mmDlBFsgOFhaykaRIPK/Xh6KObDvPfH4TCsL3ta0FznENaNSTAHmVnare76T/AEvwMMq1iP1O3GnoJd3SR4Fe5VLYuzxh8PToj/Y0Ani7Nx7ySVdXWx17axDzPUZPUyTYREW6EREQEREBERAREQEREBERBHXpBzS05H5K8pj6Bpvg6eY0K9eq2PwbarYNjoeH8Kn1nS+tXjzCXFk7J/h5Nx1WWm3ss4rDupndcI9CPcKrUqRyheYvW1Z7Zhej7vDatVFiFBv9qPkqFzt10aOuOqjLh0uo5iO5v26lLX5LR5n0WTUtChebLWsRE8M1nlXcQCe/L50VLECT0g9VZrm3Ix8lUnPkkjKwyurWP5Wq290rcu661xLwB8+cFo6vZQYqtIixnNS03vlmtp3yxSOvH0VLEQSeYgjMlSuda5tPwqm83VmnHKS2TW5avJhe/wD6ZfT8n+7qNgCRSB45Of6gd/JcT6N+mXYupvPkUGHtOy3j+xp9Tp1hfYKVMNaGtADQAABYAAQABoF0Olwzae+39OV1XVbjshsiIui5wiIgIiICIiAiIgIiICIiAiLEoMotS5RurIMYvCtqN3XDodR0XlNrbMdTue0z9w068F6OrjAFzsVtcAFVOq6OmeOeJ+UlMk0eUxDJHmFUqj5lCtbRxtMEkWHDMdyoGsx4lrwY0Bv3heb6jpcuCfujj59l2uaLQm+7MLSrUhVPuRqozigfRVNxLPfCd1TrwVWuYFlq6rGqr1q44+ampZJGaIa1nEtPQfDyUDahAuoquMHFVnYmTAV3HFrfbEMzniITVHwM16T6T+kX4kipVmnQz4PqDg3g3/l4cRQ2JQptIe8b7tJ/SP8A11PVeyw+3DxXWwdHPnJ+FPL1U24h7XCU6dNjadNoaxohrRkApw9eVobWnVX6W0JXRVHc3klc2ni1YbXQWpWVA2qtw9BIi1lZlBlFiVlAREQEREBERBgrRzlsVo4IIaj1TrVFcexQPooORiXFcfFUiV6aph1Xfg0HisXgC5cevsKTK+ivwHJQu2dyQfOzsmoMnu8Son7KqfuK+iO2aOCidszko/RxzO+2PxDO5fPTsup+53itf9IdqSvoB2XyWp2XySMOOPFY/BuXgm7FVmjsqNF7T/TOSyNmclvERHhh5ijhCFeo0Cu63Z3JSswCyOdh2FdHDyp2YRWGYdBmi4q3Teo2UlMxiCdj1M16ga1StCCdrluHKIBbhBKCsrQLZBsiwFlAREQEREGIWIWyINC1alilWIQQmktDRVmEhBTNBaHDq9CbqDnnDLU4VdHdWNxBzThVqcLyXU3Fj7aDl/2qf2q6f20+2g5n9ss/266X21j7aCgMOthRV37azuIKYpLcU1Z3FncQQBi3DVLurMINA1bALaFmEGIWUhZQEREBERAREQEREBERAREQEREBERAWIRECEhEQISERAhIRECEhEQISERBlERAREQEREH//2Q==",
  //   "data:image/jpeg;base64,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",
  //   // Add more images as needed
  // ];

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
          setMessage(`${players[1][0]} wins!`);
          setWinner(players[1][0].name);
          setGameState("finished");
          setScores([-1, 1]);
          setTimeout(() => {
            onGameComplete([
              { player: players[0][0], score: -1 },
              { player: players[1][0], score: 1 },
            ]);
          }, 5000);
        }
      } else {
        setPlayer2Time((prev) => Math.max(prev - 1, 0));
        if (player2Time <= 0) {
          setMessage(`${players[0][0]} wins!`);
          setWinner(players[0][0].name);
          setGameState("finished");
          setScores([1, -1]);
          setTimeout(() => {
            onGameComplete([
              { player: players[0][0], score: 1 },
              { player: players[1][0], score: -1 },
            ]);
          }, 5000);
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

    // setMessage(
    //   `${
    //     currentPlayer === 1 ? players[0][0].name : players[1][0].name
    //   }'s turn!`
    // );
  }, [messageState, turn, players]);

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <h1 className="mb-4">Shipmate's Wit</h1>
      <div className="grid grid-cols-[22.5%,1fr,22.5%] gap-4 w-full h-full">
        <Timer time={player1Time} />
        <div className="flex flex-col items-center gap-4">
          {gameState === "ready" && (
            <Button
              className="p-20 my-auto text-white ocean-blue text-8xl"
              onClick={startGame}
            >
              Start Game
            </Button>
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
              <img className="h-[55vh] rounded-xl" src={images[currentImage]} />
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
      <div className="grid grid-cols-[15%,1fr,15%] gap-4 w-full">
        <div />
        <div className="flex items-end justify-between w-full gap-2">
          {players[0].length !== 0 &&
            (!winner || players[0][0].name === winner) && (
              <Score
                player={players[0][0]}
                score={scores[0]}
                isActive={turn === 0 || players[0][0].name === winner}
              />
            )}
          {players[1].length !== 0 &&
            (!winner || players[1][0].name === winner) && (
              <Score
                player={players[1][0]}
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
