"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { generateDatesOfOneWeek } from "../../util/dates";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockLocal = "en-US";

function formatDate(date: Date, type: "short" | "medium" | "long" = "medium") {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString(mockLocal, options);
}

function getDayStatusIcon(status: "unplanned" | "incomplete" | "complete") {
  switch (status) {
    case "incomplete": {
      return <Circle className="fill-primary" />;
    }
    case "complete":
      return <CircleCheck className="fill-primary text-background" />;
    default:
      return <Circle />;
  }
}

const isActiveDay = (activeDay: Date, day: Date) =>
  activeDay.getDate() === day.getDate();

export default function WeekSelector() {
  const [week, setWeek] = useState(0);
  const weekdays = generateDatesOfOneWeek(week);
  const [activeDay, setActiveDay] = useState(new Date());

  return (
    <Card>
      <CardHeader className="flex text-md font-medium items-center justify-center">
        <Button onClick={() => setWeek(week - 1)} variant="outline">
          <ChevronLeft />
        </Button>
        <h3 className="space-x-2">
          <span>{formatDate(weekdays[0])}</span>
          <span>-</span>
          <span>{formatDate(weekdays[6])}</span>
        </h3>
        <Button onClick={() => setWeek(week + 1)} variant="outline">
          <ChevronRight />
        </Button>
      </CardHeader>

      <CardContent className="flex space-x-1 text-xs justify-center">
        {weekdays.map((day) => (
          <span
            key={day.getDate()}
            className="flex flex-col items-center space-y-2"
          >
            <Button
              size={"sm"}
              variant={"secondary"}
              state={isActiveDay(activeDay, day) ? "active" : "inactive"}
              className="flex-col gap-0 py-6 font-normal"
              onClick={() => setActiveDay(day)}
            >
              <p className="md:block">
                {day.toLocaleDateString().split(".")[0]}
              </p>
              <p>{day.toLocaleDateString(mockLocal, { weekday: "short" })}</p>
            </Button>
            {getDayStatusIcon("unplanned")}
          </span>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <CardDescription className="flex justify-between w-full">
          <Badge>On track</Badge>
          <span>$35.40 / $50.00</span>
        </CardDescription>
        <Progress value={(100 / 50) * 35.4} />
      </CardFooter>
    </Card>
  );
}
