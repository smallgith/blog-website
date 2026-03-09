"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { PostCard } from "@/components/posts/post-card";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useUserPosts } from "@/hooks/usePosts";
import { getApiErrorMessage } from "@/lib/api";

export default function ProfilePage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const postsQuery = useUserPosts(user?.id, page);

  return (
    <ProtectedRoute>
      <section className="space-y-8">
        <Card className="space-y-2 rounded-3xl bg-gradient-to-r from-slate-900 to-sky-800 p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">Profile</p>
          <h1 className="text-3xl font-bold">{user?.fullName ?? "User"}</h1>
          <p className="text-sm text-slate-100">{user?.email}</p>
        </Card>

        {/* <div>
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Your Posts</h2>
          {postsQuery.isLoading && <Spinner />}
          {postsQuery.error && <ErrorState message={getApiErrorMessage(postsQuery.error)} />}

          {!postsQuery.isLoading && !postsQuery.error && postsQuery.data?.data.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
              You do not have posts yet. Start with Create Post.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {postsQuery.data?.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {postsQuery.data && (
            <Pagination
              page={postsQuery.data.meta.currentPage}
              totalPages={postsQuery.data.meta.lastPage}
              onPageChange={setPage}
            />
          )}
        </div> */}
      </section>
    </ProtectedRoute>
  );
}
