import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Todo change this to the api user model once it exists
interface UserAvatarProps {
  imgUrl?: string | null;
  firstname: string;
  lastname: string;
  className?: string;
  style?: React.CSSProperties;
}

function UserAvatar({
  imgUrl,
  firstname,
  lastname,
  className,
  style,
}: UserAvatarProps) {
  return (
    <Avatar style={style} className={cn(className)}>
      <AvatarImage src={imgUrl || ""}></AvatarImage>
      <AvatarFallback>
        {firstname[0].toUpperCase()}
        {lastname[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
