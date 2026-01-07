import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Paragraph } from "@/components/ui/paragraph";
import { Dispatch, SetStateAction } from "react";

interface SetTimeProps {
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
}

function SetTime({ time, setTime }: SetTimeProps) {
  const inputs = ["h", "m", "s"];

  return (
    <InputOTP value={time} onChange={setTime} maxLength={6}>
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
