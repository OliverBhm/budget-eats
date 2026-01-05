import { Button } from "@/components/ui/button";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { UserPlus } from "lucide-react";
import { GroupMemberSearch } from "./group-member-search";
import { GroupMemberStatusSelect } from "./group-member-status-select";
import { GroupMemberList } from "./group-members";

interface GroupAddMembersProps {
  members: GroupMember[];
  otherMembers?: Omit<GroupMember, "role">[];
  addMember: (user: Pick<GroupMember, "id">) => void;
}

export function GroupAddMembers({
  members,
  otherMembers,
  addMember,
}: GroupAddMembersProps) {
  return (
    <>
      <GroupMemberSearch members={members} onAdd={addMember} />
      {otherMembers && (
        <>
          <h4 className="font-semibold">Members from other groups</h4>
          <GroupMemberList
            members={otherMembers}
            actions={(id) => (
              <>
                <GroupMemberStatusSelect userId={id} />
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() => {
                    addMember({ id: id || "" });
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                </Button>
              </>
            )}
          ></GroupMemberList>
        </>
      )}
    </>
  );
}
