import axios from "axios";
import { getToken } from "./auth";
import type { Comment } from "@/types/comment";
import type { PaginatedMeta, PaginatedResponse, Post } from "@/types/post";
import type { LoginPayload, RegisterPayload, User } from "@/types/user";

const API_URL = "http://localhost:3333";

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    if (typeof serverMessage === "string") return serverMessage;
    const firstValidationError = error.response?.data?.errors?.[0]?.message;
    if (typeof firstValidationError === "string") return firstValidationError;
  }

  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

function normalizeMeta(meta: Record<string, number | undefined> = {}): PaginatedMeta {
  return {
    currentPage: Number(meta.currentPage ?? meta.current_page ?? 1),
    lastPage: Number(meta.lastPage ?? meta.last_page ?? 1),
    perPage: Number(meta.perPage ?? meta.per_page ?? 10),
    total: Number(meta.total ?? 0),
  };
}

function normalizePaginated<T>(data: {
  data: T[];
  meta?: Record<string, number | undefined>;
}): PaginatedResponse<T> {
  return {
    data: data.data ?? [],
    meta: normalizeMeta(data.meta),
  };
}

function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getCoverImageUrl(post: { coverImage?: string | null; cover_image?: string | null }) {
  const imageName = post.coverImage ?? post.cover_image;
  if (!imageName) return null;
  return `${API_URL}/uploadsF/${imageName}`;
}

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const { data } = await apiClient.post<User>("/register", payload);
    return data;
  },
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post("/login", payload);
    return data;
  },
  me: async () => {
    const { data } = await apiClient.get<User>("/me");
    return data;
  },
  logout: async () => {
    // Current backend auth routes for logout are in a separate /api/v1 namespace.
    // Clear local auth state on the frontend for now.
    return;
  },
};

export const postsApi = {
  list: async (params: { page?: number; search?: string }) => {
    const { data } = await apiClient.get("/posts", { params });
    return normalizePaginated<Post>(data);
  },
  getBySlug: async (slug: string) => {
    const { data } = await apiClient.get<Post>(`/posts/${slug}`);
    return data;
  },
  create: async (payload: { title: string; content: string; coverImageFile?: File | null }) => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("content", payload.content);
    formData.append("slug", toSlug(payload.title));
    if (payload.coverImageFile) {
      formData.append("cover_image", payload.coverImageFile);
    }

    const { data } = await apiClient.post<Post>("/posts", formData);
    return data;
  },
  update: async (id: number, payload: { title: string; content: string; coverImageFile?: File | null }) => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("content", payload.content);
    formData.append("slug", toSlug(payload.title));
    if (payload.coverImageFile) {
      formData.append("cover_image", payload.coverImageFile);
    }

    const { data } = await apiClient.put<Post>(`/posts/${id}`, formData);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await apiClient.delete(`/posts/${id}`);
    return data;
  },
};

export const commentsApi = {
  create: async (postId: number, payload: { content: string }) => {
    const { data } = await apiClient.post<Comment>(`/posts/${postId}/comments`, payload);
    return data;
  },
};

export const likesApi = {
  like: async (postId: number) => {
    const { data } = await apiClient.post(`/posts/${postId}/like`);
    return data;
  },
  unlike: async (postId: number) => {
    const { data } = await apiClient.delete(`/posts/${postId}/like`);
    return data;
  },
};

export const bookmarksApi = {
  add: async (postId: number) => {
    const { data } = await apiClient.post(`/posts/${postId}/bookmark`);
    return data;
  },
  remove: async (postId: number) => {
    const { data } = await apiClient.delete(`/posts/${postId}/bookmark`);
    return data;
  },
  list: async (page = 1) => {
    const { data } = await apiClient.get("/bookmarks", { params: { page } });
    return normalizePaginated<Post>(data);
  },
};

export const usersApi = {
  byId: async (id: number) => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  },
  posts: async (id: number, page = 1) => {
    const { data } = await apiClient.get(`/users/${id}/posts`, {
      params: { page },
    });
    return normalizePaginated<Post>(data);
  },
};
