"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { SetTime } from "@/packages/features/ui/timers/components/set-time";
import { Timer } from "@/packages/features/ui/timers/components/timer";
import { useAddTimer } from "@/packages/features/ui/timers/hooks/use-add-timer";
import { useState } from "react";

export interface TimerData {
  id: string;
  name: string;
  duration: number;
  remaining: number;
}

const MOCK_TIMERS: TimerData[] = [
  { id: "i1", name: "Boil Eggs", duration: 60 * 10, remaining: 60 * 10 },
  { id: "i2", name: "Bake Cake", duration: 45 * 60, remaining: 22.5 * 60 },
  { id: "i3", name: "Proof Bread", duration: 45 * 60, remaining: 2700 },
];

const createTimer = (
  id: string,
  name: string,
  [hours, minutes, seconds]: number[]
): TimerData => ({
  id,
  name: name || "Custom Timer",
  duration: hours * 3600 + minutes * 60 + seconds,
  remaining: hours * 3600 + minutes * 60 + seconds,
});

export default function TimersPage() {
  const [timers, setTimers] = useState(MOCK_TIMERS);

  const { timerName, setTimerName, timerDuration, setTimerDuration, addTimer } =
    useAddTimer({
      timers,
      setTimers,
      createTimer,
    });

  const removeTimer = (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Timers</PageHeaderTitle>
        <PageHeaderDescription>
          Manage your cooking timers here.
        </PageHeaderDescription>
      </PageHeader>

      <section className="grid gap-4 md:grid-cols-6">
        <Card className="col-span-3">
          <CardContent className="space-y-2">
            <Input
              value={timerName}
              onChange={({ target: { value } }) => setTimerName(value)}
              placeholder="Timer Name"
            />
            <SetTime
              {...{
                timerDuration,
                setTimerDuration,
              }}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={!timerDuration}
              className="w-full"
              onClick={() => addTimer()}
            >
              Start Timer
            </Button>
          </CardFooter>
        </Card>
        {timers.map(({ id, name, duration, remaining }) => (
          <Timer
            className="col-span-3"
            key={id}
            {...{ timer: { id, name, duration, remaining }, removeTimer }}
          />
        ))}
      </section>
    </>
  );
}
