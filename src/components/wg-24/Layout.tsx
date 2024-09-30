import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "./spinner/Spinner";
import { miniGames } from "./mini-games/miniGames";
import {
  getPlayerSetup,
  getRandomPlayer,
  IMiniGame,
  MiniGame,
} from "./mini-games/MiniGame";
import { cn } from "@/lib/utils";
import { Team } from "./teams/Team";
import { initialTeams } from "./teams/teams";
import { Header } from "./Header";
import { Footer } from "./Footer";

export type Phase =
  | "ready"
  | "selecting-player"
  | "waiting-for-spin"
  | "spinning-wheel"
  | "transition-from-spinning"
  | "transition-to-game"
  | "playing-game"
  | "calculating-score"
  | "selecting-captive"
  | "transitioning-captive";

const Layout = () => {
  const playerMoved = useRef(false);
  const [phase, setPhase] = useState<Phase>("ready");
  const [teams, setTeams] = useState(initialTeams);
  const [losers, setLosers] = useState<string[]>([]);
  const [teamsTurn, setTeamsTurn] = useState(Math.random() < 0.5 ? 0 : 1);
  const [losingTeamIndex, setLosingTeamIndex] = useState(0);
  const [turn, setTurn] = useState<string | undefined>();
  const [highlightedPlayer, setHighlightedPlayer] = useState<string>("");
  const [openGame, setOpenGame] = useState<IMiniGame | undefined>(miniGames[8]);
  const [previousTurns, setPreviousTurns] = useState<string[]>([]);

  const handleOpenGame = (name: string) => {
    setOpenGame(miniGames.find((g) => g.name === name) ?? miniGames[0]);
  };

  const handleSelectNextLoser = useCallback(() => {
    if (losers.length === 0) {
      return;
    }

    const randomness = Math.floor(Math.random() * 4);
    const cycles = 3;
    const totalSteps = randomness + cycles * losers.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      const index = currentStep % losers.length;
      setHighlightedPlayer(losers[index]);
      currentStep++;

      // When we finish cycling through all the losers
      if (currentStep > totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("transitioning-captive"); // Transition to the next phase or handle captive selection here
        }, 2000);
      }
    }, 100);
  }, [losers, setPhase]);

  const handleSelectNextPlayer = useCallback(() => {
    setPhase("selecting-player");
    const nextTeam = teamsTurn === 0 ? 1 : 0;
    setTeamsTurn(nextTeam);

    let nextPlayer = { name: "" };
    if (
      previousTurns.length === 0 ||
      previousTurns.length === teams.flatMap((t) => t.players).length
    ) {
      setPreviousTurns([]);
      const nextTeamPlayers = teams[nextTeam].players;
      nextPlayer = getRandomPlayer(nextTeamPlayers);
      setPreviousTurns([nextPlayer.name]);
    } else {
      const availablePlayers = teams[nextTeam].players;
      const filteredPlayers = availablePlayers.filter(
        (p) => !previousTurns.includes(p.name)
      );
      nextPlayer = getRandomPlayer(filteredPlayers);
      setPreviousTurns((prev) => [...prev, nextPlayer.name]);
    }

    // Start the highlighting effect
    const allPlayers = teams.flatMap((team) => team.players.map((p) => p.name));
    const selectedPlayerIndex = allPlayers.indexOf(nextPlayer.name);
    const cycles = 4; // Number of times to cycle through all players
    const totalSteps = cycles * allPlayers.length + selectedPlayerIndex;
    let currentStep = 0;

    const interval = setInterval(() => {
      const index = currentStep % allPlayers.length;
      setHighlightedPlayer(allPlayers[index]);
      currentStep++;
      if (currentStep > totalSteps) {
        setTimeout(() => {
          setTeams(teams.map((team) => ({ ...team, minimized: true })));
        }, 1500);
        setTimeout(() => {
          setPhase("waiting-for-spin");
        }, 2000);
        clearInterval(interval);
      }
    }, 100);
  }, [teamsTurn, previousTurns, teams]);

  const handleMovePlayer = useCallback(() => {
    setTeams((prevTeams) => {
      if (playerMoved.current) return prevTeams; // Prevent re-running

      const updatedTeams = [...prevTeams];

      // Use the losingTeamIndex to identify the losing team
      const loserIndex = losingTeamIndex;
      const opposingTeamIndex = loserIndex === 0 ? 1 : 0;

      // Find the player to move from the losing team
      const playerToMove = updatedTeams[loserIndex].players.find(
        (p) => p.name === highlightedPlayer
      );

      if (!playerToMove) {
        console.error("Highlighted player not found in the losing team");
        return prevTeams;
      }

      // Remove the player from the losing team
      updatedTeams[loserIndex].players = updatedTeams[
        loserIndex
      ].players.filter((p) => p.name !== highlightedPlayer);

      // Add the player to the opposing team
      updatedTeams[opposingTeamIndex].players = [
        ...updatedTeams[opposingTeamIndex].players,
        playerToMove,
      ];

      // Mark player as moved
      playerMoved.current = true;

      return updatedTeams;
    });

    // Reset the highlighted player and phase after moving
    setTimeout(() => {
      setHighlightedPlayer("");
      setPhase("ready");
      playerMoved.current = false; // Reset the playerMoved flag
    }, 3000);
  }, [highlightedPlayer, losingTeamIndex]);

  const playerSetup = getPlayerSetup(turn ?? "", teamsTurn, teams);

  useEffect(() => {
    const teamPlayers =
      teams[teamsTurn].players.length > 0
        ? teams[teamsTurn].players
        : teams[teamsTurn === 0 ? 1 : 0].players;
    setTurn(getRandomPlayer(teamPlayers).name);
  }, [teamsTurn, teams]);

  useEffect(() => {
    const minimized =
      phase !== "ready" &&
      phase !== "selecting-player" &&
      phase !== "calculating-score" &&
      phase !== "selecting-captive" &&
      phase !== "transitioning-captive";
    setTeams(teams.map((team) => ({ ...team, minimized })));
    if (phase === "selecting-player") {
      handleSelectNextPlayer();
    }
    if (phase === "transition-from-spinning") {
      setTimeout(() => {
        setPhase("transition-to-game");
      }, 1000);
      setTimeout(() => {
        setPhase("playing-game");
      }, 1100);
    }
    if (phase === "selecting-captive") {
      handleSelectNextLoser();
    }
    if (phase === "transitioning-captive" && highlightedPlayer) {
      handleMovePlayer();
    }
  }, [phase]);

  return (
    <div className="min-w-full min-h-screen shipwrecked h-[100vh]">
      <Header
        phase={phase}
        onSelectGame={(index) => setOpenGame(miniGames[index])}
        onSetPhase={(p) => setPhase(p)}
      />
      <main className="z-10" style={{ overflow: "hidden" }}>
        <div className="overflow-hidden bg-center bg-cover bg-pirate-village">
          {/* Background tint overlay */}
          <div className="absolute inset-0 z-0 bg-black bg-opacity-50 pointer-events-none top-[5vh]"></div>

          <div className="z-10 flex justify-between w-full gap-2 p-2">
            {teams[0].players.length > 0 && (
              <Team
                {...teams[0]}
                highlightedPlayer={highlightedPlayer}
                isUnOpposed={teams[1].players.length === 0}
              />
            )}
            <div
              className={cn(
                "flex h-[80vh] w-[80vh] translate-y-[100vh] transition-all duration-1000",
                phase === "playing-game" || phase === "transition-to-game"
                  ? ""
                  : "hidden",
                phase === "playing-game" ? "translate-y-0" : ""
              )}
            >
              <MiniGame
                teams={teams}
                miniGame={openGame}
                playerSetup={playerSetup}
                onGameComplete={(playerScores, loserIndex) => {
                  const filteredPlayerScores = playerScores.filter(
                    (ps) => ps.score !== 0
                  );
                  const newLosers = playerScores
                    .filter((ps) => ps.score < 0)
                    .map((p) => p.player);
                  setPhase("calculating-score");
                  const newTeams = teams.map((team) => ({
                    ...team,
                    players: team.players.map((p) => {
                      let showScore;
                      filteredPlayerScores.forEach((ps) => {
                        if (p.name === ps.player) {
                          console.log(p.name);
                          showScore = ps.score;
                        }
                      });
                      return {
                        ...p,
                        showScore,
                      };
                    }),
                  }));
                  setTeams(newTeams);
                  setLosers(newLosers);
                  setLosingTeamIndex(loserIndex);
                  setOpenGame(undefined);

                  setTimeout(() => {
                    setTeams(
                      teams.map((team) => ({
                        ...team,
                        minimized: false,
                        players: team.players.map((p) => {
                          let wins = p.wins;
                          let losses = p.losses;

                          filteredPlayerScores.forEach((ps) => {
                            if (p.name === ps.player && ps.score > 0) {
                              wins = (p.wins ?? 0) + ps.score;
                            } else if (p.name === ps.player && ps.score < 0) {
                              losses = (p.losses ?? 0) - ps.score;
                            }
                          });
                          return {
                            ...p,
                            wins,
                            losses,
                            showScore: undefined,
                          };
                        }),
                      }))
                    );
                    setPhase("selecting-captive");
                  }, 3000);
                }}
              />
            </div>
            <div
              className={cn(
                "flex -translate-x-[10%] 2xl:-translate-x-0 h-[80vh] w-[80vh] translate-y-[100vh] transition-all duration-1000 bg-center bg-cover bg-wheel-of-fortune",
                phase === "spinning-wheel" ? "translate-y-[17vh]" : "",
                phase === "waiting-for-spin" ||
                  phase === "spinning-wheel" ||
                  phase === "transition-from-spinning"
                  ? ""
                  : "hidden"
              )}
            >
              <Spinner
                turn={highlightedPlayer}
                onGameSelected={handleOpenGame}
                onPhaseChange={(p) => setPhase(p)}
                phase={phase}
                wheelSize="55vh"
              />
            </div>
            {teams[1].players.length > 0 && (
              <Team
                {...teams[1]}
                highlightedPlayer={highlightedPlayer}
                isUnOpposed={teams[0].players.length === 0}
              />
            )}
          </div>
          <Footer
            phase={phase}
            highlightedPlayer={highlightedPlayer}
            handleSelectNextPlayer={handleSelectNextPlayer}
            setPhase={setPhase}
          />
        </div>
      </main>
    </div>
  );
};

export default Layout;
