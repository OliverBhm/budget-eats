import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { capitalize } from "@/packages/features/formatting/util/text";
import { Check, RulerDimensionLine } from "lucide-react";

interface UnitOfMeasurmentToggleProps {
  className?: string;
  system?: string;
  systemChange?: (value: string) => void;
}

function UnitOfMeasurmentToggle({
  systemChange,
  system,
  className,
}: UnitOfMeasurmentToggleProps) {
  const systems = ["metric", "imperial"];
  const systemDescriptions: Record<string, string> = {
    metric: "cm, kg, l, ml",
    imperial: "in, lbs, gal, oz",
  };

  return (
    <>
      <ToggleGroup
        onValueChange={systemChange}
        type="single"
        value={system}
        variant={"outline"}
        className={cn(className)}
        spacing={2}
      >
        {systems.map((system) => (
          <ToggleGroupItem key={system} highlightSvg={true} value={system}>
            {capitalize(system)}
            <Check />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}

interface UnitOfMeasurementProps {
  children?: React.ReactNode;
  className?: string;
}

function UnitOfMeasurement({ children, className }: UnitOfMeasurementProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <span>Unit of Measurment</span> <RulerDimensionLine />
        </CardTitle>
        <CardDescription>
          Select your preferred unit system for recipe measurements
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export { UnitOfMeasurement, UnitOfMeasurmentToggle };
