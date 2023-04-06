"use client";
import React from "react";
import { ProfitData } from "@/types";

type Props = {
  profitData: ProfitData;
};

export default function ProfitText({ profitData }: Props) {
  return (
    <div className="p-12 text-md">
      Ayman devrait acheter 100 000 € d&apos;action Amazon le{" "}
      {new Date(profitData.Ayman.bestBuy.timestamp).toDateString()} au prix de{" "}
      {profitData.Ayman.bestBuy.lowestPriceOfTheDay} €. il devrait ensuite
      vendre ces actions le{" "}
      {new Date(profitData.Ayman.bestSell.timestamp).toDateString()} au prix de{" "}
      {profitData.Ayman.bestSell.highestPriceOfTheDay} € pour faire un gain de{" "}
      {profitData.Ayman.profit} €.
      <br />
      Anouar devrait acheter 100 000 € d&apos;action Amazon le{" "}
      {new Date(profitData.Anouar.bestBuy.timestamp).toDateString()} au prix de{" "}
      {profitData.Anouar.bestBuy.lowestPriceOfTheDay} €. il devrait ensuite
      vendre ces actions le{" "}
      {new Date(profitData.Anouar.bestSell.timestamp).toDateString()} au prix de{" "}
      {profitData.Anouar.bestSell.highestPriceOfTheDay} € pour faire un gain de{" "}
      {profitData.Anouar.profit} €.
    </div>
  );
}
