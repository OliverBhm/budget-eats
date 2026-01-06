"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addedUserMessage } from "../util/group-member-actions";
import { GroupMemberList } from "./group-members/group-members";

type MemberSearchProps = {
  members: Omit<GroupMember, "role">[];
  onAdd: (user: Pick<GroupMember, "id">) => void;
};

export function GroupMemberSearch({ members, onAdd }: MemberSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const isDesktop = useIsMobile() === false;

  const results = members.filter(({ email, firstname, lastname }) => {
    const searchQuery = search.toLowerCase();
    return (
      email.toLowerCase().includes(searchQuery) ||
      firstname.toLowerCase().includes(searchQuery) ||
      lastname.toLowerCase().includes(searchQuery)
    );
  });

  const addedMessage = addedUserMessage(members);

  const content = (
    <>
      <Input
        autoFocus
        placeholder="Search email, username, first or last name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <GroupMemberList
          members={results}
          actions={(id) => (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onAdd({ id: id! });
                toast(addedMessage(id!));
              }}
            >
              <UserPlus />
            </Button>
          )}
        />
      </div>
    </>
  );

  const addButtonText = "Add members";

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {addButtonText} <UserPlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[420px] p-4 space-y-2" align="start">
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {addButtonText} <UserPlus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Add members</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          {content}
          <DrawerClose asChild className="w-full">
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
