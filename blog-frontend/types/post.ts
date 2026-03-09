import type { Comment } from "./comment";
import type { User } from "./user";

export interface Like {
  id: number;
  postId: number;
  userId: number;
}

export interface Bookmark {
  id: number;
  postId: number;
  userId: number;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: string | null;
  cover_image?: string | null;
  user?: User;
  comments?: Comment[];
  likes?: Like[];
  bookmarks?: Bookmark[];
}

export interface PaginatedMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}
