"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { getApiErrorMessage } from "@/lib/api";
import { PostCard } from "@/components/posts/post-card";
import { Spinner } from "@/components/ui/spinner";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { ProtectedRoute } from "@/components/protected-route";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePosts(page);

  return (
    <ProtectedRoute>
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Latest Posts</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">Stories from the community</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Read recent posts, discover fresh ideas, and jump into active discussions from your
            network.
          </p>
        </div>

        {isLoading && <Spinner />}
        {error && <ErrorState message={getApiErrorMessage(error)} />}

        {!isLoading && !error && data?.data.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No posts yet. Create the first one from the Create Post button.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data?.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {data && (
          <Pagination
            page={data.meta.currentPage}
            totalPages={data.meta.lastPage}
            onPageChange={setPage}
          />
        )}
      </section>
    </ProtectedRoute>
  );
}
