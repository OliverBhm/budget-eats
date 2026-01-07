import { useEffect, useState } from "react";

export function useTimer({
  duration,
  remaining,
}: {
  duration: number;
  remaining: number;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(duration);
  const [remainingTime, setRemainingTime] = useState(remaining);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setElapsed(0);
    setRemainingTime(remaining);
  }, [remaining]);

  // Timer tick
  useEffect(() => {
    if (!isRunning || elapsed >= remainingTime) return;

    const intervalId = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, elapsed, remainingTime]);

  const addMinute = () => {
    setTotal((t) => t + 60);
    setRemainingTime((r) => r + 60);
  };

  const resetTimer = () => {
    setElapsed(0);
    setRemainingTime(duration);
  };

  const toggleTimer = () => {
    setIsRunning((r) => !r);
  };

  const current = Math.max(remainingTime - elapsed, 0);
  const progress = Math.round((current / total) * 100);

  return {
    current,
    total,
    progress,
    isRunning,
    addMinute,
    resetTimer,
    toggleTimer,
  };
}
