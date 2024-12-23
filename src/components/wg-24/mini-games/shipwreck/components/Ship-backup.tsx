// import { useEffect, useState } from "react";
// import { Ship } from "../types";
// import { SHIP_LENGTH, SHIP_WIDTH, CELL_SIZE } from "../utils";

// interface ShipComponentProps {
//   ship: Ship;
//   color: string;
// }

// export const ShipComponent = ({ ship, color }: ShipComponentProps) => {
//   const { x, y, rotationAngle, newDirection } = ship;
//   const [arrowRotation, setArrowRotation] = useState(90); // Arrow's current rotation
//   const shipLength = SHIP_LENGTH * CELL_SIZE;
//   const shipWidth = SHIP_WIDTH * CELL_SIZE;

//   // Calculate the position in pixels
//   const left = x * CELL_SIZE;
//   const top = y * CELL_SIZE;

//   // CSS transition for smooth ship rotation
//   const shipStyle = {
//     position: "absolute" as "absolute",
//     left: left,
//     top: top,
//     width: shipLength,
//     height: shipWidth,
//     backgroundColor: color,
//     transform: `rotate(${rotationAngle}deg)`,
//     transformOrigin: `${shipWidth / 2}px ${shipWidth / 2}px`, // Rotate around center
//     transition: "transform 0.5s ease-in-out",
//   };

//   // Arrow container (circle at the back of the ship)
//   const arrowContainerStyle = {
//     position: "absolute" as "absolute",
//     left: left,
//     top: top,
//     width: CELL_SIZE * 1.5, // Circle size a bit larger than a cell
//     height: CELL_SIZE * 1.5,
//     borderRadius: "50%", // Make it a circle
//     backgroundColor: "black",
//     color: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "24px",
//     // left: -CELL_SIZE / 2, // Positioning the circle at the back
//     // top: shipWidth / 2 - CELL_SIZE * 0.75, // Center it vertically
//     zIndex: 1, // Ensure it's above the ship
//     transform: `rotate(${rotationAngle + 90}deg)`, // Rotate the arrow based on newDirection
//   };

//   return (
//     <>
//       <div style={shipStyle} className="rounded-r-full">
//         {/* Indicate front and back */}
//         <div
//           className="flex items-center justify-center w-full"
//           style={{
//             width: shipLength,
//             height: shipWidth,
//             position: "relative" as "relative",
//           }}
//         >
//           {/* Front Indicator */}
//           <div
//             className="rounded-r-full"
//             style={{
//               position: "absolute" as "absolute",
//               left: shipLength - CELL_SIZE,
//               top: 0,
//               width: CELL_SIZE,
//               height: shipWidth,
//               backgroundColor: "gold",
//             }}
//           ></div>
//         </div>
//       </div>
//       {/* Intended Turn Direction Indicator (at the back of the ship) */}
//       <div style={arrowContainerStyle}>
//         <span>&uarr;</span> {/* The arrow always starts pointing up */}
//       </div>
//     </>
//   );
// };
