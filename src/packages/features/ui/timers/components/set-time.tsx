import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Paragraph } from "@/components/ui/paragraph";
import { Dispatch, SetStateAction } from "react";

interface SetTimeProps {
  timerDuration: string;
  setTimerDuration: Dispatch<SetStateAction<string>>;
}

function SetTime({ timerDuration, setTimerDuration }: SetTimeProps) {
  const inputs = ["h", "m", "s"];

  return (
    <InputOTP value={timerDuration} onChange={setTimerDuration} maxLength={6}>
      {inputs.map((label, i) => (
        <>
          <InputOTPGroup key={label}>
            {Array.from({ length: 2 }).map((_, index) => (
              <>
                <InputOTPSlot key={index} index={index + i * 2} />
              </>
            ))}
          </InputOTPGroup>
          <Paragraph>{label}</Paragraph>
        </>
      ))}
    </InputOTP>
  );
}

export { SetTime };
