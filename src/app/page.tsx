"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Confetti from "~/components/Confetti";
import type { TimerRef } from "~/components/Timer";
import { Timer } from "~/components/Timer";
import { GrommetIconsGithub, MaterialSymbolsRestartAltRounded } from "~/icons";
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
  const isFaulty = useRef(false);

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
    if (count === 1 && !timerRef.current.isStarted) {
      timerRef.current.start();
      setFaultySteps([]);
    }

    if (count === currentCount + 1) {
      isFaulty.current = false;
      if (count === 25) timerRef.current.stop();

      const newBorder = border.map((cell) => ({
        ...cell,
        revealed: cell.count <= count,
      }));
      setBorder(newBorder);
      setCurrentCount(count);
    } else {
      isFaulty.current = true;
      setFaultySteps([...faultySteps, count]);
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-4 bg-gray-50">
      <Confetti passed={passed} />
      <h1 className="text-xl font-medium">Schulte Grid</h1>
      <div className="flex items-center gap-x-4">
        <Timer ref={timerRef} />
        <MaterialSymbolsRestartAltRounded
          className="size-5 cursor-pointer select-none rounded-sm hover:bg-gray-200"
          onClick={() => reset()}
        />
        <a
          href="https://github.com/Debbl/schulte-grid"
          target="_blank"
          rel="noreferrer"
        >
          <GrommetIconsGithub className="cursor-pointer" />
        </a>
      </div>
      <div className="grid select-none grid-cols-5 gap-1">
        {border.map(({ count, revealed }) => (
          <motion.div
            initial={{ opacity: 1, backgroundColor: "#fff" }}
            whileTap={{ scale: 0.8, opacity: 0.7 }}
            animate={{
              opacity: revealed ? [1, 0.3, 0.9] : 1,
              backgroundColor:
                count === faultySteps.at(-1)
                  ? ["#f87171", "#fecaca", "#fff"]
                  : count === currentCount && !isFaulty.current
                    ? ["#4ade80", "#bbf7d0", "#fff"]
                    : "#fff",
            }}
            transition={{
              duration: 2,
              times: [0, 0.8, 1],
            }}
            className={cn(
              "flex justify-center items-center",
              "size-16 sm:size-20",
              "border cursor-pointer rounded-sm bg-white text-black",
            )}
            key={count}
            onClick={() => handleClick(count)}
          >
            {count}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
