"use client";

import { TimerData } from "@/app/timers/page";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { formatTime } from "@/packages/features/formatting/util/time";
import clsx from "clsx";
import { TimerOff, TimerReset, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Label,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

interface TimerProps {
  timer: TimerData;
  removeTimer: (id: number) => void;
  className?: string;
}

const chartConfig = {
  progress: {
    label: "Progress",
  },
} satisfies ChartConfig;

export function Timer({
  timer: { remaining, duration, id, name },
  removeTimer,
  className,
}: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(duration);
  const [remainingTime, setRemainingTime] = useState(remaining);
  const [isRunning, setIsRunning] = useState(true);

  const addMinute = () => {
    setTotal((t) => t + 60);
    setRemainingTime((r) => r + 60);
  };

  const resetTimer = () => {
    setRemainingTime(duration);
    setElapsed(0);
  };

  const stopTimer = () => {
    setIsRunning((isRunning) => !isRunning);
  };

  useEffect(() => {
    setElapsed(0);
  }, [remaining]);

  useEffect(() => {
    if (elapsed >= remainingTime || !isRunning) return;

    const id = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const current = Math.max(remainingTime - elapsed, 0);

  const chartData = [
    {
      name: "progress",
      value: Math.round((current / total) * 100),
      fill: "var(--chart-1)",
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{name}</CardTitle>
        <Button onClick={() => removeTimer(id)} variant="outline">
          <XCircle />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className={clsx("mx-auto aspect-square max-h-[220px]", className)}
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />

            <RadialBar dataKey="value" background cornerRadius={10} />

            <PolarRadiusAxis tick={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan className="fill-foreground text-2xl font-bold">
                        {formatTime(current)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        dy="1.4em"
                        className="fill-muted-foreground text-sm mt-20"
                      >
                        remaining
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <ButtonGroup>
          <Button size={"lg"} onClick={addMinute} variant="secondary">
            <strong>+1:00</strong>
          </Button>
          <ButtonGroupSeparator />
          <Button size={"lg"} onClick={resetTimer} variant="secondary">
            <TimerReset />
          </Button>
          <ButtonGroupSeparator />
          <Button size={"lg"} onClick={stopTimer} variant="secondary">
            <TimerOff />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
