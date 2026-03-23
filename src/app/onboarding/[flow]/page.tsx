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
import {
  EditorialEyebrow,
  EditorialIntro,
  EditorialIntroDescription,
  EditorialIntroTitle,
  EditorialSection,
} from "@/components/ui/editorial-layout";
import { Headline } from "@/components/ui/headline";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Paragraph } from "@/components/ui/paragraph";
import {
  UnitOfMeasurement,
  UnitOfMeasurmentToggle,
} from "@/packages/features/ui/recipe/components/system-of-measurment";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    title: "We'd like to get to know you.",
    description:
      "Let's start by telling us what to call you, this also makes it easier for your friends to find you",
  },
  {
    title: "Please tells us where you are from",
    description: "This way we can show you localized offers and deals",
  },
  {
    title: "Measurement System",
    description: "Make life easier by using a measurment system you know. You can always change this later in the settings.",
  },
];

function Stepper({ activeStep, setActiveStep }: any) {
  const padIndex = (index: number) => index.toString().padStart(2, "0");
  return (
    <div className="space-y-2">
      <EditorialEyebrow>
        Step {padIndex(activeStep + 1)} of {padIndex(STEPS.length)}
      </EditorialEyebrow>
      <div
        style={{ gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}
        className="gap-2 grid"
      >
        {STEPS.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`h-3 rounded-md ${index === activeStep ? "bg-primary" : "bg-primary-fixed"}`}
          >
            &nbsp;
          </button>
        ))}
      </div>
    </div>
  );
}

export function UserProfileForm() {
  return (
    <form className="w-full space-y-2">
      <div className="grid grid-cols-2 gap-2 space-y-2">
        <div className="space-y-2 w-full">
          <Label>Firstname</Label>
          <Input placeholder="e.g. Julian" />
        </div>
        <div className="space-y-2">
          <Label>Lastname</Label>
          <Input placeholder="e.g. Doe" />
        </div>
      </div>
      <Label className="mb-2">Username</Label>
      <Input placeholder="e.g. jDoe" />
    </form>
  );
}

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <>
      <EditorialSection>
        <EditorialIntro className="mb-5">
          <EditorialIntroTitle scale={"headline"}>
            Welcome to Budget Eats
          </EditorialIntroTitle>
          <EditorialIntroDescription>
            Lets fill in some details to get started and set up your account.
          </EditorialIntroDescription>
        </EditorialIntro>
        <Stepper {...{ activeStep, setActiveStep }} />
      </EditorialSection>
      <div className="grid grid-cols-2 gap-6 px-6">
        {activeStep === 0 && (
          <Card variant={"nested"}>
            <CardHeader className="justify-center items-center flex flex-col">
              <UserPlus className="bg-accent/30 shadow-xs p-2 rounded-full" size={"4rem"} />
              <CardDescription>
                Upload a photo so your friends immediatly know who you are.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfileForm />
            </CardContent>
          </Card>
        )}
        {activeStep === 1 && (
          <Card>
            <CardContent>
              <Item>
                <ItemContent>
                  <ItemMedia />
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
        )}
        {activeStep === 2 && (
          <UnitOfMeasurement>
            <UnitOfMeasurmentToggle className="flex-wrap" />
          </UnitOfMeasurement>
        )}
        <div className="space-y-10">
          <div>
            <EditorialIntroTitle scale={"display"} >{step.title}</EditorialIntroTitle>
            <Paragraph className="mt-6">
              {step.description}
            </Paragraph>
          </div>
          <CardFooter className="gap-2">
            {activeStep > 0 && <Button variant={"secondary"} onClick={() => setActiveStep(activeStep - 1)}>
              <ArrowLeft />
              Back
            </Button>}
            <Button onClick={() => setActiveStep(activeStep + 1)}>
              {activeStep !== STEPS.length - 1 ? "Continue" : "Let's start"}
              <ArrowRight />
            </Button>
          </CardFooter>
        </div>
      </div>
    </>
  );
}
