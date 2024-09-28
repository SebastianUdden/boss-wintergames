import { useEffect, useState } from "react";
import { Team } from "./teams/Team-backup";
import { Spinner } from "./spinner/Spinner";
import { miniGames } from "./mini-games/miniGames";
import {
  getPlayerSetup,
  getRandomPlayer,
  IMiniGame,
  MiniGame,
} from "./mini-games/MiniGame";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { initialTeams } from "./teams/teams";
import { Header } from "./Header";

const Layout = () => {
  const [timeToPlay, setTimeToPlay] = useState(false);
  const [teams, setTeams] = useState(initialTeams);
  const [teamsTurn, setTeamsTurn] = useState(Math.random() < 0.5 ? 0 : 1);
  const [turn, setTurn] = useState("");
  // const [openGame, setOpenGame] = useState<IMiniGame | undefined>(
  //   miniGames[14]
  // );
  const [openGame, setOpenGame] = useState<IMiniGame | undefined>(undefined);
  const [previousTurns, setPreviousTurns] = useState<string[]>([]);

  const handleOpenGame = (name: string) => {
    setOpenGame(miniGames.find((g) => g.name === name));
  };

  const handleGameComplete = () => {
    handleSelectNextPlayer();
  };

  const handleSelectNextPlayer = () => {
    const nextTeam = teamsTurn === 0 ? 1 : 0;
    setTeamsTurn(nextTeam);
    if (
      previousTurns.length === 0 ||
      previousTurns.length === teams.flatMap((t) => t.players).length
    ) {
      setPreviousTurns([]);
      const nextTeamPlayers = teams[nextTeam].players;
      const nextPlayer = getRandomPlayer(nextTeamPlayers);
      setTurn(nextPlayer.name);
      setPreviousTurns([nextPlayer.name]);
      return;
    }
    const availablePlayers = teams[nextTeam].players;
    const filteredPlayers = availablePlayers.filter(
      (p) => !previousTurns.includes(p.name)
    );
    const nextPlayer = getRandomPlayer(filteredPlayers);
    setTurn(nextPlayer.name);
    setPreviousTurns((prev) => [...prev, nextPlayer.name]);
  };

  useEffect(() => {
    handleSelectNextPlayer();
  }, []);

  return (
    <div className="min-w-full min-h-screen">
      <Header
        onSelectGame={(index) => setOpenGame(miniGames[index])}
        onToggleWheel={() => setTimeToPlay(!timeToPlay)}
      />
      {openGame ? (
        <main>
          <MiniGame
            {...openGame}
            playerSetup={getPlayerSetup(turn, teamsTurn, teams)}
            onGameComplete={(playerScores) => {
              setTeams(
                teams.map((team) => ({
                  ...team,
                  players: team.players.map((p) => {
                    let score = p.score;
                    playerScores.forEach((ps) => {
                      if (p.name === ps.player) {
                        score = p.score + ps.score;
                      }
                    });
                    return {
                      ...p,
                      score,
                    };
                  }),
                }))
              );
              setOpenGame(undefined);
            }}
          />
        </main>
      ) : (
        <main
          className={cn(
            timeToPlay &&
              "flex flex-wrap lg:grid gap-4 p-2 m-auto grid-cols-[10vw,1fr,10vw] lg:grid-cols-[300px,1fr,300px] max-w-full"
          )}
        >
          <div className="flex w-full gap-6 justify3-between">
            <div className="flex-grow">
              <Team {...teams[0]} />
            </div>
            {timeToPlay && (
              <Spinner
                turn={turn}
                onGameCompleted={handleGameComplete}
                onOpenGame={handleOpenGame}
              />
            )}
            <div className="flex-grow">
              <Team {...teams[1]} />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Button
              onClick={handleSelectNextPlayer}
              className="p-10 px-20 text-2xl bg-green-600 rounded-full"
            >
              Start
            </Button>
          </div>
          {timeToPlay && (
            <>
              {/* <div className="z-50 hidden lg:block">
                <Team {...teams[0]} />
              </div>
              <Spinner
                turn={turn}
                onGameCompleted={handleGameComplete}
                onOpenGame={handleOpenGame}
              />
              <div className="z-50 w-[45vw] mr-auto lg:hidden">
                <Team {...teams[0]} />
              </div>
              <div className="z-50 w-[45vw] lg:w-full">
                <Team {...teams[1]} />
              </div> */}
            </>
          )}
        </main>
      )}
    </div>
  );
};

export default Layout;
