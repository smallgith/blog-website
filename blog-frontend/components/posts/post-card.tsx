import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/types/post";
import { Card } from "@/components/ui/card";
import { getCoverImageUrl } from "@/lib/api";

export function PostCard({ post }: { post: Post }) {
  const coverImage = getCoverImageUrl(post);

  return (
    <Card className="group h-full border-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {coverImage && (
        <img
          src={coverImage}
          alt={post.title}
          className="mb-4 h-48 w-full rounded-xl object-cover"
          loading="lazy"
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src.includes("/uploadsF/")) {
              target.src = target.src.replace("/uploadsF/", "/uploads/");
            }
          }}
        />
      )}
      <p className="mb-2 text-xs font-medium text-slate-500">
        {post.createdAt
          ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
          : "Recently"}
      </p>
      <Link
        href={`/post/${post.slug}`}
        className="mb-2 block text-xl font-semibold text-slate-900 transition group-hover:text-sky-700"
      >
        {post.title}
      </Link>
      <p className="line-clamp-4 text-sm leading-6 text-slate-600">{post.content}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span>{post.user?.fullName ?? post.user?.email ?? "Unknown author"}</span>
        <span>{post.likes?.length ?? 0} likes</span>
      </div>
    </Card>
  );
}
