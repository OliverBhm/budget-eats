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
import { UserAvatar } from "@/packages/features/user/ui/components/user-avatar";
import {} from "@radix-ui/react-avatar";
import { MapPin, Settings } from "lucide-react";
import Link from "next/link";

export const GROUPS_MOCK = [
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "At Home",
    isActive: true,
    address: {
      street: "Musterstraße",
      houseNo: "123",
      zipCode: "123456",
      city: "Berlin",
      country: "Germany",
    },
    description:
      "Eine Gruppe für alle die bei Dir zu Hause wohnen und zusammen einkaufen",
    members: [
      {
        userId: "123e4567",
        firstname: "Oliver",
        role: "admin",
        lastname: "Boehm",
        imgUrl: "/ingredient.png",
      },
      {
        userId: "123e4568",
        firstname: "Nastja",
        role: "member",
        lastname: "Marsov",
      },
      {
        userId: "123e4569",
        firstname: "Liam",
        role: "guest",
        lastname: "Marsov",
        imgUrl: "/essen.jpeg",
      },
    ],
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "For Me",
    isActive: false,
    address: {
      street: "Berlepschstraße",
      houseNo: "123",
      zipCode: "123456",
      city: "Berlin",
      country: "Germany",
    },
    description:
      "Ein Gruppe nur für Dich, falls Du mal etwas nicht mit anderen teilen möchtest.",
    members: [
      {
        userId: "123e4567",
        firstname: "Oliver",
        lastname: "Boehm",
        role: "admin",
        imgUrl: "/ingredient.png",
      },
    ],
  },
];

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
                    {members.map(
                      ({ userId, firstname, lastname, imgUrl }, i) => (
                        <UserAvatar
                          key={userId + groupId}
                          {...{ firstname, lastname, imgUrl }}
                          style={{
                            translate: 12 * i * -1,
                            opacity: `${100 - (members.length - i) * 10}%`,
                          }}
                        ></UserAvatar>
                      )
                    )}
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
