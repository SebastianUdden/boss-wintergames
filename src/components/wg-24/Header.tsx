import { Phase } from "./Layout";
import { miniGames } from "./mini-games/miniGames";
import { Button } from "./ui/button";
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

interface IHeader {
  onSelectGame: (index: number) => void;
  onSetPhase: (p: Phase) => void;
  phase: Phase;
}

export const Header = ({ phase, onSelectGame, onSetPhase }: IHeader) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ConfirmModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <header className="z-20 flex items-center justify-between w-full h-[5vh] px-4 font-bold text-center black-sails-bg black-sails-text">
        <div className="relative inline-block">
          <h1 className="font-bold font-fell text-sm sm:text-[2vh]">
            <button
              className="p-0 m-0 border-none shadow-none outline-none bg-none text-inherit hover:text-white/50 focus:outline-none"
              onClick={() => setShowModal(true)}
            >
              BOSS
            </button>{" "}
            <span className="relative">
              <span className="line-through opacity-20 text-sm sm:text-[2vh]">
                Winter
              </span>
              <span className="absolute text-sm sm:text-[2vh] text-white left-[0.5vh] -top-[0.5vh] 2xl:-top-[0.5vh] -rotate-12 font-pirata pirate">
                Pirate
              </span>
            </span>
            Games <span className="hidden xs:inline">2024</span>
          </h1>
        </div>
        <div className="flex h-full m-0 font-fell">
          <Button
            data-testid="ready-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("ready")}
            disabled={phase === "ready"}
          >
            R<span className="hidden 2xl:inline">eady</span>
          </Button>
          <Button
            data-testid="waiting-for-spin-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("waiting-for-spin")}
            disabled={phase === "waiting-for-spin"}
          >
            W<span className="hidden 2xl:inline">aiting for spin</span>
          </Button>
          <Button
            data-testid="spinning-wheel-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("spinning-wheel")}
            disabled={phase === "spinning-wheel"}
          >
            S<span className="hidden 2xl:inline">pinning wheel</span>
          </Button>
          <Button
            data-testid="explaining-game-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("playing-game")}
            disabled={phase === "explaining-game"}
          >
            E<span className="hidden 2xl:inline">xplaining game</span>
          </Button>
          <Button
            data-testid="selecting-players-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("selecting-players")}
            disabled={phase === "selecting-players"}
          >
            S<span className="hidden 2xl:inline">electing players</span>
          </Button>
          <Button
            data-testid="playing-game-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("playing-game")}
            disabled={phase === "playing-game"}
          >
            P<span className="hidden 2xl:inline">laying game</span>
          </Button>
          <Button
            data-testid="calculating-score-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("calculating-score")}
            disabled={phase === "calculating-score"}
          >
            C<span className="hidden 2xl:inline">alculating score</span>
          </Button>
          <Button
            data-testid="selecting-captive-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("selecting-captive")}
            disabled={phase === "selecting-captive"}
          >
            S<span className="hidden 2xl:inline">electing captive</span>
          </Button>
          <Button
            data-testid="transitioning-captive-state"
            className="header disabled:bg-white disabled:text-black disabled:opacity-100"
            onClick={() => onSetPhase("transitioning-captive")}
            disabled={phase === "transitioning-captive"}
          >
            T<span className="hidden 2xl:inline">ransitioning captive</span>
          </Button>
          <select
            className="header"
            onChange={(e) => onSelectGame(Number(e.target.value))}
          >
            <option key="wheel" value="wheel">
              Wheel
            </option>
            {miniGames.slice().map((miniGame) => (
              <option key={miniGame.id} value={miniGame.id}>
                {miniGame.name}
              </option>
            ))}
          </select>
        </div>
      </header>
    </>
  );
};
