import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";

import {
  ITEM_TRANSITION,
  ITEM_VARIANTS,
  LIST_TRANSITION,
  LIST_VARIANTS,
} from "./group-members.animate";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { AnimateFadeIn } from "../../../animation/fade-in";
import {
  UserEmail,
  Username,
  UserProfile,
  UserProfileInfo,
} from "../../../user/components/user-profile";
import { UserAvatar } from "../../../user/components/user-avatar";

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
    <>
      {members.length > 0 && (
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
      )}
    </>
  );
}

export { GroupMemberList };
