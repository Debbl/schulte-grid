"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Confetti from "~/components/Confetti";
import type { TimerRef } from "~/components/Timer";
import { Timer } from "~/components/Timer";
import { MaterialSymbolsRestartAltRounded } from "~/icons";
import { cn } from "~/lib/cn";
import { shuffle } from "~/utils";

interface Cell {
  count: number;
  revealed: boolean;
}

const BORDER = Array.from(
  {
    length: 25,
  },
  (_, i) => ({
    count: i + 1,
    revealed: false,
  }),
);

export default function Home() {
  const [currentCount, setCurrentCount] = useState(0);
  const [faultySteps, setFaultySteps] = useState<number[]>([]);
  const timerRef = useRef<TimerRef>({
    start: () => () => {},
    stop: () => {},
    reset: () => {},
    isStarted: false,
  });
  const [border, setBorder] = useState<Cell[]>(BORDER);

  const passed = useMemo(() => {
    return currentCount === 25;
  }, [currentCount]);

  useEffect(() => {
    setBorder(shuffle(BORDER));
  }, []);

  function reset() {
    setCurrentCount(0);
    setFaultySteps([]);
    setBorder(shuffle(BORDER));
    timerRef.current.reset();
  }

  function handleClick(count: number) {
    if (count === 1 && !timerRef.current.isStarted) timerRef.current.start();

    if (count === currentCount + 1) {
      if (count === 25) timerRef.current.stop();

      const newBorder = border.map((cell) => ({
        ...cell,
        revealed: cell.count === count,
      }));
      setBorder(newBorder);
      setCurrentCount(count);
    } else {
      setFaultySteps([...faultySteps, count]);
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-4">
      <Confetti passed={passed} />
      <h1 className="text-xl font-medium">Schulte Grid</h1>
      <div className="flex items-center gap-x-4">
        <Timer ref={timerRef} />
        <MaterialSymbolsRestartAltRounded
          className="size-5 cursor-pointer select-none rounded-sm hover:bg-gray-200"
          onClick={() => reset()}
        />
      </div>
      <div className="grid select-none grid-cols-5 gap-1">
        {border.map(({ count, revealed }) => (
          <div
            className={cn(
              "flex justify-center items-center",
              "size-16 sm:size-20",
              "border cursor-pointer rounded-sm bg-white text-black",
              revealed && "animate-revealed",
              count === faultySteps.at(-1) && "animate-error",
            )}
            key={count}
            onClick={() => handleClick(count)}
          >
            {count}
          </div>
        ))}
      </div>
    </main>
  );
}
