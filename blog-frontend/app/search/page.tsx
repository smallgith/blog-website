"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { getApiErrorMessage } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ErrorState } from "@/components/ui/error-state";
import { PostCard } from "@/components/posts/post-card";
import { ProtectedRoute } from "@/components/protected-route";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const postsQuery = usePosts(1, term);

  return (
    <ProtectedRoute>
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Search Posts</h1>
          <p className="mt-1 text-sm text-slate-600">Find posts quickly by title keywords.</p>
          <Input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search by title..."
            className="mt-4"
          />
        </div>

        {postsQuery.isLoading && <Spinner />}
        {postsQuery.error && <ErrorState message={getApiErrorMessage(postsQuery.error)} />}

        {!postsQuery.isLoading && !postsQuery.error && postsQuery.data?.data.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No results for &quot;{term}&quot;.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {postsQuery.data?.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </ProtectedRoute>
  );
}
