import React from "react";
import { FighterData } from "../types/fighter.type";

export function FighterCard(props: FighterData) {
  return (
    <div className="flex items-center">
      <img src={props.iconUrl} alt={props.name} width={50} height={50} />
      <p className="ml-2">{props.name}</p>
    </div>
  );
}
