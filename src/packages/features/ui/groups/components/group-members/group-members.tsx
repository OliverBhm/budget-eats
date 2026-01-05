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
import { UserAvatar } from "@/packages/features/user/ui/components/user-avatar";
import {
  UserEmail,
  Username,
  UserProfile,
  UserProfileInfo,
} from "@/packages/features/user/ui/components/user-profile";

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
    <AnimatePresence mode="wait" initial={false}>
      {members.length > 0 && (
        <motion.div
          key="group-member-list"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={LIST_VARIANTS}
          transition={LIST_TRANSITION}
        >
          <ItemGroup variant="muted" className={cn(className)}>
            <AnimatePresence initial={false}>
              {members.map(({ id, firstname, lastname, imgUrl, email }, i) => {
                return (
                  <Fragment key={id}>
                    <motion.div
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={ITEM_VARIANTS}
                      transition={ITEM_TRANSITION}
                    >
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
                    </motion.div>

                    <ItemSeparator className="last:hidden" />
                  </Fragment>
                );
              })}
            </AnimatePresence>
          </ItemGroup>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { GroupMemberList };
