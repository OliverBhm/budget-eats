import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { UserAvatar } from "@/packages/features/user/ui/components/user-avatar";
import {
  UserEmail,
  Username,
  UserProfile,
  UserProfileInfo,
} from "@/packages/features/user/ui/components/user-profile";
import { Trash } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { GroupMemberSearch } from "./group-member-search";
import { GroupMemberStatusSelect } from "./group-member-status-select";

interface GroupMemberDeleteAlertProps {
  firstname: string;
  username: string;
  id: string;
}

function GroupMemberDeleteAlert({
  firstname,
  username,
  id,
}: GroupMemberDeleteAlertProps) {
  const displayName = username || firstname;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove {displayName}?</AlertDialogTitle>
          <AlertDialogDescription>
            After you've removed {displayName} they can no longer view meal
            plans, shared recipes and budget overviews.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="mt-1 md:mt-0">
            Leave in group
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button>
              I'm sure <Spinner />
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface GroupMemberListProps {
  members: Omit<GroupMember, "role">[];
  actions?: (id?: string, index?: number) => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function GroupMemberList({
  members,
  actions,
  className,
}: GroupMemberListProps) {
  return (
    <ItemGroup variant={"muted"} className={cn(className)}>
      {members.map(({ id, firstname, lastname, imgUrl, email }, i) => (
        <Fragment key={id}>
          <Item key={id}>
            <ItemContent className="flex-col">
              <UserProfile>
                <UserAvatar {...{ firstname, lastname, imgUrl }} />
                <UserProfileInfo>
                  <Username {...{ firstname, lastname }} />
                  <UserEmail {...{ email: email }} />
                </UserProfileInfo>
              </UserProfile>
            </ItemContent>
            <ItemActions className={cn(className)}>
              {actions && actions(id, i)}
            </ItemActions>
          </Item>
          <ItemSeparator className="last:hidden" />
        </Fragment>
      ))}
    </ItemGroup>
  );
}

export { GroupMemberDeleteAlert, GroupMemberList };
