// // src/components/Grid.tsx

// import { Ship, Cannonball } from "../types";
// import { CELL_SIZE, GRID_SIZE } from "../utils";
// import { ShipComponent } from "./Ship";
// import { CannonballComponent } from "./Cannonball";

// interface GridProps {
//   ship1: Ship;
//   ship2: Ship;
//   cannonballs: Cannonball[];
// }

// export const Grid = ({ ship1, ship2, cannonballs }: GridProps) => {
//   const renderGrid = () => {
//     let cells = [];
//     for (let y = 0; y < GRID_SIZE; y++) {
//       for (let x = 0; x < GRID_SIZE; x++) {
//         cells.push(
//           <div
//             key={`${x}-${y}`}
//             className="relative border border-gray-700"
//             style={{ width: CELL_SIZE, height: CELL_SIZE }}
//           >
//             {/* Render Ships */}
//             <ShipComponent x={x} y={y} ship={ship1} color="bg-blue-500" />
//             <ShipComponent x={x} y={y} ship={ship2} color="bg-red-500" />

//             {/* Render Cannonballs */}
//             {cannonballs.some(
//               (cb) => Math.floor(cb.x) === x && Math.floor(cb.y) === y
//             ) && <CannonballComponent />}
//           </div>
//         );
//       }
//     }
//     return cells;
//   };

//   return (
//     <div
//       className="grid mt-4 border border-gray-700"
//       style={{
//         gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
//       }}
//     >
//       {renderGrid()}
//     </div>
//   );
// };

// src/components/Grid.tsx

import { Ship, Cannonball } from "../types";
import { CELL_SIZE, GRID_WIDTH, GRID_HEIGHT } from "../utils";
import { ShipComponent } from "./Ship";
import { CannonballComponent } from "./Cannonball";

interface GridProps {
  ship1: Ship;
  ship2: Ship;
  cannonballs: Cannonball[];
}

export const Grid = ({ ship1, ship2, cannonballs }: GridProps) => {
  const gridStyle = {
    position: "relative" as "relative",
    width: GRID_WIDTH * CELL_SIZE,
    height: GRID_HEIGHT * CELL_SIZE,
    display: "grid",
    gridTemplateColumns: `repeat(${GRID_WIDTH}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${GRID_HEIGHT}, ${CELL_SIZE}px)`,
    backgroundImage: `url('/games/shipwreck/ocean-stock.webp')`, // Update with the correct path to your image
    backgroundSize: "cover", // Ensure the image covers the entire ship area
    backgroundPosition: "center",
  };

  const cells = [];
  for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
    cells.push(
      <div
        key={i}
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
      ></div>
    );
  }

  return (
    <div style={gridStyle}>
      {cells}
      {/* Render Ships */}
      <ShipComponent ship={ship1} color="green" />
      <ShipComponent ship={ship2} color="blue" />

      {/* Render Cannonballs */}
      {cannonballs.map((cb, index) => (
        <CannonballComponent key={index} cannonball={cb} />
      ))}
    </div>
  );
};
