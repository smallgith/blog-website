"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentsSection } from "@/components/comments/comments-section";
import { PostActions } from "@/components/posts/post-actions";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { usePostBySlug } from "@/hooks/usePosts";
import { getApiErrorMessage, getCoverImageUrl, postsApi } from "@/lib/api";

export default function PostDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: post, isLoading, error } = usePostBySlug(slug);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/");
    },
  });
  const coverImage = post ? getCoverImageUrl(post) : null;

  return (
    <ProtectedRoute>
      <>
        {isLoading && <Spinner />}
        {error && <ErrorState message={getApiErrorMessage(error)} />}
        {!isLoading && !error && !post && <ErrorState message="Post not found" />}

        {post && (
          <article className="space-y-6">
            <Card className="space-y-5 rounded-3xl p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Post</p>
              <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">{post.title}</h1>
              {coverImage && (
                <img
                  src={coverImage}
                  alt={post.title}
                  className="max-h-[460px] w-full rounded-2xl object-cover"
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.src.includes("/uploadsF/")) {
                      target.src = target.src.replace("/uploadsF/", "/uploads/");
                    }
                  }}
                />
              )}
              <p className="whitespace-pre-line text-base leading-8 text-slate-700">{post.content}</p>

              <PostActions
                postId={post.id}
                isLikedByMe={(post.likes ?? []).some((like) => like.userId === user?.id)}
                isBookmarkedByMe={(post.bookmarks ?? []).some((item) => item.userId === user?.id)}
                likeCount={post.likes?.length ?? 0}
              />

              {user?.id === post.userId && (
                <div className="flex flex-wrap gap-2">
                  <Link href={`/edit-post/${post.id}`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => deleteMutation.mutate(post.id)}
                    disabled={deleteMutation.isPending}
                    size="sm"
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              )}
            </Card>

            <CommentsSection postId={post.id} comments={post.comments ?? []} />
          </article>
        )}
      </>
    </ProtectedRoute>
  );
}
