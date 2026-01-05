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
import { UserPlus } from "lucide-react";
import { GroupMember } from "@/packages/features/api/groups/model/group";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

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
                Try a different user name, email, firt or lastname
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {results.map(({ id, firstname, lastname, email }) => (
          <div key={id} className="flex items-center justify-between p-2">
            <div className="text-sm">
              <div className="font-medium">
                {firstname} {lastname}
              </div>
              <div className="text-muted-foreground">{email}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onAdd({ id });
                setOpen(false);
              }}
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );

  const addButtonText = "Add members…";

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {addButtonText}
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
          {addButtonText}
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
