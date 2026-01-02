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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { UserAvatar } from "@/packages/features/user/ui/components/user-avatar";
import { ChevronsUpDown, Trash } from "lucide-react";
import { GroupMemberStatusSelect } from "./group-member-status-select";
import Link from "next/link";

interface GroupMemberListProps {
  members: GroupMember[];
  className?: string;
}

function GroupMemberList({ members, className }: GroupMemberListProps) {
  return (
    <ItemGroup variant={"muted"} className={cn(className)}>
      {members.map(({ id, firstname, lastname, imgUrl }) => (
        <Item key={id}>
          <ItemContent className="flex-col">
            <ItemTitle>
            <UserAvatar {...{ firstname, lastname, imgUrl }} />
              {firstname} {lastname}
            </ItemTitle>
            <ItemDescription>
              Since: <strong>20.3.2025</strong>
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <GroupMemberStatusSelect {...{ userId: id }} />
            <AlertDialog>
              <AlertDialogTrigger asChild >
                <Button size={"sm"} variant={"outline"}>
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove {firstname}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    After you've removed {firstname} they can no longer view
                    meal plans, shared recipes and budget overviews.
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
          </ItemActions>
          <ItemSeparator />
        </Item>
      ))}
    </ItemGroup>
  );
}

interface GroupMembersProps {
  members: GroupMember[];
  className?: string;
}

function GroupMembers({ members, className }: GroupMembersProps) {
  return (
    <Card className={cn(className)}>
      <Collapsible>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <CardTitle>Group Members</CardTitle>
            <CollapsibleTrigger>
              <ChevronsUpDown />
            </CollapsibleTrigger>
          </div>
          <CardDescription>
            Add, remove or change the roles of members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CollapsibleContent className="space-y-2">
            <GroupMemberList members={members} />
            <Link href="./groups/search">
              <Button variant="secondary">Add Member</Button>
            </Link>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
}

export { GroupMemberList, GroupMembers };
