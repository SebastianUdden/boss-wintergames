// // src/components/ShipwreckGame.tsx

// import { useState, useEffect, useRef } from "react";
// import { GameState, IShipwreckProps, Ship, Cannonball } from "../types";
// import { Grid } from "./Grid";
// import {
//   updateShipMovement,
//   fireCannon,
//   checkShipCollision,
// } from "../gameLogic";
// import {
//   CELL_SIZE,
//   GAME_INTERVAL,
//   GRID_HEIGHT,
//   GRID_WIDTH,
//   SHIP_HEALTH,
//   SHIP_LENGTH,
// } from "../utils";
// import { Button } from "@/components/wg-24/ui/button";
// import { Badge } from "@/components/wg-24/ui/badge";

// export const ShipwreckGame = ({ players, onGameComplete }: IShipwreckProps) => {
//   const collideRef = useRef<boolean>(false);
//   const collisionCooldownRef = useRef<boolean>(false);
//   const [showDiagnose, setShowDiagnose] = useState(false);
//   const [gameState, setGameState] = useState<GameState>("ready");
//   const [message, setMessage] = useState("Get ready for Shipwreck!");
//   const [scores, setScores] = useState([0, 0, 0, 0]);

//   const [ship1, setShip1] = useState<Ship>({
//     id: "ship1",
//     x: GRID_WIDTH / 4,
//     y: GRID_HEIGHT / 2,
//     direction: "right",
//     newDirection: undefined,
//     rotationAngle: 0,
//     health: SHIP_HEALTH,
//     speed: 1,
//     turning: false,
//     turningSteps: 0,
//     turnProgress: 0,
//     turnCooldown: 0,
//     slowedSteps: 0,
//     cannonSide: "right",
//     cannonCharge: 0,
//     cannonSwitchProgress: 0,
//     collisionTimer: 0,
//     isRammer: false,
//   });

//   const [ship2, setShip2] = useState<Ship>({
//     id: "ship2",
//     x: (GRID_WIDTH * 3) / 4,
//     y: GRID_HEIGHT / 2,
//     direction: "up",
//     rotationAngle: 270,
//     health: SHIP_HEALTH,
//     speed: 1,
//     turning: false,
//     turningSteps: 0,
//     turnProgress: 0,
//     turnCooldown: 0,
//     slowedSteps: 0,
//     cannonSide: "left",
//     cannonCharge: 0,
//     cannonSwitchProgress: 0,
//     collisionTimer: 0,
//     isRammer: false,
//   });

//   const prevShip1Ref = useRef<Ship>(ship1);
//   const prevShip2Ref = useRef<Ship>(ship2);

//   const [cannonballs, setCannonballs] = useState<Cannonball[]>([]);
//   const keysRef = useRef<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     if (gameState !== "active") return;

//     const handleKeyDown = (event: KeyboardEvent) => {
//       keysRef.current[event.key] = true;
//     };

//     const handleKeyUp = (event: KeyboardEvent) => {
//       keysRef.current[event.key] = false;
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     const gameInterval = setInterval(() => {
//       updateGame();
//     }, GAME_INTERVAL); // Adjust the interval as needed

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//       clearInterval(gameInterval);
//     };
//   }, [gameState]);

//   const updateGame = () => {
//     // For ship1
//     setShip1((prevShip) => {
//       const updatedShip = updateShipMovement(
//         prevShip,
//         keysRef.current,
//         {
//           left: "a",
//           right: "d",
//           switchCannonLeft: "w",
//           switchCannonRight: "s",
//         },
//         [ship2],
//         collideRef
//       ); // Pass other ships for collision detection
//       return updatedShip;
//     });

//     // For ship2
//     setShip2((prevShip) => {
//       const updatedShip = updateShipMovement(
//         prevShip,
//         keysRef.current,
//         {
//           left: "ArrowLeft",
//           right: "ArrowRight",
//           switchCannonLeft: "ArrowUp",
//           switchCannonRight: "ArrowRight",
//         },
//         [ship1],
//         collideRef
//       ); // Pass other ships for collision detection
//       return updatedShip;
//     });

//     // Update cannons
//     updateCannonCharges();

//     // Update cannonballs
//     updateCannonballs();

//     // Check for collisions
//     checkCollisions();

//     // Check if game over
//     checkGameOver();
//   };

//   const updateCannonCharges = () => {
//     // Update cannon charging and switching for Ship 1 (Player 2)
//     setShip1((prevShip) => {
//       let newShip = { ...prevShip };
//       // Recharge cannon
//       if (keysRef.current["g"] && newShip.cannonCharge < 5) {
//         newShip.cannonCharge += 1;
//       }
//       // Switch cannon side
//       if (keysRef.current["h"] && newShip.cannonSwitchProgress < 10) {
//         newShip.cannonSwitchProgress += 1;
//         if (newShip.cannonSwitchProgress >= 10) {
//           newShip.cannonSide = newShip.cannonSide === "left" ? "right" : "left";
//           newShip.cannonSwitchProgress = 0;
//         }
//       }
//       // Fire cannon
//       if (keysRef.current["j"] && newShip.cannonCharge >= 5) {
//         setCannonballs((prev) => [...prev, fireCannon(newShip)]);
//         newShip.cannonCharge = 0;
//       }
//       return newShip;
//     });

//     // Update cannon charging and switching for Ship 2 (Player 4)
//     setShip2((prevShip) => {
//       let newShip = { ...prevShip };
//       // Recharge cannon
//       if (keysRef.current["l"] && newShip.cannonCharge < 5) {
//         newShip.cannonCharge += 1;
//       }
//       // Switch cannon side
//       if (keysRef.current["ö"] && newShip.cannonSwitchProgress < 10) {
//         newShip.cannonSwitchProgress += 1;
//         if (newShip.cannonSwitchProgress >= 10) {
//           newShip.cannonSide = newShip.cannonSide === "left" ? "right" : "left";
//           newShip.cannonSwitchProgress = 0;
//         }
//       }
//       // Fire cannon
//       if (keysRef.current["ä"] && newShip.cannonCharge >= 5) {
//         setCannonballs((prev) => [...prev, fireCannon(newShip)]);
//         newShip.cannonCharge = 0;
//       }
//       return newShip;
//     });
//   };

//   const updateCannonballs = () => {
//     setCannonballs((prevCannonballs) =>
//       prevCannonballs
//         .map((cb) => ({
//           ...cb,
//           x: cb.x + (cb.dx || 0),
//           y: cb.y + (cb.dy || 0),
//         }))
//         .filter(
//           (cb) =>
//             cb.x >= 0 && cb.x < GRID_WIDTH && cb.y >= 0 && cb.y < GRID_HEIGHT
//         )
//     );
//   };

//   const checkCollisions = () => {
//     // Check collisions between cannonballs and ships
//     cannonballs.forEach((cb) => {
//       // Check collision with Ship 1
//       if (
//         cb.x >= ship1.x &&
//         cb.x < ship1.x + 2 &&
//         cb.y >= ship1.y &&
//         cb.y < ship1.y + 7
//       ) {
//         // Ship 1 is hit
//         setShip1((prevShip) => ({
//           ...prevShip,
//           health: prevShip.health - 1,
//           slowedSteps: 5,
//         }));
//         // Remove cannonball
//         setCannonballs((prev) => prev.filter((c) => c !== cb));
//       }
//       // Check collision with Ship 2
//       if (
//         cb.x >= ship2.x &&
//         cb.x < ship2.x + 2 &&
//         cb.y >= ship2.y &&
//         cb.y < ship2.y + 7
//       ) {
//         // Ship 2 is hit
//         setShip2((prevShip) => ({
//           ...prevShip,
//           health: prevShip.health - 1,
//           slowedSteps: 5,
//         }));
//         // Remove cannonball
//         setCannonballs((prev) => prev.filter((c) => c !== cb));
//       }
//     });
//   };

//   const checkGameOver = () => {
//     if (ship1.health <= 0 || ship2.health <= 0) {
//       setGameState("finished");
//       setMessage("Game Over!");
//       let winner =
//         ship1.health > ship2.health ? [1000, 1000, 0, 0] : [0, 0, 1000, 1000];
//       setScores(winner);
//     }
//   };

//   const startGame = () => {
//     setGameState("active");
//     setMessage("Battle Started!");
//   };

//   const endGame = () => {
//     onGameComplete(scores.map((s, i) => ({ score: s, player: players[i] })));
//   };

//   useEffect(() => {
//     const COLLISION_STOP_DURATION = 120; // 2 seconds at 60 fps
//     const COLLISION_INVULNERABLE_DURATION = 120; // 2 seconds at 60 fps

//     if (checkShipCollision(ship1, ship2)) {
//       if (ship1.collisionTimer === 0 && ship2.collisionTimer === 0) {
//         // Collision detected, stop both ships
//         setShip1((prevShip) => ({
//           ...prevShip,
//           collisionTimer:
//             COLLISION_STOP_DURATION + COLLISION_INVULNERABLE_DURATION,
//         }));
//         setShip2((prevShip) => ({
//           ...prevShip,
//           collisionTimer:
//             COLLISION_STOP_DURATION + COLLISION_INVULNERABLE_DURATION,
//         }));
//       }
//     }

//     // Update collision timers
//     setShip1((prevShip) => ({
//       ...prevShip,
//       collisionTimer: Math.max(0, prevShip.collisionTimer - 1),
//     }));
//     setShip2((prevShip) => ({
//       ...prevShip,
//       collisionTimer: Math.max(0, prevShip.collisionTimer - 1),
//     }));
//   }, [ship1, ship2]);

//   return (
//     <div className="flex flex-col h-full p-20 mt-2 bg-black min-h-[90vh] m-auto">
//       {showDiagnose && (
//         <div className="absolute z-50 p-5 bg-black right-10 top-10 opacity-80">
//           <h2>Diagnose</h2>
//           <hr />
//           <ul>
//             <li>id: {ship1.id}</li>
//             <li>direction: {ship1.direction}</li>
//             <li>newDirection: {ship1.newDirection}</li>
//             <li>health: {ship1.health}</li>
//             <li>cannonCharge: {ship1.cannonCharge}</li>
//             <li>cannonSide: {ship1.cannonSide}</li>
//             <li>cannonSwitchProgress: {ship1.cannonSwitchProgress}</li>
//             <li>rotationAngle: {ship1.rotationAngle}</li>
//             <li>slowedSteps: {ship1.slowedSteps}</li>
//             <li>speed: {ship1.speed}</li>
//             <li>turnProgress: {ship1.turnProgress}</li>
//             <li>turning: {ship1.turning}</li>
//             <li>turningSteps: {ship1.turningSteps}</li>
//             <li>x: {ship1.x}</li>
//             <li>y: {ship1.y}</li>
//           </ul>
//           <hr />
//         </div>
//       )}
//       <h2 className="text-4xl font-bold">Shipwreck</h2>

//       <div className="flex gap-4 mt-4">
//         {gameState === "ready" && (
//           <Button
//             className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-500"
//             onClick={startGame}
//           >
//             Start Game
//           </Button>
//         )}
//         <Button
//           className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-500"
//           onClick={() => setShowDiagnose(!showDiagnose)}
//         >
//           Diagnose
//         </Button>
//       </div>
//       <p className="mt-4 text-lg">{message}</p>

//       <div className="flex justify-between">
//         <div>
//           <Badge className="text-xl bg-green-500 rounded-full hover:bg-green-400">
//             {players[0]}: {ship1.health}
//           </Badge>
//           <div className="mt-2">
//             <div>Cannon Charge: {ship1.cannonCharge}/5</div>
//             <div>Cannon Switch: {ship1.cannonSwitchProgress}/10</div>
//           </div>
//         </div>
//         <div>
//           <Badge className="text-xl bg-pink-500 rounded-full hover:bg-pink-400">
//             {players[2]}: {ship2.health}
//           </Badge>
//           <div className="mt-2">
//             <div>Cannon Charge: {ship2.cannonCharge}/5</div>
//             <div>Cannon Switch: {ship2.cannonSwitchProgress}/10</div>
//           </div>
//         </div>
//       </div>

//       {/* Game Grid */}
//       <Grid ship1={ship1} ship2={ship2} cannonballs={cannonballs} />

//       {gameState === "finished" && (
//         <Button
//           className="mt-4 bg-green-700 hover:bg-green-500"
//           onClick={endGame}
//         >
//           Complete
//         </Button>
//       )}
//     </div>
//   );
// };
