import { Ship } from "../types";
import { SHIP_LENGTH, SHIP_WIDTH, CELL_SIZE, TURN_DURATION_MS } from "../utils";

interface ShipComponentProps {
  ship: Ship;
  color: string;
}

export const ShipComponent = ({ ship, color }: ShipComponentProps) => {
  const { x, y, rotationAngle, cannonSide } = ship; // Added cannonSide to access the cannon's position
  const shipLength = SHIP_LENGTH * CELL_SIZE;
  const shipWidth = SHIP_WIDTH * CELL_SIZE;

  // Calculate the position in pixels
  const left = x * CELL_SIZE;
  const top = y * CELL_SIZE;

  // CSS transition for smooth ship rotation
  const shipStyle = {
    position: "absolute" as "absolute",
    left: left,
    top: top,
    width: shipLength,
    height: shipWidth,
    transform: `rotate(${rotationAngle}deg)`,
    transformOrigin: `${shipWidth / 2}px ${shipWidth / 2}px`, // Rotate around center
    transition: `transform ${TURN_DURATION_MS}ms linear`,
  };
  const shipImageStyle = {
    position: "absolute" as "absolute",
    zIndex: 1,
    left: left,
    top: top,
    width: shipLength + CELL_SIZE * 4,
    height: shipWidth,
    backgroundImage: `url('/games/shipwreck/pirate-ship-3.png')`, // Update with the correct path to your image
    backgroundSize: "100%", // Ensure the image covers the entire ship area
    backgroundPosition: "center",
    transform: `rotate(${rotationAngle}deg)`,
    transformOrigin: `${shipWidth / 2}px ${shipWidth / 2}px`, // Rotate around center
    transition: `transform ${TURN_DURATION_MS}ms linear`,
  };

  // Arrow container (circle at the back of the ship)
  const arrowContainerStyle = {
    position: "absolute" as "absolute",
    left: left,
    top: top,
    width: CELL_SIZE * (SHIP_LENGTH / 3), // Circle size a bit larger than a cell
    height: CELL_SIZE * (SHIP_LENGTH / 3),
    borderRadius: "50%", // Make it a circle
    backgroundColor: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    transform: `rotate(${rotationAngle + 90}deg)`, // Rotate the arrow based on newDirection
    zIndex: 2,
  };

  return (
    <>
      <div style={shipImageStyle} />
      <div style={shipStyle} className="rounded-r-full">
        {/* Ship Body */}
        {/* <div
          className="flex items-center justify-center w-full"
          style={{
            width: shipLength,
            height: shipWidth,
            position: "relative" as "relative",
          }}
        ></div> */}
        {/* Front Indicator
          <div
            className="rounded-r-full"
            style={{
              position: "absolute" as "absolute",
              left: shipLength - CELL_SIZE,
              top: 0,
              width: CELL_SIZE,
              height: shipWidth,
            }}
          ></div>
        </div> */}
      </div>

      {/* Intended Turn Direction Indicator (at the back of the ship) */}
      {/* <div style={arrowContainerStyle}>
        <div>{ship.turnCooldown > 0 ? <span></span> : <span>&uarr;</span>}</div>
      </div> */}
    </>
  );
};
