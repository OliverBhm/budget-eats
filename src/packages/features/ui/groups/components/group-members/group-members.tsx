import { Fragment } from "react";

import { Empty, EmptyDescription, EmptyHeader } from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { UserAvatar } from "../../../user/components/user-avatar";
import {
  UserEmail,
  Username,
  UserProfile,
  UserProfileInfo,
} from "../../../user/components/user-profile";

interface GroupMemberListProps {
  members: Omit<GroupMember, "role">[];
  emptyMessage?: string;
  actions?: (id?: string, index?: number) => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function GroupMemberList({
  members,
  emptyMessage = "Search by username, email, first or lastname.",
  actions,
  className,
}: GroupMemberListProps) {
  return (
    <>
      {members.length ? (
        <ItemGroup variant="muted" className={cn(className)}>
          {members.map(({ id, firstname, lastname, imgUrl, email }, i) => {
            return (
              <Fragment key={id}>
                <Item>
                  <ItemContent className="flex-col">
                    <UserProfile>
                      <UserAvatar {...{ firstname, lastname, imgUrl }} />
                      <UserProfileInfo>
                        <Username {...{ firstname, lastname }} />
                        <UserEmail email={email} />
                      </UserProfileInfo>
                    </UserProfile>
                  </ItemContent>

                  <ItemActions className={cn(className)}>
                    {actions?.(id, i)}
                  </ItemActions>
                </Item>

                <ItemSeparator className="last:hidden" />
              </Fragment>
            );
          })}
        </ItemGroup>
      ) : (
        <Empty className="bg-muted">
          <EmptyHeader>
            <EmptyDescription>{emptyMessage}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}

export { GroupMemberList };
