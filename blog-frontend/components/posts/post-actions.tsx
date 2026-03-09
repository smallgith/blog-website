"use client";

import { useState } from "react";
import { Bookmark, Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarksApi, getApiErrorMessage, likesApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";

interface PostActionsProps {
  postId: number;
  isLikedByMe?: boolean;
  isBookmarkedByMe?: boolean;
  likeCount?: number;
}

export function PostActions({
  postId,
  isLikedByMe = false,
  isBookmarkedByMe = false,
  likeCount = 0,
}: PostActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);
  const [optimisticBookmarked, setOptimisticBookmarked] = useState<boolean | null>(null);
  const [optimisticLikes, setOptimisticLikes] = useState<number | null>(null);
  const [likeBump, setLikeBump] = useState(false);
  const queryClient = useQueryClient();

  const liked = optimisticLiked ?? isLikedByMe;
  const bookmarked = optimisticBookmarked ?? isBookmarkedByMe;
  const likes = optimisticLikes ?? likeCount;

  const likeMutation = useMutation({
    mutationFn: async () => {
      return liked ? likesApi.unlike(postId) : likesApi.like(postId);
    },
    onSuccess: () => {
      setOptimisticLiked(!liked);
      setOptimisticLikes(liked ? Math.max(0, likes - 1) : likes + 1);
      if (!liked) {
        setLikeBump(true);
        setTimeout(() => setLikeBump(false), 300);
      }
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      return bookmarked ? bookmarksApi.remove(postId) : bookmarksApi.add(postId);
    },
    onSuccess: () => {
      setOptimisticBookmarked(!bookmarked);
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (err) => setError(getApiErrorMessage(err)),
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => likeMutation.mutate()}
          disabled={likeMutation.isPending}
          size="sm"
          className={liked ? "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100" : ""}
        >
          <Heart
            size={15}
            className={`mr-1.5 transition ${
              liked ? "fill-rose-500 text-rose-500" : "text-slate-500"
            } ${likeBump ? "scale-125" : ""}`}
          />
          {liked ? "Liked" : "Like"} ({likes})
        </Button>
        <Button
          variant="secondary"
          onClick={() => bookmarkMutation.mutate()}
          disabled={bookmarkMutation.isPending}
          size="sm"
          className={bookmarked ? "border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100" : ""}
        >
          <Bookmark
            size={15}
            className={`mr-1.5 transition ${bookmarked ? "fill-sky-500 text-sky-500" : "text-slate-500"}`}
          />
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>
      {error && <ErrorState message={error} />}
    </div>
  );
}
