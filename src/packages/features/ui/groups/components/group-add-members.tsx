import { Button } from "@/components/ui/button";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { UserPlus } from "lucide-react";
import { GroupMemberSearch } from "./group-member-search";
import { GroupMemberStatusSelect } from "./group-member-status-select";
import { GroupMemberList } from "./group-members/group-members";
import { Headline } from "@/components/ui/headline";
import { toast } from "sonner";
import { addedUserMessage } from "../util/group-member-actions";

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
          <Headline level="h6">Members from other groups</Headline>
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
                    toast(
                      addedUserMessage([...members, ...otherMembers])(id || "")
                    );
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
