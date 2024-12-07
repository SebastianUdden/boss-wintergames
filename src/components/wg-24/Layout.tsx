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
import { initialTeams, ITeam } from "./teams/teams";
import { Header } from "./Header";
import { Footer } from "./Footer";

const interleaveChosen = (chosenPlayers: string[][]) => {
  const [teamA, teamB] =
    chosenPlayers[0].length >= chosenPlayers[1].length
      ? chosenPlayers
      : [chosenPlayers[1], chosenPlayers[0]]; // Start with the larger team

  const maxLength = Math.max(teamA.length, teamB.length); // Handle cases where team sizes differ
  const interleaved = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < teamA.length) interleaved.push(teamA[i]); // Add from the larger team first
    if (i < teamB.length) interleaved.push(teamB[i]); // Add from the smaller team next
  }

  return interleaved;
};

const getRandomPlayersForGame = (
  teams: ITeam[],
  gameType: "solo" | "duell" | "2v2" | "lagkamp"
): string[][] => {
  if (gameType === "solo") {
    // For solo games, pick one random player from any team
    const allPlayers = teams.flatMap((team) => team.players);
    return [[allPlayers[Math.floor(Math.random() * allPlayers.length)].name]];
  }

  if (gameType === "duell") {
    // For duels, pick one player from each team
    return teams.map((team) => {
      const randomPlayer =
        team.players[Math.floor(Math.random() * team.players.length)];
      return [randomPlayer.name];
    });
  }

  if (gameType === "2v2") {
    // For 2v2, pick two players from each team
    return teams.map((team) => {
      const shuffledPlayers = [...team.players].sort(() => Math.random() - 0.5);
      return shuffledPlayers.slice(0, 2).map((player) => player.name);
    });
  }

  if (gameType === "lagkamp") {
    // For lagkamp, pick all players (assuming full teams)
    return teams.map((team) => team.players.map((player) => player.name));
  }

  console.warn("Unsupported game type");
  return [[]];
};

export type Phase =
  | "ready"
  | "waiting-for-spin"
  | "spinning-wheel"
  | "transition-from-spinning"
  | "transition-to-game"
  | "explaining-game"
  | "selecting-players"
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
  const [highlightedPlayers, setHighlightedPlayers] = useState<string[]>([]);
  const [chosenPlayers, setChosenPlayers] = useState<string[][]>([]);
  const [openGame, setOpenGame] = useState<IMiniGame | undefined>(undefined);
  const [previousTurns, setPreviousTurns] = useState<string[]>([]);

  const handleOpenGame = (name: string) => {
    const nextGame = miniGames.find((g) => g.name === name) ?? miniGames[0];
    setChosenPlayers(getRandomPlayersForGame(teams, nextGame.gameType)); // Example chosen players
    setOpenGame(nextGame);
  };

  const handleSelectNextLoser = useCallback(() => {
    if (losers.length === 0) {
      return;
    }

    const randomness = Math.floor(Math.random() * 4);
    const cycles = 4;
    const totalSteps = randomness + cycles * losers.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      const index = currentStep % losers.length;
      setHighlightedPlayers([losers[index]]);
      currentStep++;

      // When we finish cycling through all the losers
      if (currentStep > totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("transitioning-captive"); // Transition to the next phase or handle captive selection here
        }, 2000);
      }
    }, 200);
  }, [losers, setPhase]);

  const handleHighlightPlayers = useCallback(() => {
    const allPlayers = teams.flatMap((team) => team.players.map((p) => p.name));
    const interleavedChosen = interleaveChosen(chosenPlayers);
    const initialDelay = 100; // Starting delay in milliseconds
    const delayDecrement = 20; // Decrease delay by this amount for each player
    const minDelay = 80; // Minimum delay to prevent it from going too fast
    let initialCycles = Math.floor(Math.random() * 3) + 1;
    const minCycles = 0;
    let currentChosenIndex = 0; // Index of the currently chosen player in `flattenedChosen`
    let highlighted = []; // Accumulated highlighted players
    let currentStep = 0; // Tracks the current step for highlighting
    let totalSteps = initialCycles * allPlayers.length; // Steps for full cycles
    let delay = initialDelay; // Current interval delay

    const runHighlight = () => {
      const index = currentStep % allPlayers.length; // Current index in the cycle
      const currentPlayer = allPlayers[index];

      // Highlight the current player along with previously chosen players
      setHighlightedPlayers([...highlighted, currentPlayer]);

      // Check if the cycle should stop at the current chosen player
      if (
        currentStep >= totalSteps &&
        currentPlayer === interleavedChosen[currentChosenIndex]
      ) {
        // Add the current chosen player to the highlighted list
        if (!highlighted.includes(currentPlayer)) {
          highlighted.push(currentPlayer);
        }

        // Move to the next chosen player
        currentChosenIndex++;

        // If all chosen players have been highlighted, finish
        if (currentChosenIndex >= interleavedChosen.length) {
          // Ensure all chosen players remain highlighted
          setHighlightedPlayers([...highlighted]);

          // Add the setTimeout logic here
          setTimeout(() => {
            setTeams((prevTeams) =>
              prevTeams.map((team) => ({ ...team, minimized: true }))
            );
          }, 1500);

          setTimeout(() => {
            setPhase("playing-game");
          }, 2000);

          return;
        }

        // Update total steps for the next player
        totalSteps = initialCycles * allPlayers.length;

        // Reset `currentStep` to start from the index of the last selected player
        const lastPlayerIndex = allPlayers.indexOf(currentPlayer);
        currentStep = lastPlayerIndex + 1; // Start from the next player

        // Decrease the delay for the next cycle
        delay = Math.max(minDelay, delay - delayDecrement);
        initialCycles = Math.max(minCycles, initialCycles - 1);
      } else {
        currentStep++;
      }

      // Schedule the next highlight
      setTimeout(runHighlight, delay);
    };

    // Start the highlight loop
    runHighlight();
  }, [teams, chosenPlayers]);

  const handleMovePlayer = useCallback(() => {
    setTeams((prevTeams) => {
      if (playerMoved.current) return prevTeams; // Prevent re-running

      const updatedTeams = [...prevTeams];

      // Use the losingTeamIndex to identify the losing team
      const loserIndex = losingTeamIndex;
      const opposingTeamIndex = loserIndex === 0 ? 1 : 0;

      // Find the player to move from the losing team
      const playerToMove = updatedTeams[loserIndex].players.find(
        (p) => p.name === highlightedPlayers[0]
      );

      if (!playerToMove) {
        console.error("Highlighted player not found in the losing team");
        return prevTeams;
      }

      // Remove the player from the losing team
      updatedTeams[loserIndex].players = updatedTeams[
        loserIndex
      ].players.filter((p) => p.name !== highlightedPlayers[0]);

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
      setHighlightedPlayers([]);
      setPhase("ready");
      playerMoved.current = false; // Reset the playerMoved flag
    }, 3000);
  }, [highlightedPlayers, losingTeamIndex]);

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
      phase !== "selecting-players" &&
      phase !== "calculating-score" &&
      phase !== "selecting-captive" &&
      phase !== "transitioning-captive";
    setTeams(teams.map((team) => ({ ...team, minimized })));
    if (phase === "selecting-players") {
      handleHighlightPlayers();
    }
    if (phase === "transition-from-spinning") {
      setTimeout(() => {
        setPhase("transition-to-game");
      }, 1000);
      setTimeout(() => {
        setPhase("explaining-game");
      }, 1100);
    }
    if (phase === "selecting-captive") {
      handleSelectNextLoser();
    }
    if (phase === "transitioning-captive" && highlightedPlayers) {
      handleMovePlayer();
    }
  }, [phase]);

  return (
    <div className="min-w-full min-h-screen shipwrecked h-[100vh]">
      <Header
        phase={phase}
        onSelectGame={(index) => {
          setOpenGame(miniGames.slice()[index]);
          setPhase("explaining-game");
        }}
        onSetPhase={(p) => setPhase(p)}
      />
      {JSON.stringify(chosenPlayers)}
      <main className="z-10" style={{ overflow: "hidden" }}>
        <div className="overflow-y-hidden bg-center bg-cover bg-pirate-village h-[100vh]">
          {/* Background tint overlay */}
          <div className="absolute inset-0 z-0 bg-black bg-opacity-50 pointer-events-none top-[5vh]"></div>

          <div className="z-10 flex justify-between w-full gap-2">
            {teams[0].players.length > 0 && (
              <Team
                {...teams[0]}
                highlightedPlayers={highlightedPlayers}
                isUnOpposed={teams[1].players.length === 0}
              />
            )}
            <div
              className={cn(
                "flex h-[80vh] w-[80vh] translate-y-[100vh] transition-all duration-1000",
                phase === "explaining-game" ||
                  phase === "playing-game" ||
                  phase === "transition-to-game"
                  ? ""
                  : "hidden",
                phase === "explaining-game" || phase === "playing-game"
                  ? "translate-y-0"
                  : ""
              )}
            >
              <MiniGame
                teams={teams}
                phase={phase}
                miniGame={openGame}
                playerSetup={playerSetup}
                chosenPlayers={chosenPlayers}
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
                "flex -translate-x-[5%] sm:-translate-x-0 h-[80vh] w-[80vh] translate-y-[100vh] transition-all duration-1000 bg-center bg-cover bg-wheel-of-fortune",
                phase === "spinning-wheel" ? "translate-y-[17vh]" : "",
                phase === "waiting-for-spin" ||
                  phase === "spinning-wheel" ||
                  phase === "transition-from-spinning"
                  ? ""
                  : "hidden"
              )}
            >
              <Spinner
                turn={highlightedPlayers[0]}
                onGameSelected={handleOpenGame}
                onPhaseChange={(p) => setPhase(p)}
                phase={phase}
                wheelSize="55vh"
              />
            </div>
            {teams[1].players.length > 0 && (
              <Team
                {...teams[1]}
                highlightedPlayers={highlightedPlayers}
                isUnOpposed={teams[0].players.length === 0}
              />
            )}
          </div>
          <Footer phase={phase} setPhase={setPhase} />
        </div>
      </main>
    </div>
  );
};

export default Layout;

// const handleSelectPlayers = useCallback(() => {
//   setPhase("selecting-players");
//   // const nextTeam = teamsTurn === 0 ? 1 : 0;
//   // setTeamsTurn(nextTeam);

//   // let nextPlayer = { name: "" };
//   // if (
//   //   previousTurns.length === 0 ||
//   //   previousTurns.length === teams.flatMap((t) => t.players).length
//   // ) {
//   // setPreviousTurns([]);
//   // const nextTeamPlayers = teams[nextTeam].players;
//   // nextPlayer = getRandomPlayer(nextTeamPlayers);
//   // setPreviousTurns([nextPlayer.name]);
//   // }
//   //  else {
//   //   const availablePlayers = teams[nextTeam].players;
//   //   const filteredPlayers = availablePlayers.filter(
//   //     (p) => !previousTurns.includes(p.name)
//   //   );
//   //   nextPlayer = getRandomPlayer(filteredPlayers);
//   //   setPreviousTurns((prev) => [...prev, nextPlayer.name]);
//   // }

//   chosenPlayers.forEach((player) => {
//     // Start the highlighting effect
//     const allPlayers = teams.flatMap((team) =>
//       team.players.map((p) => p.name)
//     );
//     const selectedPlayerIndex = allPlayers.indexOf(player);
//     const cycles = 4; // Number of times to cycle through all players
//     const totalSteps = cycles * allPlayers.length + selectedPlayerIndex;
//     let currentStep = 0;

//     const numPlayersToSelect = gameTypes[openGame.gameType]; // Solo, 1v1, etc.
//     const selectedPlayers = [];
//     const team1Players = [];
//     const team2Players = [];
//     console.log("1");
//     console.log({ numPlayersToSelect });

//     const interval = setInterval(() => {
//       const index = currentStep % allPlayers.length;
//       setHighlightedPlayers([allPlayers[index]]);
//       currentStep++;
//       if (currentStep > totalSteps) {
//         // setTimeout(() => {
//         //   setTeams(teams.map((team) => ({ ...team, minimized: true })));
//         // }, 1500);
//         // setTimeout(() => {
//         //   setPhase("playing-game");
//         // }, 2000);
//         clearInterval(interval);
//       }
//     }, 100);
//   });
// }, [teamsTurn, previousTurns, teams]);

// const handleSelectPlayers = useCallback(() => {
//   setPhase("selecting-players");
//   const nextTeam = teamsTurn === 0 ? 1 : 0;
//   setTeamsTurn(nextTeam);

//   const allPlayers = teams.flatMap((team) =>
//     team.players.map((player) => ({ ...player, teamId: team.id }))
//   );

//   const cycles = 4; // Number of times to cycle through all players
//   const totalSteps = cycles * allPlayers.length;
//   let currentStep = 0;

//   const numPlayersToSelect = gameTypes[openGame.gameType]; // Solo, 1v1, etc.
//   const selectedPlayers = [];
//   const team1Players = [];
//   const team2Players = [];
//   console.log("1");
//   console.log({ numPlayersToSelect });
//   const interval = setInterval(() => {
//     console.log("2");
//     const index = currentStep % allPlayers.length;
//     const currentPlayer = allPlayers[index];
//     console.log(currentPlayer);

//     // Add player to the selected list if not already selected
//     if (
//       !selectedPlayers.includes(currentPlayer.name) &&
//       selectedPlayers.length < numPlayersToSelect
//     ) {
//       console.log("3");
//       selectedPlayers.push(currentPlayer.name);

//       // Distribute players evenly into two teams for team games
//       if (numPlayersToSelect > 2 && numPlayersToSelect % 2 === 0) {
//         console.log("4");
//         if (team1Players.length < numPlayersToSelect / 2) {
//           console.log("5");
//           team1Players.push(currentPlayer.name);
//         } else {
//           console.log("6");
//           team2Players.push(currentPlayer.name);
//         }
//       }

//       setHighlightedPlayers(selectedPlayers); // Update UI with highlighted players
//     }

//     currentStep++;

//     // Stop when the required number of players are selected
//     if (
//       selectedPlayers.length >= numPlayersToSelect ||
//       currentStep > totalSteps
//     ) {
//       clearInterval(interval);

//       // Optional: Transition to the next phase after a delay
//       setTimeout(() => {
//         // Set selected teams for team games
//         if (numPlayersToSelect > 2 && numPlayersToSelect % 2 === 0) {
//           setTeams((prevTeams) => [
//             {
//               ...prevTeams[0],
//               selectedPlayers: team1Players,
//             },
//             {
//               ...prevTeams[1],
//               selectedPlayers: team2Players,
//             },
//           ]);
//         }

//         // setPhase("playing-game");
//       }, 1500);
//     }
//   }, 100);
// }, [teamsTurn, previousTurns, teams, openGame]);

// const gameTypes = {
//   solo: 1,
//   duell: 2,
//   "2v2": 4,
//   lagkamp: 12,
// };
