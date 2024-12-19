import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "./spinner/Spinner";
import { miniGames } from "./mini-games/miniGames";
import { getRandomPlayer, IMiniGame, MiniGame } from "./mini-games/MiniGame";
import { cn } from "@/lib/utils";
import { Team } from "./teams/Team";
import { initialTeams, ITeam } from "./teams/teams";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { IPlayer } from "./teams/players";
import { useStoredState } from "./storedState";
import { GameOver } from "./GameOver";

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
  | "showing-combatants"
  | "playing-game"
  | "calculating-score"
  | "selecting-captive"
  | "captains-choice"
  | "animating-captive"
  | "transitioning-captive"
  | "transition-from-game"
  | "transition-game-over"
  | "game-over";

const Layout = () => {
  const playerMoved = useRef(false);
  const [showSelector, setShowSelector] = useState(false);
  const [debug, setDebug] = useState(false);
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
  const losingTeamName =
    teams !== undefined && losingTeamIndex !== undefined
      ? teams[losingTeamIndex].name
      : null;

  const handleOpenGame = (name: string) => {
    const nextGame = miniGames.find((g) => g.name === name) ?? miniGames[0];
    if (nextGame.name === "Captain's Call") {
      console.log("1");
      if (teams[0].players.length < teams[1].players.length) {
        console.log("2");
        setChosenPlayers([teams[0].players.filter((p) => p.isCaptain), []]);
      } else {
        console.log("3");
        setChosenPlayers([[], teams[1].players.filter((p) => p.isCaptain)]);
      }
    } else {
      console.log("4");
      setChosenPlayers(getRandomPlayersForGame(teams, nextGame.gameType));
    }
    setOpenGame(nextGame);
  };

  const handleSelectNextLoser = useCallback(() => {
    if (losers.length === 0 && teams[losingTeamIndex].players.length > 1) {
      setPhase("captains-choice");
      return;
    } else if (teams[losingTeamIndex].players.length < 1) {
      setPhase("transition-from-game");
      return;
    }

    const randomness = Math.floor(Math.random() * 4);
    const cycles = 4;
    const totalSteps = randomness + cycles * losers.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      const index = currentStep % losers.length;
      setHighlightedPlayers(losers[index] ? [losers[index]] : []);
      currentStep++;

      // When we finish cycling through all the losers
      if (currentStep > totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("animating-captive"); // Transition to the next phase or handle captive selection here
        }, 1000);
        setTimeout(() => {
          setPhase("transitioning-captive"); // Transition to the next phase or handle captive selection here
        }, 1300);
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

          setTimeout(() => {
            setPhase("showing-combatants");
          }, 300);

          setTimeout(() => {
            setPhase("playing-game");
          }, 3000);

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
    const onePlayerLeft = highlightedPlayers?.length <= 1;
    setTeams((prevTeams) => {
      if (playerMoved.current || losingTeamIndex === undefined)
        return prevTeams; // Prevent re-running
      const updatedTeams = [...prevTeams];

      // Use the losingTeamIndex to identify the losing team
      const opposingTeamIndex = losingTeamIndex === 0 ? 1 : 0;
      const elligiblePlayers = onePlayerLeft
        ? highlightedPlayers
        : highlightedPlayers?.filter((hp) => !hp.isCaptain);
      // Find the player to move from the losing team
      const playerToMove = elligiblePlayers[0]
        ? updatedTeams[losingTeamIndex].players.find(
            (p) => p.name === elligiblePlayers[0].name
          )
        : undefined;
      if (!playerToMove) {
        if (teams[losingTeamIndex].players.length === 1) {
          setTimeout(() => {
            setPhase("transition-from-game");
          }, 500);
        } else {
          setPhase("ready");
        }
        return prevTeams;
      }

      // Remove the player from the losing team
      updatedTeams[losingTeamIndex].players = updatedTeams[
        losingTeamIndex
      ].players.filter((p) => p.name !== elligiblePlayers[0].name);

      // Add the player to the opposing team
      updatedTeams[opposingTeamIndex].players = [
        ...updatedTeams[opposingTeamIndex].players,
        { ...playerToMove, isCaptive: !playerToMove.isCaptive },
      ];

      // Mark player as moved
      playerMoved.current = true;
      return updatedTeams;
    });

    // Reset the highlighted player and phase after moving
    setTimeout(() => {
      if (
        phase !== "game-over" &&
        phase !== "animating-captive" &&
        phase !== "transition-from-game" &&
        phase !== "transition-game-over"
      ) {
        setPhase("ready");
      }
      if (phase === "transitioning-captive") {
        setPhase("ready");
      }
      playerMoved.current = false; // Reset the playerMoved flag
    }, 2500);
  }, [highlightedPlayers, losingTeamIndex]);

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
      phase !== "showing-combatants" &&
      phase !== "calculating-score" &&
      phase !== "selecting-captive" &&
      phase !== "animating-captive" &&
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
    if (phase === "transitioning-captive") {
      handleMovePlayer();
    }
    if (phase !== "selecting-captive" && phase !== "selecting-players") {
      setHighlightedPlayers(chosenPlayers?.flat() ?? []);
    }

    if (phase === "transition-from-game") {
      setTimeout(() => {
        setPhase("transition-game-over");
      }, 1000);
    }
    if (phase === "transition-game-over") {
      setTimeout(() => {
        setPhase("game-over");
      }, 200);
    }
    if (phase === "ready" || phase === "waiting-for-spin") {
      setOpenGame(undefined);
      setChosenPlayers([]);
      setHighlightedPlayers([]);
    }
    if (
      phase === "spinning-wheel" ||
      phase === "transition-from-spinning" ||
      phase === "waiting-for-spin" ||
      phase === "explaining-game" ||
      phase === "transition-to-game"
    ) {
      setHighlightedPlayers([]);
    }
  }, [phase]);

  useEffect(() => {
    const getRandomPlayers = (players, count) => {
      const shuffled = [...players].sort(() => Math.random() - 0.5); // Shuffle the players
      return shuffled.slice(0, count); // Return the required number of players
    };

    if (teams && openGame?.name !== "Captain's Call") {
      if (openGame?.gameType === "duell") {
        setChosenPlayers(teams.map((t) => getRandomPlayers(t.players, 1)));
      } else if (openGame?.gameType === "2v2") {
        setChosenPlayers(teams.map((t) => getRandomPlayers(t.players, 2)));
      } else if (openGame?.gameType === "lagkamp") {
        setChosenPlayers(teams.map((t) => t.players));
      } else if (openGame?.gameType === "fångar") {
        setChosenPlayers(
          teams.map((t) => t.players.filter((p) => p.isCaptive))
        );
      } else if (openGame?.gameType === "solo") {
        setChosenPlayers([
          [getRandomPlayers(teams[teamsTurn].players, 1)[0]], // Random 1 player from team 0
          [],
        ]);
      }
    }
  }, [openGame]);

  useEffect(() => {
    console.log(chosenPlayers);
  }, [chosenPlayers]);

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
        setDebug={setDebug}
        debug={debug}
      />
      <main className="z-10" style={{ overflow: "hidden" }}>
        {debug && (
          <>
            <p>
              <span className="text-orange-400">Phase:</span> {phase}
            </p>
            <p>
              <span className="text-orange-400">Game:</span> {openGame?.name}
            </p>
            <p>
              <span className="text-orange-400">ChosenPlayers:</span>{" "}
              {chosenPlayers
                ?.map((t) => t.map((p) => p.name).join(", "))
                .join(" - ")}
            </p>
            <p>
              <span className="text-orange-400">Highlighted players:</span>{" "}
              {highlightedPlayers?.map((p) => p.name).join(", ")}
            </p>
          </>
        )}
        <div className="overflow-y-hidden bg-center bg-cover bg-pirate-village h-[100vh]">
          {/* Background tint overlay */}
          <div className="absolute inset-0 z-0 bg-black bg-opacity-50 pointer-events-none top-[5vh]"></div>

          {phase === "transition-game-over" || phase === "game-over" ? (
            <div
              className={cn(
                "transition-all duration-1000",
                phase === "game-over" ? "translate-y-0" : "translate-y-[100vh]"
              )}
            >
              <GameOver
                loserCaptain={
                  teams?.find((t) => t.players.length === 1)?.players[0].name
                }
              />
            </div>
          ) : (
            <>
              <div className="z-10 flex justify-between w-full gap-2">
                {teams[0].players.length > 0 && (
                  <Team
                    {...teams[0]}
                    losingTeam={losingTeamName}
                    highlightedPlayers={highlightedPlayers}
                    phase={phase}
                    onMovePlayer={(player) => {
                      console.log({ player });
                      console.log(teams[0]);
                      setHighlightedPlayers([
                        teams[0].players.find(
                          (p) => p.name === player
                        ) as IPlayer,
                      ]);
                      setPhase("transitioning-captive");
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
                    chosenPlayers={chosenPlayers}
                    showSelector={showSelector}
                    onFail={() => setPhase("ready")}
                    onSelectGame={(index) => {
                      setShowSelector(false);
                      setOpenGame(undefined);
                      setTimeout(() => {
                        handleOpenGame(miniGames[index].name);
                      }, 100);
                    }}
                    onGameComplete={(playerScores, loserIndex) => {
                      // Filter out player scores where the score is 0, as they do not affect the outcome
                      const filteredPlayerScores = playerScores.filter(
                        (ps) => ps.score !== 0
                      );

                      // Identify new losers: players whose teams scored negative and are not captains in the current teams
                      const newLosers = playerScores
                        .filter((ps) => ps.score < 0) // Keep only negative scores
                        .flatMap((ps) =>
                          ps.players.filter(
                            (player) =>
                              !teams.some((team) =>
                                team.players.some(
                                  (teamPlayer) =>
                                    teamPlayer.isCaptain &&
                                    teamPlayer.name === player.name
                                )
                              )
                          )
                        );
                      console.log({ teams });
                      console.log({ newLosers });
                      // Set the game phase to calculating score
                      setPhase("calculating-score");

                      // Update teams with `showScore` for each player
                      const newTeams = teams.map((team) => ({
                        ...team,
                        players: team.players.map((player) => {
                          const matchingScore = filteredPlayerScores.find(
                            (ps) =>
                              ps.players.some((p) => p.name === player.name)
                          );
                          return {
                            ...player,
                            showScore: matchingScore
                              ? matchingScore.score
                              : undefined, // Assign score if present
                          };
                        }),
                      }));

                      // Update state with new teams, losers, and losing team index
                      setTeams(newTeams);
                      setLosers(newLosers);
                      setLosingTeamIndex(loserIndex);
                      setOpenGame(undefined); // Clear the current game

                      // Delay for score visualization before transitioning to the next phase
                      setTimeout(() => {
                        const updatedTeams = teams.map((team) => ({
                          ...team,
                          minimized: false, // Ensure all teams are fully expanded
                          players: team.players.map((player) => {
                            let { wins, losses } = player;

                            // Adjust wins and losses based on the filtered scores
                            filteredPlayerScores.forEach((ps) => {
                              if (
                                ps.players.some((p) => p.name === player.name)
                              ) {
                                if (ps.score > 0) {
                                  wins = (wins ?? 0) + ps.score; // Increment wins for positive scores
                                } else if (ps.score < 0) {
                                  losses = (losses ?? 0) - ps.score; // Increment losses for negative scores
                                }
                              }
                            });

                            return {
                              ...player,
                              wins,
                              losses,
                              showScore: undefined, // Clear the temporary score display
                            };
                          }),
                        }));

                        // Update teams and transition to the next phase
                        setTeams(updatedTeams);
                        setPhase("selecting-captive");
                      }, 5000);
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
                  {phase !== "ready" && (
                    <Spinner
                      // turn={highlightedPlayers[0].name}
                      turn="ivar"
                      onGameSelected={handleOpenGame}
                      onPhaseChange={(p) => setPhase(p)}
                      phase={phase}
                      wheelSize="55vh"
                    />
                  )}
                </div>
                {teams[1].players.length > 0 && (
                  <Team
                    {...teams[1]}
                    losingTeam={losingTeamName}
                    highlightedPlayers={highlightedPlayers}
                    phase={phase}
                    onMovePlayer={(player) => {
                      console.log({ player });
                      console.log(teams[1]);
                      setHighlightedPlayers([
                        teams[1].players.find(
                          (p) => p.name === player
                        ) as IPlayer,
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
