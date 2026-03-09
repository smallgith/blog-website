"use client";

import { useQuery } from "@tanstack/react-query";
import { postsApi, usersApi } from "@/lib/api";

export function usePosts(page: number, search = "") {
  return useQuery({
    queryKey: ["posts", page, search],
    queryFn: () => postsApi.list({ page, search }),
  });
}

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => postsApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useUserPosts(userId?: number, page = 1) {
  return useQuery({
    queryKey: ["user-posts", userId, page],
    queryFn: () => usersApi.posts(userId!, page),
    enabled: Boolean(userId),
  });
}
