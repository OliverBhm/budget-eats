import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockNotificationsResponse } from "../../../api/mocks/messages";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { NotificationMessage } from "../../../api/model/messages";
import { Button } from "@/components/ui/button";
import { BUTTON_STYLES } from "./styles/search";
import { Bell, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment } from "react/jsx-runtime";
import { UserAvatar } from "@/packages/features/ui/user/components/user-avatar";
import { cn } from "@/lib/utils";
import { Headline } from "@/components/ui/headline";

function NotificationsList({
  notifications,
}: {
  notifications: NotificationMessage[];
}) {
  return (
    <ScrollArea className="h-[300px]">
      <ItemGroup variant={"muted"}>
        {notifications.map(({ id, actor, title, message, created_at }) => (
          <Fragment key={id}>
            <Item>
              <ItemMedia>
                <UserAvatar {...actor} />
              </ItemMedia>

              <ItemContent className="flex flex-col">
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription className="text-pretty">
                  {message}
                </ItemDescription>
                <p>{new Date(created_at).toLocaleDateString()}</p>
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
    <div className="flex items-center justify-between pb-2 border-b">
      <Headline level="h6">Notifications</Headline>
      <span className="text-xs text-muted-foreground">{unread} unread</span>
    </div>
  );
}

function NotifictionIndicator({ unread }: { unread: number }) {
  return (
    <div className="relative">
      {unread > 0 && (
        <div className="absolute -right-1 -top-1 bg-destructive rounded-full text-xs h-3 w-3 flex items-center justify-center text-white"></div>
      )}
      <Bell size={64} />
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
      <PopoverContent className="space-y-2">
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
