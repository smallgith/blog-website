"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostForm } from "@/components/posts/post-form";
import { ProtectedRoute } from "@/components/protected-route";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { getApiErrorMessage, postsApi } from "@/lib/api";

export default function CreatePostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: postsApi.create,
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(`/post/${post.slug}`);
    },
  });

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-3xl">
        <Card className="rounded-3xl p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Editor</p>
          <h1 className="mb-4 mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Create Post</h1>
          <PostForm
            submitText="Publish Post"
            onSubmit={async (values) => {
              try {
                await createMutation.mutateAsync(values);
              } catch {
                // Mutation error is handled by createMutation.error UI.
              }
            }}
            isSubmitting={createMutation.isPending}
          />
          {createMutation.error && <ErrorState message={getApiErrorMessage(createMutation.error)} />}
        </Card>
      </div>
    </ProtectedRoute>
  );
}
