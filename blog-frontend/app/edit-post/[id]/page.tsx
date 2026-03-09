"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostForm } from "@/components/posts/post-form";
import { ProtectedRoute } from "@/components/protected-route";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage, postsApi } from "@/lib/api";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);
  const router = useRouter();
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["post-by-id", postId],
    queryFn: async () => {
      const list = await postsApi.list({ page: 1 });
      const post = list.data.find((item) => item.id === postId);
      if (!post) throw new Error("Post not found");
      return post;
    },
    enabled: Number.isFinite(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (values: { title: string; content: string; coverImageFile?: File | null }) =>
      postsApi.update(postId, values),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      router.push(`/post/${post.slug}`);
    },
  });

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-3xl">
        <Card className="rounded-3xl p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Editor</p>
          <h1 className="mb-4 mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Edit Post</h1>
          {postQuery.isLoading && <Spinner />}
          {postQuery.error && <ErrorState message={getApiErrorMessage(postQuery.error)} />}
          {postQuery.data && (
            <PostForm
              defaultValues={{ title: postQuery.data.title, content: postQuery.data.content }}
              existingImageName={postQuery.data.coverImage ?? postQuery.data.cover_image}
              submitText="Update Post"
              onSubmit={async (values) => {
                try {
                  await updateMutation.mutateAsync(values);
                } catch {
                  // Mutation error is handled by updateMutation.error UI.
                }
              }}
              isSubmitting={updateMutation.isPending}
            />
          )}
          {updateMutation.error && <ErrorState message={getApiErrorMessage(updateMutation.error)} />}
        </Card>
      </div>
    </ProtectedRoute>
  );
}
