import type { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}
