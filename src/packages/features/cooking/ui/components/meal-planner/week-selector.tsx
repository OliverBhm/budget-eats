"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { generateDatesOfOneWeek } from "../../util/dates";

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

export default function WeekSelector() {
  const [week, setWeek] = useState(0);
  const weekdays = generateDatesOfOneWeek(week);

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
              className="flex-col gap-0 py-6 font-normal"
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
    </Card>
  );
}
