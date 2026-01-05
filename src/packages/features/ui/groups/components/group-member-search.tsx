"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { User, UserPlus } from "lucide-react";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { GroupMemberList } from "./group-members";

type MemberSearchProps = {
  members: Omit<GroupMember, "role">[];
  onAdd: (user: Pick<GroupMember, "id">) => void;
};

export function GroupMemberSearch({ members, onAdd }: MemberSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const isDesktop = useIsMobile() === false;

  const results = members.filter(({ email, firstname, lastname }) => {
    const searchQuery = search.toLowerCase();
    return (
      email.toLowerCase().includes(searchQuery) ||
      firstname.toLowerCase().includes(searchQuery) ||
      lastname.toLowerCase().includes(searchQuery)
    );
  });

  const content = (
    <>
      <Input
        autoFocus
        placeholder="Search email, username, first or last name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {results.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No results found</EmptyTitle>
              <EmptyDescription>
                Try a different user name, email, first or lastname
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        <GroupMemberList
          members={results}
          actions={(id) => (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onAdd({ id: id! });
                setOpen(false);
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
