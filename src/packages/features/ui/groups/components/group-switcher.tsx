"use client";

import { ChevronsUpDown, Plus, Settings } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Paragraph } from "@/components/ui/paragraph";
import { useState } from "react";

function GroupsSwitcher({
  groups,
}: {
  groups: {
    id: string;
    name: string;
    logo: React.ElementType;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeGroup, setActiveGroup] = useState(groups[0]);

  if (!activeGroup) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeGroup.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeGroup.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Groups
            </DropdownMenuLabel>
            {groups.map((group) => (
              <DropdownMenuItem
                key={group.name}
                onClick={() => setActiveGroup(group)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <group.logo className="size-3.5 shrink-0" />
                </div>
                <div className="flex justify-between items-center flex-1">
                  <Paragraph>{group.name}</Paragraph>
                  <Link href={`/groups/${group.id}`}>
                    <Button variant="link">
                      <Settings />
                    </Button>
                  </Link>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <Link href="/groups/new" className="flex items-center">
                <Button variant="link">
                  <Plus className="size-4" />
                </Button>
                <Paragraph variant="muted">Create new</Paragraph>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { GroupsSwitcher };
