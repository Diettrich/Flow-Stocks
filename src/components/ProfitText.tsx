'use client';
import React from 'react';
import { ProfitData } from '@/types';
import { formatDate } from '@/utils/date.utils';

type Props = {
  profitData: ProfitData;
};

export default function ProfitText({ profitData }: Props) {
  return (
    <div className="p-12 text-md">
      Ayman devrait acheter 100 000 € d&apos;action Amazon le{' '}
      {formatDate(profitData.Ayman.bestBuy.timestamp.toString())} au prix de{' '}
      {profitData.Ayman.bestBuy.lowestPriceOfTheDay} €. il devrait ensuite
      vendre ces actions le{' '}
      {formatDate(profitData.Ayman.bestSell.timestamp.toString())} au prix de{' '}
      {profitData.Ayman.bestSell.highestPriceOfTheDay} € pour faire un gain de{' '}
      {profitData.Ayman.profit} €.
      <br />
      Anouar devrait acheter 100 000 € d&apos;action Amazon le{' '}
      {formatDate(profitData.Anouar.bestBuy.timestamp.toString())} au prix de{' '}
      {profitData.Anouar.bestBuy.lowestPriceOfTheDay} €. il devrait ensuite
      vendre ces actions le{' '}
      {formatDate(profitData.Anouar.bestSell.timestamp.toString())} au prix de{' '}
      {profitData.Anouar.bestSell.highestPriceOfTheDay} € pour faire un gain de{' '}
      {profitData.Anouar.profit} €.
    </div>
  );
}
