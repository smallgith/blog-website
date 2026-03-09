"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { commentsApi, getApiErrorMessage } from "@/lib/api";
import type { Comment } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ErrorState } from "@/components/ui/error-state";
import { Card } from "@/components/ui/card";

const commentSchema = z.object({
  content: z.string().min(2, "Comment must be at least 2 characters"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentsSectionProps {
  postId: number;
  comments: Comment[];
}

export function CommentsSection({ postId, comments }: CommentsSectionProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const createMutation = useMutation({
    mutationFn: (values: CommentFormValues) => commentsApi.create(postId, values),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-5">
      <h2 className="text-lg font-semibold text-slate-900">Comments</h2>

      <form onSubmit={handleSubmit((values) => createMutation.mutate(values))} className="space-y-2">
        <Textarea rows={4} placeholder="Add your comment..." {...register("content")} />
        {errors.content && <p className="text-xs text-rose-600">{errors.content.message}</p>}
        <Button type="submit" disabled={createMutation.isPending} size="sm">
          {createMutation.isPending ? "Posting..." : "Add Comment"}
        </Button>
      </form>

      {createMutation.error && <ErrorState message={getApiErrorMessage(createMutation.error)} />}

      <div className="space-y-3">
        {comments.length === 0 && <p className="text-sm text-slate-500">No comments yet.</p>}
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {comment.user?.fullName ?? comment.user?.email ?? "User"}
                </p>
                <p className="mt-1 text-sm text-slate-600">{comment.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Note: comment delete is not available yet in current backend routes.
      </p>
    </section>
  );
}
