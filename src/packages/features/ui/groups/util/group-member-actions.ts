import { GroupMember } from "@/packages/features/api/groups/model/group";

type FindUser = Pick<GroupMember, "id" | "username" | "firstname">;

const userDisplayName = (users: FindUser[], id: string) => {
  const user = users.find((u) => u.id === id);
  return user?.username || user?.firstname || "Member";
};

const removedUserMessage = (users: FindUser[]) => (id: string) => {
  const user = userDisplayName(users, id);
  return `${user} removed from group`;
};

const addedUserMessage = (users: FindUser[]) => (id: string) => {
  const user = userDisplayName(users, id);
  return `${user} added to group`;
};

const changeUserStatusMessage =
  (users: FindUser[]) => (id: string, status: string) => {
    const user = userDisplayName(users, id);
    return `${user}'s status changed to ${status}`;
  };

export { removedUserMessage, addedUserMessage, changeUserStatusMessage };
