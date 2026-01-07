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

  const [customTimerDuration, setCustomTimerDuration] = useState("");
  const [timerName, setTimerName] = useState("");

  const addTimer = () => {
    setTimers((prevTimers) => [
      createTimer(
        `i${timers.length + 1}`,
        timerName,
        customTimerDuration.padEnd(6, "0").match(/\d{2}/gi)?.map(Number) || [
          0, 0, 0,
        ]
      ),
      ...prevTimers,
    ]);
    setCustomTimerDuration("");
    setTimerName("");
  };

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
                time: customTimerDuration,
                setTime: setCustomTimerDuration,
              }}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={!customTimerDuration}
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
