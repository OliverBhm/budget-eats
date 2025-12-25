import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockNotificationsResponse } from "../../../api/mocks/messages";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { NotificationMessage } from "../../../api/model/messages";

function NotificationsList({
  notifications,
}: {
  notifications: NotificationMessage[];
}) {
  return (
    <ScrollArea className="h-[320px]">
      <ItemGroup variant={"muted"}>
        {notifications.map(({ id, actor, title, message, created_at }) => (
          <Item key={id}>
            <ItemMedia>
              <Avatar className="h-8 w-8">
                {actor.avatar_url ? (
                  <AvatarImage src={actor.avatar_url} />
                ) : (
                  <AvatarFallback>
                    {actor.name[0]}
                    {actor.name[1]}
                  </AvatarFallback>
                )}
              </Avatar>
            </ItemMedia>

            <ItemContent className="flex flex-col">
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription className="text-pretty">
                {message}
              </ItemDescription>
              <p>{new Date(created_at).toLocaleDateString()}</p>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </ScrollArea>
  );
}

export default NotificationsList;
