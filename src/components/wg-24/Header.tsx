import { Phase } from "./Layout";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { AdminModal } from "./AdminModal";
import { ITeam } from "./teams/teams";
import { IMiniGame } from "./mini-games/MiniGame";
import { IPlayer } from "./teams/players";
import { useStoredState } from "./storedState";

interface IHeader {
  onSelectGame: (index: number) => void;
  onSetPhase: (p: Phase) => void;
  phase: Phase;
  teams: ITeam[];
  setTeams: Dispatch<SetStateAction<ITeam[]>>;
  highlightedPlayers: IPlayer[];
  chosenPlayers: IPlayer[][];
  openGame?: IMiniGame;
  turn?: string;
  losingTeamIndex: number;
  losers: IPlayer[];
  teamsTurn: number;
  previousTurns: string[];
  setChosenPlayers: Dispatch<SetStateAction<IPlayer[][]>>;
  setDebug: Dispatch<SetStateAction<boolean>>;
  debug: boolean;
  setMiniGames: Dispatch<SetStateAction<IMiniGame[]>>;
  miniGames: IMiniGame[];
}

export const Header = ({
  phase,
  onSelectGame,
  onSetPhase,
  teams,
  setTeams,
  highlightedPlayers,
  chosenPlayers,
  openGame,
  turn,
  losingTeamIndex,
  losers,
  teamsTurn,
  previousTurns,
  setChosenPlayers,
  setDebug,
  debug,
  setMiniGames,
  miniGames,
}: IHeader) => {
  const [showAllHeadings, setShowAllHeadings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useStoredState(false);
  const blueChosen =
    chosenPlayers && chosenPlayers[0] && chosenPlayers[0].length !== 0
      ? chosenPlayers[0]
      : [];
  const redChosen =
    chosenPlayers && chosenPlayers[1] && chosenPlayers[1].length !== 0
      ? chosenPlayers[1]
      : [];

  return (
    <>
      <ConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <AdminModal
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        teams={teams}
        phase={phase}
        setTeams={setTeams}
        onSetPhase={onSetPhase}
        onSelectGame={onSelectGame}
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
        setShowAllHeadings={setShowAllHeadings}
        showAllHeadings={showAllHeadings}
        setMiniGames={setMiniGames}
        miniGames={miniGames}
      />
      <header className="z-20 flex items-center justify-between w-full h-[5vh] px-4 font-bold text-center black-sails-bg black-sails-text">
        <div className="relative inline-block text-xl">
          <h1 className="text-sm font-bold font-fell sm:text-2xl">
            <button
              className="p-0 m-0 border-none shadow-none outline-none bg-none text-inherit hover:text-white/50 focus:outline-none"
              onClick={() => setShowModal(true)}
            >
              BOSS
            </button>{" "}
            <span className="relative">
              <span className="text-sm line-through opacity-20 sm:text-2xl">
                Winter
              </span>
              <span className="absolute text-sm sm:text-xl text-white left-[0.5vh] -top-[0.5vh] 2xl:-top-[0.5vh] -rotate-12 font-pirata pirate">
                Pirate
              </span>
            </span>
            Games <span className="hidden xs:inline">2024</span>
          </h1>
        </div>
        {openGame && phase !== "game-over" && phase !== "start" && (
          <div className="flex items-center gap-4">
            {blueChosen &&
              (phase === "playing-game" ||
                phase === "calculating-score" ||
                phase === "selecting-captive" ||
                phase === "captains-choice" ||
                phase === "animating-captive" ||
                phase === "transitioning-captive") && (
                <div className="flex gap-2">
                  {blueChosen.map((cp) => (
                    <img
                      key={cp.image}
                      src={cp.image}
                      className="w-10 h-10 rounded-full"
                    />
                  ))}
                </div>
              )}
            <h3 className="p-0 m-0">
              {openGame.name} - {openGame?.gameType}{" "}
            </h3>
            {redChosen &&
              (phase === "playing-game" ||
                phase === "calculating-score" ||
                phase === "selecting-captive" ||
                phase === "captains-choice" ||
                phase === "animating-captive" ||
                phase === "transitioning-captive") && (
                <div className="flex gap-2">
                  {redChosen.map((cp) => (
                    <img
                      key={cp.image}
                      src={cp.image}
                      className="w-10 h-10 rounded-full"
                    />
                  ))}
                </div>
              )}
          </div>
        )}
        {phase === "game-over" && (
          <div className="items-center gap-4 fled">
            <h3>The Note</h3>
          </div>
        )}
        {phase === "start" && (
          <div className="items-center gap-4 fled">
            <h3>Welcome</h3>
          </div>
        )}
        <div className="flex h-full m-0 font-fell">
          <Button
            data-testid="ready-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => setShowAdmin(!showAdmin)}
          >
            K<span className="hidden 2xl:inline">raken</span>
          </Button>
          {phase !== "game-over" && phase !== "start" && (
            <>
              {(showAllHeadings || phase === "ready") && (
                <Button
                  data-testid="ready-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("ready")}
                  disabled={phase === "ready"}
                >
                  R<span className="hidden 2xl:inline">eady</span>
                </Button>
              )}
              {(showAllHeadings || phase === "waiting-for-spin") && (
                <Button
                  data-testid="waiting-for-spin-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("waiting-for-spin")}
                  disabled={phase === "waiting-for-spin"}
                >
                  W<span className="hidden 2xl:inline">aiting for spin</span>
                </Button>
              )}
              {(showAllHeadings || phase === "spinning-wheel") && (
                <Button
                  data-testid="spinning-wheel-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("spinning-wheel")}
                  disabled={phase === "spinning-wheel"}
                >
                  S<span className="hidden 2xl:inline">pinning wheel</span>
                </Button>
              )}
              {(showAllHeadings || phase === "explaining-game") && (
                <Button
                  data-testid="explaining-game-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("explaining-game")}
                  disabled={phase === "explaining-game"}
                >
                  E<span className="hidden 2xl:inline">xplaining game</span>
                </Button>
              )}
              {(showAllHeadings || phase === "selecting-players") && (
                <Button
                  data-testid="selecting-players-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("selecting-players")}
                  disabled={phase === "selecting-players"}
                >
                  S<span className="hidden 2xl:inline">electing players</span>
                </Button>
              )}
              {(showAllHeadings || phase === "playing-game") && (
                <Button
                  data-testid="playing-game-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("playing-game")}
                  disabled={phase === "playing-game"}
                >
                  P<span className="hidden 2xl:inline">laying game</span>
                </Button>
              )}
              {(showAllHeadings || phase === "calculating-score") && (
                <Button
                  data-testid="calculating-score-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("calculating-score")}
                  disabled={phase === "calculating-score"}
                >
                  C<span className="hidden 2xl:inline">alculating score</span>
                </Button>
              )}
              {(showAllHeadings || phase === "selecting-captive") && (
                <Button
                  data-testid="selecting-captive-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("selecting-captive")}
                  disabled={phase === "selecting-captive"}
                >
                  S<span className="hidden 2xl:inline">electing captive</span>
                </Button>
              )}
              {(showAllHeadings || phase === "captains-choice") && (
                <Button
                  data-testid="captains-choice-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("captains-choice")}
                  disabled={phase === "captains-choice"}
                >
                  C<span className="hidden 2xl:inline">aptains choice</span>
                </Button>
              )}
              {(showAllHeadings || phase === "transitioning-captive") && (
                <Button
                  data-testid="transitioning-captive-state"
                  className="header disabled:bg-white disabled:text-black disabled:opacity-100"
                  onClick={() => onSetPhase("transitioning-captive")}
                  disabled={phase === "transitioning-captive"}
                >
                  M<span className="hidden 2xl:inline">oving captive</span>
                </Button>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
};
