import { Home, User } from "lucide-react";

export const GROUPS_MOCK = [
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