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
import { IPlayer } from "./teams/players";
import { useStoredState } from "./storedState";
import { Button } from "./ui/button";

type Turn = 0 | 1;
type LosingTeamIndex = 0 | 1 | undefined;

const interleaveChosen = (chosenPlayers: IPlayer[][]) => {
  if (chosenPlayers.flat().flat().length < 2)
    return chosenPlayers.flat().flat();
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
): IPlayer[][] => {
  if (gameType === "solo") {
    // For solo games, pick one random player from any team
    const allPlayers = teams.flatMap((team) => team.players);
    return [[allPlayers[Math.floor(Math.random() * allPlayers.length)]]];
  }

  if (gameType === "duell") {
    // For duels, pick one player from each team
    return teams.map((team) => {
      const randomPlayer =
        team.players[Math.floor(Math.random() * team.players.length)];
      return [randomPlayer];
    });
  }

  if (gameType === "2v2") {
    // For 2v2, pick two players from each team
    return teams.map((team) => {
      const shuffledPlayers = [...team.players].sort(() => Math.random() - 0.5);
      return shuffledPlayers.slice(0, 2);
    });
  }

  if (gameType === "lagkamp") {
    // For lagkamp, pick all players (assuming full teams)
    return teams.map((team) => team.players);
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
  | "captains-choice"
  | "transitioning-captive";

const Layout = () => {
  const playerMoved = useRef(false);
  const [showSelector, setShowSelector] = useState(false);
  const [phase, setPhase] = useStoredState<Phase>("phase", "ready");
  const [teams, setTeams] = useStoredState<ITeam[]>("teams", initialTeams);
  const [losers, setLosers] = useStoredState<IPlayer[]>("losers", []);
  const [teamsTurn, setTeamsTurn] = useStoredState<Turn>(
    "teamsTurn",
    Math.random() < 0.5 ? 0 : 1
  );
  const [losingTeamIndex, setLosingTeamIndex] =
    useStoredState<LosingTeamIndex>("losingTeamIndex");
  const [highlightedPlayers, setHighlightedPlayers] = useStoredState<IPlayer[]>(
    "highlightedPlayers",
    []
  );
  const [turn, setTurn] = useStoredState<string | undefined>("turn");
  const [chosenPlayers, setChosenPlayers] = useStoredState<IPlayer[][]>(
    "chosenPlayers",
    []
  );
  const [openGame, setOpenGame] = useStoredState<IMiniGame | undefined>(
    "openGame",
    miniGames[3]
  );
  const [previousTurns, setPreviousTurns] = useStoredState<string[]>(
    "previousTurns",
    []
  );

  const handleOpenGame = (name: string) => {
    const nextGame = miniGames.find((g) => g.name === name) ?? miniGames[0];
    setChosenPlayers(getRandomPlayersForGame(teams, nextGame.gameType));
    setOpenGame(nextGame);
  };

  const handleSelectNextLoser = useCallback(() => {
    if (losers.length === 0) {
      setPhase("captains-choice");
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
    const allPlayers = teams.flatMap((team) => team.players);
    const interleavedChosen = interleaveChosen(chosenPlayers);
    const initialDelay = 100; // Starting delay in milliseconds
    const delayDecrement = 20; // Decrease delay by this amount for each player
    const minDelay = 80; // Minimum delay to prevent it from going too fast
    let initialCycles = Math.floor(Math.random() * 3) + 1;
    const minCycles = 0;
    let currentChosenIndex = 0; // Index of the currently chosen player in `flattenedChosen`
    const highlighted: IPlayer[] = []; // Accumulated highlighted players
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
        currentPlayer.name === interleavedChosen[currentChosenIndex].name
      ) {
        // Add the current chosen player to the highlighted list
        if (!highlighted.some((h) => h.name === currentPlayer.name)) {
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
      if (playerMoved.current || !losingTeamIndex) return prevTeams; // Prevent re-running
      const updatedTeams = [...prevTeams];

      // Use the losingTeamIndex to identify the losing team
      const opposingTeamIndex = losingTeamIndex === 0 ? 1 : 0;

      // Find the player to move from the losing team
      const playerToMove = updatedTeams[losingTeamIndex].players.find(
        (p) => p.name === highlightedPlayers[0].name
      );

      if (!playerToMove) {
        console.error("Highlighted player not found in the losing team");
        return prevTeams;
      }

      // Remove the player from the losing team
      updatedTeams[losingTeamIndex].players = updatedTeams[
        losingTeamIndex
      ].players.filter((p) => p.name !== highlightedPlayers[0].name);

      // Add the player to the opposing team
      updatedTeams[opposingTeamIndex].players = [
        ...updatedTeams[opposingTeamIndex].players,
        { ...playerToMove, isCaptive: true },
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
    if (phase === "ready" || phase === "waiting-for-spin") {
      setOpenGame(undefined);
      setChosenPlayers([]);
    }
  }, [phase]);

  useEffect(() => {
    const getRandomPlayers = (players, count) => {
      const shuffled = [...players].sort(() => Math.random() - 0.5); // Shuffle the players
      return shuffled.slice(0, count); // Return the required number of players
    };

    if (teams) {
      if (openGame?.gameType === "duell") {
        setChosenPlayers(teams.map((t) => getRandomPlayers(t.players, 1)));
      } else if (openGame?.gameType === "2v2") {
        setChosenPlayers(teams.map((t) => getRandomPlayers(t.players, 2)));
      } else if (openGame?.gameType === "lagkamp") {
        setChosenPlayers(teams.map((t) => t.players));
      } else if (openGame?.gameType === "solo") {
        setChosenPlayers([
          [getRandomPlayers(teams[teamsTurn].players, 1)[0]], // Random 1 player from team 0
          [],
        ]);
      }
    }
  }, [openGame]);

  return (
    <div className="min-w-full min-h-screen shipwrecked h-[100vh]">
      <Header
        phase={phase}
        onSelectGame={(index) => {
          setOpenGame(miniGames.slice()[index]);
          setPhase("explaining-game");
        }}
        onSetPhase={(p) => setPhase(p)}
        teams={teams}
        setTeams={setTeams}
        highlightedPlayers={highlightedPlayers}
        chosenPlayers={chosenPlayers}
        openGame={openGame}
        turn={turn}
        losingTeamIndex={losingTeamIndex}
        losers={losers}
        teamsTurn={teamsTurn}
        previousTurns={previousTurns}
        setChosenPlayers={setChosenPlayers}
      />
      <main className="z-10" style={{ overflow: "hidden" }}>
        <div className="overflow-y-hidden bg-center bg-cover bg-pirate-village h-[100vh]">
          {/* Background tint overlay */}
          <div className="absolute inset-0 z-0 bg-black bg-opacity-50 pointer-events-none top-[5vh]"></div>

          <div className="z-10 flex justify-between w-full gap-2">
            {teams[0].players.length > 0 && (
              <Team
                {...teams[0]}
                highlightedPlayers={highlightedPlayers}
                phase={phase}
                isUnOpposed={teams[1].players.length === 0}
                onMovePlayer={(player) => {
                  setHighlightedPlayers([
                    teams[0].players.find((p) => p.name === player) as IPlayer,
                  ]);
                  handleMovePlayer();
                }}
              />
            )}
            <div
              className={cn(
                "flex h-[90vh] w-[70vw] translate-y-[100vh] transition-all duration-1000",
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
                showSelector={showSelector}
                onSelectGame={(index) => {
                  setShowSelector(false);
                  setOpenGame(undefined);
                  setTimeout(() => {
                    setOpenGame(miniGames[index]);
                  }, 100);
                }}
                onGameComplete={(playerScores, loserIndex) => {
                  console.log({ playerScores });
                  console.log({ loserIndex });
                  const filteredPlayerScores = playerScores.filter(
                    (ps) => ps.score !== 0
                  );
                  const newLosers = playerScores
                    .filter(
                      (ps) =>
                        ps.score < 0 &&
                        !teams.some((team) =>
                          team.players.some(
                            (p) => p.isCaptain && p.name === ps.player.name
                          )
                        )
                    )
                    .map((p) => p.player);
                  setPhase("calculating-score");
                  const newTeams = teams.map((team) => ({
                    ...team,
                    players: team.players.map((p) => {
                      let showScore;
                      filteredPlayerScores.forEach((ps) => {
                        if (p.name === ps.player.name) {
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
                            if (p.name === ps.player.name && ps.score > 0) {
                              wins = (p.wins ?? 0) + ps.score;
                            } else if (
                              p.name === ps.player.name &&
                              ps.score < 0
                            ) {
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
                // turn={highlightedPlayers[0].name}
                turn="ivar"
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
                phase={phase}
                isUnOpposed={teams[0].players.length === 0}
                onMovePlayer={(player) => {
                  setHighlightedPlayers([
                    teams[1].players.find((p) => p.name === player) as IPlayer,
                  ]);
                  setPhase("transitioning-captive");
                }}
              />
            )}
          </div>
          <button
            className="absolute z-50 text-4xl transition-all border-none outline-none right-10 -bottom-2 hover:bottom-0"
            onClick={() => {
              setShowSelector(true);
              setPhase("explaining-game");
            }}
          >
            Games
          </button>
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
