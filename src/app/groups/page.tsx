import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
import { UserAvatar } from "@/packages/features/user/ui/components/user-avatar";
import {} from "@radix-ui/react-avatar";
import { MapPin, Settings } from "lucide-react";
import Link from "next/link";

export default function Groups() {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Your groups - {GROUPS_MOCK.length}</PageHeaderTitle>
        <PageHeaderDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
          eligendi quos ipsum libero facilis laudantium suscipit atque voluptate
          tempore nam, voluptatibus non quis fugiat, sequi sed eveniet quo rerum
          ducimus.
        </PageHeaderDescription>
      </PageHeader>
      <ul className="space-y-4">
        {GROUPS_MOCK.map(
          ({ id: groupId, isActive, address, name, description, members }) => (
            <li key={groupId}>
              <Card>
                <CardContent className="space-y-2">
                  <div className=" grid grid-cols-2 ">
                    {isActive && (
                      <p className="flex shrink-0 items-center text-sm text-muted-foreground">
                        <span className="bg-chart-2 h-2 w-2 shrink-0 rounded-[100%]">
                          &nbsp;
                        </span>
                        &nbsp;Active
                      </p>
                    )}
                    <CardTitle>{name}</CardTitle>
                    <CardAction>
                      <Link href={`./groups/${groupId}`}>
                        <Button variant={"secondary"}>
                          <Settings />
                        </Button>
                      </Link>
                    </CardAction>
                  </div>
                  <CardDescription>{description}</CardDescription>
                  <CardDescription className="flex gap-1 item-center">
                    <MapPin />
                    {address.street} {address.houseNo}, {address.zipCode}{" "}
                    {address.city}, {address.country}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex">
                    {members.map(({ id, firstname, lastname, imgUrl }, i) => (
                      <UserAvatar
                        key={id + groupId}
                        {...{ firstname, lastname, imgUrl }}
                        style={{
                          translate: 12 * i * -1,
                          opacity: `${100 - (members.length - i) * 10}%`,
                        }}
                      ></UserAvatar>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </li>
          )
        )}
      </ul>
    </>
  );
}
