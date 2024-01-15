"use client";

import { useState } from "react";
import { fighters } from "./data/fighters";
import { FighterData } from "./types/fighter.type";
import { FighterCard } from "./components/FighterCard";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { ThemeToggle } from "./components/ThemeToggle";

/* https://stackoverflow.com/a/2450976
 * Randomize array in-place using Durstenfeld shuffle algorithm
 */
const shuffle = (array: any) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export default function Home() {
  const [fighterList, setFighterList] = useState<FighterData[]>([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

  const allSeries = [...new Set(fighters.map((fighter) => fighter.series))];

  // Handle toggling of checkbox
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Series filter
  const handleSeriesChange = (series: string) => {
    // clear checkboxes
    setIsCheck([]);

    setSelectedSeries(prev =>
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    );
  };

  // Handle button click for generating randomized list
  const handleGenerate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // clear checkboxes
    setIsCheck([]);

    // shuffle the list of fighters
    setFighterList(shuffle([...fighters]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl text-center font-semibold mb-4">SSBU Randomizer</h1>
        <div className="flex items-center justify-center gap-x-4">
          <button className="btn btn-primary"
            onClick={handleGenerate}
          >
            Generate
          </button>
          <div className="dropdown">
            <AdjustmentsHorizontalIcon tabIndex={0} role="button" className="w-8 h-8" />
            <div className="dropdown-content shadow bg-base-300 rounded-box w-80 h-96 p-4">
              <h2>Game Series</h2>
              <ul tabIndex={0} className="z-[1] flex-nowrap menu overflow-y-auto h-80">
                {allSeries.map(series => (
                  <li key={series}>
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedSeries.includes(series)}
                        onChange={() => handleSeriesChange(series)}
                      />
                      <span className="label-text">{series}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className="h-96 mt-4 p-2 overflow-auto bg-base-200 rounded">
          {fighterList.length !== 0 && (
            fighterList
              .filter((fighter: FighterData) => selectedSeries.includes(fighter.series))
              .map((fighter: FighterData) => {
                return (
                  <label htmlFor={fighter.id + ""} className="flex items-center m-2 px-2 hover:bg-gray-700 rounded gap-y-2 cursor-pointer">
                    <input
                      id={fighter.id + ""}
                      type="checkbox"
                      onChange={handleToggle}
                      checked={isCheck.includes(fighter.id + "")}
                      className="checkbox mr-2"
                    />
                    <FighterCard
                      id={fighter.id}
                      key={fighter.id}
                      name={fighter.name}
                      iconUrl={fighter.iconUrl}
                      series={fighter.series}
                      isEcho={fighter.isEcho}
                    />
                  </label>
                );
              })
          )}
        </div>
      </div>
    </main>
  )
}
