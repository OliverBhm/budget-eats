export type GroupMemberRole = "admin" | "member" | "viewer";

export interface GroupMember {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: GroupMemberRole;
  imgUrl?: string | null;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}
