import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

function GroupMemberStatusSelect({ userId }: { userId?: string }) {
  const [memberStatus, setMemberStatusType] = useState("member");
  const memberStatusTypes = [
    {
      value: "admin",
      text: "Admin",
    },
    {
      value: "member",
      text: "Member",
    },
    {
      value: "viewer",
      text: "viewer",
    },
  ];
  return (
    <Select value={memberStatus} onValueChange={setMemberStatusType}>
      <SelectTrigger>
        <SelectValue placeholder={memberStatus} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Member status</SelectLabel>
          {memberStatusTypes.map(({ text, value }) => (
            <SelectItem key={value} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { GroupMemberStatusSelect };