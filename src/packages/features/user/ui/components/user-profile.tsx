import { Paragraph } from "@/components/ui/paragraph";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  children: React.ReactNode;
  className?: string;
}

function UserProfile({ children, className }: UserProfileProps) {
  return (
    <div className={`${cn(className)} flex items-center gap-2`}>{children}</div>
  );
}

interface UserProfileInfoProps {
  children: React.ReactNode;
  className?: string;
}

function UserProfileInfo({ children, className }: UserProfileInfoProps) {
  return <div className={cn(className, "text-sm")}>{children}</div>;
}

interface UsernameProps {
  firstname: string;
  lastname: string;
  username?: string;
  className?: string;
}

function Username({ firstname, lastname, username, className }: UsernameProps) {
  const usernameDisplay = username
    ? `@${username}`
    : `${firstname} ${lastname}`;
  return (
    <Paragraph weight="medium" className={cn(className)}>
      {usernameDisplay}
    </Paragraph>
  );
}

interface UserEmailProps {
  email: string;
  className?: string;
}

function UserEmail({ email, className }: UserEmailProps) {
  return (
    <Paragraph size="xs" variant="muted" className={cn(className)}>
      {email}
    </Paragraph>
  );
}

export { UserProfile, UserProfileInfo, Username, UserEmail };
