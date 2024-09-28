import { boss } from "./boss";

import clicker from "../images/clicker.jpg";
import clicker2 from "../images/clicker2.jpg";
import clicker3 from "../images/clicker3.jpg";

import ladbil from "../images/ladbilsrace.jpg";
import ladbil2 from "../images/ladbilsrace2.jpg";
import ladbil3 from "../images/ladbilsrace3.jpg";
import ladbil4 from "../images/ladbilsrace4.jpg";
import ladbil5 from "../images/ladbilsrace5.jpg";
import ladbil6 from "../images/ladbilsrace6.jpg";
import ladbil7 from "../images/ladbilsrace7.jpg";

import pulkarace from "../images/pulkarace.jpg";
import pulkarace2 from "../images/pulkarace2.jpg";
import pulkarace3 from "../images/pulkarace3.jpg";
import pulkarace4 from "../images/pulkarace4.jpg";
import pulkarace5 from "../images/pulkarace5.jpg";
import pulkarace6 from "../images/pulkarace6.jpg";
import pulkarace7 from "../images/pulkarace7.jpg";

const {
  ivar,
  klingen,
  ante,
  amanda,
  dennan,
  hammargarden,
  schaeran,
  palmen,
  mattis,
  nemer,
  robban,
  robin,
  sebbe,
  virre,
} = boss;

export const wintergames = [
  {
    occurred: "2021-12-28",
    title: "",
    coordinators: [schaeran, palmen],
    teams: [
      { title: "Lag 1", members: [dennan, schaeran, hammargarden] },
      { title: "Lag 2", members: [mattis, amanda, palmen] },
      { title: "Lag 3", members: [robban, ivar, nemer] },
      { title: "Lag 4", members: [virre, klingen, ante] },
    ],
    participants: [
      dennan,
      schaeran,
      hammargarden,
      ivar,
      klingen,
      ante,
      amanda,
      dennan,
      hammargarden,
      schaeran,
      palmen,
      mattis,
      nemer,
      robban,
    ],
    theme: "Tid",
    images: [],
    activities: [
      { title: "Innebandy", description: "" },
      { title: "Bäst-i-test", description: "" },
      { title: "Brobygge", description: "" },
      { title: "Perfect serve", description: "" },
    ],
  },
  {
    occurred: "2019-12-28",
    title: "",
    coordinators: [virre, ivar],
    teams: [
      { title: "Lag 1", members: [dennan, schaeran, hammargarden] },
      { title: "Lag 2", members: [mattis, amanda, palmen] },
      { title: "Lag 3", members: [robban, ivar, nemer] },
    ],
    participants: [
      dennan,
      schaeran,
      hammargarden,
      ivar,
      klingen,
      ante,
      amanda,
      dennan,
      hammargarden,
      schaeran,
      palmen,
      mattis,
      nemer,
      robban,
    ],
    theme: "",
    images: [ladbil, ladbil2, ladbil3, ladbil4, ladbil5, ladbil6, ladbil7],
    activities: [
      { title: "Byteshandel", description: "" },
      { title: "Lådbilsbygge", description: "" },
      { title: "Uppvisning", description: "Snyggaste lådbil vinner" },
      { title: "Dragrace", description: "Snabbaste lådbil vinner" },
      { title: "Slalom", description: "Snabbaste lådbil vinner" },
    ],
  },
  {
    occurred: "2018-12-28",
    title: "",
    coordinators: [palmen],
    teams: [
      { title: "Lag 1", members: [dennan, schaeran, hammargarden] },
      { title: "Lag 2", members: [mattis, amanda, palmen] },
      { title: "Lag 3", members: [robban, ivar, nemer] },
      { title: "Lag 4", members: [virre, klingen, ante] },
    ],
    participants: [
      dennan,
      schaeran,
      hammargarden,
      ivar,
      klingen,
      ante,
      amanda,
      dennan,
      hammargarden,
      schaeran,
      palmen,
      mattis,
      nemer,
      robban,
    ],
    theme: "",
    images: [
      pulkarace,
      pulkarace2,
      pulkarace3,
      pulkarace4,
      pulkarace5,
      pulkarace6,
      pulkarace7,
    ],
    activities: [
      { title: "Snyggaste pulka", description: "" },
      { title: "Dragrace", description: "Snabbaste pulka" },
      { title: "Slalom", description: "Snabbaste pulka" },
      { title: "Jättejenga", description: "" },
    ],
  },
  {
    occurred: "2017-12-28",
    title: "",
    coordinators: [sebbe, mattis],
    teams: [
      {
        title: "Blue team",
        members: [mattis, nemer, ivar, hammargarden, klingen, amanda],
      },
      {
        title: "Red team",
        members: [robin, sebbe, virre, robban, schaeran, dennan],
      },
    ],
    participants: [
      mattis,
      nemer,
      ivar,
      hammargarden,
      ante,
      klingen,
      amanda,
      robin,
      sebbe,
      virre,
      robban,
      schaeran,
      dennan,
    ],
    theme: "",
    images: [clicker, clicker2, clicker3],
    activities: [
      {
        title: "The Button",
        description:
          "Klicka snabbare! Klicka mer! Samla badges för extra multipliers!",
      },
      { title: "Isdopp", description: "Viking badge" },
      { title: "Parkour", description: "Ninja badge" },
      { title: "Ölhävning", description: "Drunk badge" },
      { title: "2x", description: "Dual wield badge" },
      { title: "Sneaky", description: "Leech badge" },
      { title: "30x", description: "Minigun badge" },
      { title: "30s", description: "Timelord badge" },
      { title: "?", description: "Crybaby badge" },
    ],
  },
];
