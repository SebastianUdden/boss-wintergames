import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/wg-24/ui/dialog";
import { ITeam } from "./teams/teams";
import { cn } from "@/lib/utils";
import { miniGames } from "./mini-games/miniGames";
import { Phase } from "./Layout";
import { IMiniGame } from "./mini-games/MiniGame";
import { IPlayer } from "./teams/players";
import { Label } from "./ui/label";
import { clearPrefixedStored, useStoredState } from "./storedState";

const phases = [
  "ready",
  "waiting-for-spin",
  "spinning-wheel",
  "transition-from-spinning",
  "transition-to-game",
  "explaining-game",
  "selecting-players",
  "playing-game",
  "calculating-score",
  "selecting-captive",
  "captains-choice",
  "transitioning-captive",
  "game-over",
];

interface IModal {
  isOpen?: boolean;
  onClose?: () => void;
  teams: ITeam[];
  setTeams: Dispatch<SetStateAction<ITeam[]>>;
  phase: Phase;
  onSelectGame: (index: number) => void;
  onSetPhase: (p: Phase) => void;
  highlightedPlayers: IPlayer[];
  chosenPlayers: IPlayer[][];
  openGame?: IMiniGame;
  turn?: string;
  losingTeamIndex: number;
  losers: IPlayer[];
  teamsTurn: number;
  previousTurns: string[];
  setChosenPlayers: Dispatch<SetStateAction<IPlayer[][]>>;
}

export const AdminModal = ({
  isOpen,
  onClose,
  teams,
  setTeams,
  phase,
  onSetPhase,
  onSelectGame,
  highlightedPlayers,
  chosenPlayers,
  openGame,
  turn,
  losingTeamIndex,
  losers,
  teamsTurn,
  previousTurns,
  setChosenPlayers,
}: IModal) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("jones");
  const [showStates, setShowStates] = useState(false);

  useEffect(() => {
    setOpen(!!isOpen);
  }, [isOpen]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setTimeout(() => {
      if (!isOpen && onClose) {
        onClose();
      }
    }, 100);
  };

  const handleClearPasswordAndClose = () => {
    setPassword("");
    handleOpenChange(false);
  };
  const handleClearPrefixAndClose = () => {
    clearPrefixedStored();
    handleOpenChange(false);
  };

  const handleMovePlayer = (name: string) => {
    const currentTeamIndex = teams.findIndex((team) =>
      team.players.some((p) => p.name === name)
    );
    setTeams(
      teams.map((team, index) => {
        if (currentTeamIndex === index) {
          return {
            ...team,
            players: team.players.filter((p) => p.name !== name),
          };
        }
        return {
          ...team,
          players: [
            ...team.players,
            teams[currentTeamIndex].players.find((p) => p.name === name),
          ],
        };
      })
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-fit min-w-[80%] min-h-[400px] max-h-[80%] p-10 flex flex-col gap-4 text-[2vh]">
        <DialogHeader>
          <DialogTitle className="text-left text-8xl font-pirata">
            {password === "jones" ? "RELEASE THE KRAKEN!" : "Who goes there?"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col flex-grow gap-6 text-xl text-left">
          {password === "jones" ? (
            <>
              <p>
                Arrr, so the tides be turnin’ against ye, eh? Facin’ rough seas
                or a crew hollerin’ mutiny? <br />
                Fear not, the power o’ the gods flows through yer veins—just
                don’t go turnin’ us into sea rats, savvy?
              </p>
              <div className="overflow-y-auto">
                <div className="flex justify-between gap-10">
                  {teams.map((t, i) => (
                    <ul className="flex flex-col w-full gap-2">
                      {t.players.map((p) => (
                        <li
                          onClick={() => handleMovePlayer(p.name)}
                          className="flex justify-between w-full gap-1 p-2 bg-black border-2 border-white cursor-pointer rounded-xl hover:opacity-50"
                        >
                          <span>{p.name}</span>
                          <div className="flex gap-1">
                            <button
                              className={cn(
                                "px-2 py-0 text-sm bg-gray-800 text-white rounded-full",
                                p.isCaptain ? "bg-blue-600 text-white" : ""
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setTeams(
                                  teams.map((team) =>
                                    team.id === t.id
                                      ? {
                                          ...team,
                                          players: team.players.map((player) =>
                                            player.name === p.name
                                              ? {
                                                  ...player,
                                                  isCaptain: !player.isCaptain,
                                                  isCaptive: false,
                                                }
                                              : { ...player, isCaptain: false }
                                          ),
                                        }
                                      : team
                                  )
                                );
                              }}
                            >
                              Cap
                            </button>
                            <button
                              className={cn(
                                "px-2 py-0 text-sm bg-gray-800 text-white rounded-full",
                                p.isCaptive ? "bg-blue-600" : ""
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setTeams(
                                  teams.map((team) => ({
                                    ...team,
                                    players: team.players.map((player) =>
                                      player.name === p.name
                                        ? {
                                            ...player,
                                            isCaptive: !player.isCaptive,
                                            isCaptain: false,
                                          }
                                        : player
                                    ),
                                  }))
                                );
                              }}
                            >
                              Chain
                            </button>
                            <button
                              className={cn(
                                "px-2 py-0 text-sm bg-gray-800 text-white rounded-full",
                                p.isCaptive ? "bg-blue-600" : "",
                                chosenPlayers.some((t) =>
                                  t.some((x) => x.name === p.name)
                                )
                                  ? "bg-blue-600"
                                  : ""
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (chosenPlayers.length === 0) {
                                  setChosenPlayers([
                                    i === 0 ? [p] : [],
                                    i === 1 ? [p] : [],
                                  ]);
                                } else {
                                  setChosenPlayers(
                                    chosenPlayers.map((c, ci) => {
                                      const teamIndexMatch = i === ci;
                                      if (
                                        teamIndexMatch &&
                                        c.some((x) => x.name === p.name)
                                      )
                                        return c.filter(
                                          (x) => x.name !== p.name
                                        );
                                      if (teamIndexMatch) {
                                        return [...c, p];
                                      } else return c;
                                    })
                                  );
                                }
                              }}
                            >
                              Game
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto text-[2vh] min-h-[10vh]">
                  <div>
                    <select
                      className="header"
                      onChange={(e) => onSelectGame(Number(e.target.value))}
                      value={openGame?.name}
                    >
                      <option key="games" value="games">
                        Games
                      </option>
                      {miniGames.slice().map((miniGame) => (
                        <option key={miniGame.id} value={miniGame.id}>
                          {miniGame.name}
                        </option>
                      ))}
                    </select>
                    <Label className="p-4 ml-4 text-lg bg-orange-800 rounded-xl">
                      {openGame?.name}
                    </Label>
                  </div>
                  <div>
                    <Label className="p-4 mr-4 text-lg bg-orange-800 rounded-xl">
                      {phase}
                    </Label>
                    <select
                      className="p-4 header"
                      onChange={(e) => onSetPhase(e.target.value)}
                    >
                      <option key="phases" value="phases">
                        Phases
                      </option>
                      {phases.slice().map((phase) => (
                        <option key={phase} value={phase}>
                          {phase}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <hr />
                <h2
                  className="text-3xl"
                  onClick={() => setShowStates(!showStates)}
                >
                  States
                </h2>
                {showStates && (
                  <ul className="[&>li>strong]:text-orange-500">
                    <li>
                      <strong>Highlighted:</strong>{" "}
                      {JSON.stringify(highlightedPlayers)}
                    </li>
                    <li>
                      <strong>Chosen:</strong>{" "}
                      {JSON.stringify(
                        chosenPlayers.map((c) => c.map((p) => p.name))
                      )}
                    </li>
                    <li>
                      <strong>Minigame:</strong> {JSON.stringify(openGame)}
                    </li>
                    <li>
                      <strong>Turn:</strong> {JSON.stringify(turn)}
                    </li>
                    <li>
                      <strong>Losing team index:</strong>{" "}
                      {JSON.stringify(losingTeamIndex)}
                    </li>
                    <li>
                      <strong>Losers:</strong> {JSON.stringify(losers)}
                    </li>
                    <li>
                      <strong>Teams turn:</strong> {JSON.stringify(teamsTurn)}
                    </li>
                    <li>
                      <strong>Previous turns:</strong>{" "}
                      {JSON.stringify(previousTurns)}
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <input
              className="p-10"
              type="password"
              value={password}
              placeholder="Trespass and you shall face the kraken..."
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </DialogDescription>
        <DialogFooter>
          {password === "jones" && (
            <button
              className="w-full rusty-red font-pirata"
              onClick={handleClearPrefixAndClose}
            >
              Reset - A new dawn rises...
            </button>
          )}
          <button
            className="w-full ocean-blue font-pirata"
            onClick={handleClearPasswordAndClose}
          >
            {password === "jones"
              ? "Forget - To the fathoms below, away with ye!"
              : "Run away..."}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
