import { eachMonthOfInterval } from "date-fns";
import { ro } from "date-fns/locale";
import { Home, User } from "lucide-react";
import { GroupMember } from "../model/group";

const MOCK_USERS: GroupMember[] = [
  {
    id: "1",
    username: "jdoe",
    email: "jdoe@mail.com",
    firstname: "John",
    lastname: "Doe",
    role: "admin",
    imgUrl: "/ingredient.png",
  },
  {
    id: "2",
    username: "asmith",
    email: "asmith@mail.com",
    firstname: "Anna",
    role: "member",
    lastname: "Smith",
  },
  {
    id: "3",
    username: "bwayne",
    email: "bwayne@mail.com",
    firstname: "Bruce",
    lastname: "Wayne",
    role: "viewer",
    imgUrl: "/ingredient.png",
  },
];

const MOCK_OTHER_GROUP_MEMBERS: Omit<GroupMember, "role">[] = [
  {
    id: "4",
    username: "ckent",
    email: "ckent@mail.com",
    firstname: "Clark",
    lastname: "Kent",
  },
  {
    id: "5",
    username: "dprince",
    email: "dprince@mail.com",
    firstname: "Diana",
    lastname: "Prince",
  },
];

const GROUPS_MOCK = [
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "At Home",
    isActive: true,
    logo: Home,
    address: {
      street: "Musterstraße",
      houseNo: "123",
      zipCode: "123456",
      city: "Berlin",
      country: "Germany",
    },
    description:
      "Eine Gruppe für alle die bei Dir zu Hause wohnen und zusammen einkaufen",
    members: [...MOCK_USERS],
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "For Me",
    isActive: false,
    logo: User,
    address: {
      street: "Berlepschstraße",
      houseNo: "123",
      zipCode: "123456",
      city: "Berlin",
      country: "Germany",
    },
    description:
      "Ein Gruppe nur für Dich, falls Du mal etwas nicht mit anderen teilen möchtest.",
    members: [...MOCK_USERS.slice(0, 1)],
  },
];

export { GROUPS_MOCK, MOCK_USERS, MOCK_OTHER_GROUP_MEMBERS };
