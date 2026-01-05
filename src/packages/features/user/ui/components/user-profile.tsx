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
  return <p className={cn(className, "font-medium")}>{usernameDisplay}</p>;
}

interface UserEmailProps {
  email: string;
  className?: string;
}

function UserEmail({ email, className }: UserEmailProps) {
  return (
    <p className={cn(className, "text-sm text-muted-foreground")}>{email}</p>
  );
}

export { UserProfile, UserProfileInfo, Username, UserEmail };
