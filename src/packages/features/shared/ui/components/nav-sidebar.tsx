import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ADDITIONAL_NAV_ITEMS, MAIN_NAV_ITEMS } from "../constants/nav-links";
import { GroupsSwitcher } from "@/packages/features/ui/groups/components/group-switcher";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
import { useState } from "react";

export function NavSidebar() {
  const items = MAIN_NAV_ITEMS;

  return (
    <Sidebar side="left">
      <SidebarHeader>
        <GroupsSwitcher {...{ groups: GROUPS_MOCK }} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Budget Eats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Helpfull</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADDITIONAL_NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default NavSidebar;
