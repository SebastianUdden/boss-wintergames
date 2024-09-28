import React from "react";
import { ICard } from "../../types";
import { CardFrame } from "./CardFrame";
import { CardHeader } from "./CardHeader";
import { CardImage } from "./CardImage";
import { CardTypeLine } from "./CardTypeLine";
import { CardTextBox } from "./CardTextBox";

export const CardView: React.FC<Omit<ICard, "id">> = ({
  land,
  name,
  manaCost,
  type,
  subtype,
  description,
  flavorText,
  power,
  toughness,
}) => {
  return (
    <div className="w-[250px] flex flex-col items-center gap-2 m-2">
      <CardFrame land={land}>
        <CardHeader name={name || type} manaCost={manaCost} cardType={type} />
        <CardImage name={name.toLowerCase()} altText={name} />
        <CardTypeLine type={type} subtype={subtype} />
        <CardTextBox
          description={description}
          flavorText={flavorText}
          power={power}
          toughness={toughness}
        />
      </CardFrame>
    </div>
  );
};
