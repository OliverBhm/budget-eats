import { TimerData } from "@/app/timers/page";
import { useState } from "react";

type UseAddTimerProps = {
  timers: TimerData[];
  setTimers: React.Dispatch<React.SetStateAction<any[]>>;
  createTimer: (id: string, name: string, duration: number[]) => any;
};

export function useAddTimer({
  timers,
  setTimers,
  createTimer,
}: UseAddTimerProps) {
  const [timerDuration, setTimerDuration] = useState("");
  const [timerName, setTimerName] = useState("");

  const addTimer = () => {
    const duration = timerDuration
      .padEnd(6, "0")
      .match(/\d{2}/gi)
      ?.map(Number) ?? [0, 0, 0];

    setTimers((prevTimers) => [
      createTimer(`i${timers.length + 1}`, timerName, duration),
      ...prevTimers,
    ]);

    setTimerDuration("");
    setTimerName("");
  };

  return {
    timerName,
    setTimerName,
    timerDuration,
    setTimerDuration,
    addTimer,
  };
}
