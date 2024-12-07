import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/wg-24/ui/dialog";
import { ITeam } from "./teams/teams";
import { cn } from "@/lib/utils";
import { miniGames } from "./mini-games/miniGames";
import { Phase } from "./Layout";

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
];

interface IModal {
  isOpen?: boolean;
  onClose?: () => void;
  teams: ITeam[];
  setTeams: Dispatch<SetStateAction<ITeam[]>>;
  onSelectGame: (index: number) => void;
  onSetPhase: (p: Phase) => void;
}

export const AdminModal = ({
  isOpen,
  onClose,
  teams,
  setTeams,
  onSetPhase,
  onSelectGame,
}: IModal) => {
  const [open, setOpen] = useState(false);

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

  const handleMovePlayer = (name: string) => {
    const currentTeamIndex = teams.findIndex((team) =>
      team.players.some((p) => p.name === name)
    );
    console.log({ currentTeamIndex });
    console.log({ teams });
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
      <DialogContent className="sm:max-w-[425px] md:max-w-fit min-w-[700px] min-h-[400px] p-10 flex flex-col gap-4 text-[2vh]">
        <DialogHeader>
          <DialogTitle className="text-4xl text-left">
            God mode activated!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col flex-grow gap-6 text-xl text-left">
          <p>
            Thing's happenin' in the real world eh? What would you like to
            change?
          </p>
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
                          "px-2 py-0 text-sm text-black bg-white rounded-full",
                          p.isCaptain ? "bg-gray-700 text-white" : ""
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
                                      isCaptain: !player.isCaptain,
                                      isCaptive: false,
                                    }
                                  : { ...player, isCaptain: false }
                              ),
                            }))
                          );
                        }}
                      >
                        Cap
                      </button>
                      <button
                        className={cn(
                          "px-2 py-0 text-sm text-black bg-white rounded-full",
                          p.isCaptive ? "bg-gray-700 text-white" : ""
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
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto text-[2vh]">
            <select
              className="header"
              onChange={(e) => onSelectGame(Number(e.target.value))}
            >
              <option key="wheel" value="wheel">
                Games
              </option>
              {miniGames.slice().map((miniGame) => (
                <option key={miniGame.id} value={miniGame.id}>
                  {miniGame.name}
                </option>
              ))}
            </select>
            <select
              className="header"
              onChange={(e) => onSetPhase(e.target.value)}
            >
              <option key="wheel" value="wheel">
                Phases
              </option>
              {phases.slice().map((phase) => (
                <option key={phase} value={phase}>
                  {phase}
                </option>
              ))}
            </select>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
