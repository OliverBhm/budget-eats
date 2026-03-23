"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="floating" className="border-0">
      <SidebarHeader className="gap-4 p-4 pt-5">
        <div className="rounded-[1.5rem] bg-sidebar-accent px-4 py-5 shadow-[0_28px_56px_-34px_rgba(28,28,24,0.18)]">
          <p className="type-label-sm text-sidebar-foreground/60">Curated Harvest</p>
          <h1 className="mt-3 font-display text-3xl leading-none tracking-[-0.06em] text-sidebar-foreground">
            Budget Eats
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sidebar-foreground/72">
            Market-fresh planning, softer surfaces, and recipes that feel like
            a magazine spread.
          </p>
        </div>
        <GroupsSwitcher {...{ groups: GROUPS_MOCK }} />
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 pb-3">
        <SidebarGroup>
          <SidebarGroupLabel className="type-label-sm px-3 text-sidebar-foreground/55">
            Navigate
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="h-11 rounded-2xl px-3 text-[0.95rem] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground hover:bg-sidebar-accent/80"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="type-label-sm px-3 text-sidebar-foreground/55">
            Helpful
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADDITIONAL_NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="h-11 rounded-2xl px-3 text-[0.95rem] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground hover:bg-sidebar-accent/80"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 pt-0">
        <div className="rounded-[1.5rem] bg-sidebar-primary px-4 py-4 text-sidebar-primary-foreground shadow-[0_28px_56px_-34px_rgba(15,82,56,0.36)]">
          <p className="type-label-sm text-sidebar-primary-foreground/70">
            This Week
          </p>
          <p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em]">
            $45
          </p>
          <p className="mt-2 text-sm leading-relaxed text-sidebar-primary-foreground/78">
            Saved across shared groceries and quick pantry dinners.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default NavSidebar;
