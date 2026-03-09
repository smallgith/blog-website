"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/protected-route";
import { PostCard } from "@/components/posts/post-card";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { bookmarksApi, getApiErrorMessage } from "@/lib/api";

export default function BookmarksPage() {
  const [page, setPage] = useState(1);
  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks", page],
    queryFn: () => bookmarksApi.list(page),
  });

  return (
    <ProtectedRoute>
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Bookmarked Posts</h1>

        {bookmarksQuery.isLoading && <Spinner />}
        {bookmarksQuery.error && <ErrorState message={getApiErrorMessage(bookmarksQuery.error)} />}

        {!bookmarksQuery.isLoading && !bookmarksQuery.error && bookmarksQuery.data?.data.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            No bookmarks yet.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bookmarksQuery.data?.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {bookmarksQuery.data && (
          <Pagination
            page={bookmarksQuery.data.meta.currentPage}
            totalPages={bookmarksQuery.data.meta.lastPage}
            onPageChange={setPage}
          />
        )}
      </section>
    </ProtectedRoute>
  );
}
