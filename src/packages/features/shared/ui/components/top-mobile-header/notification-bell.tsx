import { ScrollArea } from "@/components/ui/scroll-area";
import { mockNotificationsResponse } from "../../../api/mocks/messages";
import { NotificationMessage } from "../../../api/model/messages";
import { Button } from "@/components/ui/button";
import { BUTTON_STYLES } from "./styles/search";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment } from "react/jsx-runtime";
import { UserAvatar } from "@/packages/features/ui/user/components/user-avatar";
import { cn } from "@/lib/utils";
import { Headline } from "@/components/ui/headline";
import { Paragraph } from "@/components/ui/paragraph";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item";

function NotificationsList({
  notifications,
}: {
  notifications: NotificationMessage[];
}) {
  return (
    <ScrollArea className="h-[300px]">
      <ItemGroup variant={"muted"} className="gap-3">
        {notifications.map(({ id, actor, title, message, created_at }) => (
          <Fragment key={id}>
            <Item variant="muted" className="rounded-[1.25rem] px-3 py-3">
              <ItemMedia>
                <UserAvatar {...actor} />
              </ItemMedia>

              <ItemContent className="flex flex-col">
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription className="text-pretty">
                  {message}
                </ItemDescription>
                <Paragraph size="label-sm" variant="muted" className="pt-1 text-muted-foreground/90">
                  {new Date(created_at).toLocaleDateString()}
                </Paragraph>
              </ItemContent>
            </Item>
            <ItemSeparator />
          </Fragment>
        ))}
      </ItemGroup>
    </ScrollArea>
  );
}

function NotificationListHeader({ unread }: { unread: number }) {
  return (
    <div className="flex items-end justify-between pb-2">
      <Headline level="h6">Notifications</Headline>
      <Paragraph as="span" size="label-sm" variant="muted">
        {unread} unread
      </Paragraph>
    </div>
  );
}

function NotifictionIndicator({ unread }: { unread: number }) {
  return (
    <div className="relative">
      {unread > 0 && (
        <div className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary-container px-1 text-[0.625rem] font-semibold text-[color:var(--on-secondary-container)]">
          {unread}
        </div>
      )}
      <Bell className="size-5" />
    </div>
  );
}

function NotificationBell() {
  const { unread, data } = mockNotificationsResponse;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(BUTTON_STYLES, "")}
          size="icon-lg"
          variant="ghost"
        >
          <NotifictionIndicator unread={unread} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[22rem] space-y-3 rounded-[1.5rem] p-4">
        <NotificationListHeader unread={unread} />
        <NotificationsList notifications={data} />
        <Button variant="secondary" className="w-full">
          Mark all as read
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export { NotificationBell, NotificationsList, NotificationListHeader };
