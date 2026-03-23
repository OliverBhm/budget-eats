"use client";

import { Input } from "@/components/ui/input";
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
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function SidebarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    router.push(`/recipe/search/${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-sidebar-foreground/55" />
      <Input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search recipes or ingredients"
        className="pl-10"
      />
    </form>
  );
}

function SidebarNavSection({
  title,
  items,
  pathname,
}: {
  title: string;
  items: typeof MAIN_NAV_ITEMS;
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="type-label-sm px-3 text-sidebar-foreground/55">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="h-11 rounded-2xl px-3 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground hover:bg-sidebar-accent/80"
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
  );
}

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="floating" className="border-0">
      <SidebarHeader className="gap-4 p-4 pt-5">
        <GroupsSwitcher {...{ groups: GROUPS_MOCK }} />
        <SidebarSearch />
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 pb-3">
        <SidebarNavSection title="Navigate" items={MAIN_NAV_ITEMS} pathname={pathname} />
        <SidebarNavSection title="Helpful" items={ADDITIONAL_NAV_ITEMS} pathname={pathname} />
      </SidebarContent>
    </Sidebar>
  );
}

export default NavSidebar;
