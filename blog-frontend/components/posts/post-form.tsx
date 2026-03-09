"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  coverImageFile: z.any().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>;
  existingImageName?: string | null;
  submitText: string;
  onSubmit: (values: { title: string; content: string; coverImageFile?: File | null }) => Promise<void>;
  isSubmitting?: boolean;
}

export function PostForm({
  defaultValues,
  existingImageName,
  submitText,
  onSubmit,
  isSubmitting,
}: PostFormProps) {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
    },
  });
  const coverImageRegister = register("coverImageFile");

  const submitHandler = async (values: PostFormValues) => {
    const fileList = values.coverImageFile as FileList | undefined;
    await onSubmit({
      title: values.title,
      content: values.content,
      coverImageFile: fileList?.[0] ?? null,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <Input id="title" {...register("title")} placeholder="Post title" />
        {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium text-slate-700">
          Content
        </label>
        <Textarea
          id="content"
          rows={12}
          {...register("content")}
          placeholder="Write your post with clear sections, examples, and practical details..."
        />
        {errors.content && <p className="mt-1 text-xs text-rose-600">{errors.content.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Cover image
        </label>
        <input
          id="coverImageFile"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          {...coverImageRegister}
          ref={(element) => {
            coverImageRegister.ref(element);
            fileInputRef.current = element;
          }}
          onChange={(event) => {
            coverImageRegister.onChange(event);
            const file = event.target.files?.[0];
            setSelectedFileName(file?.name ?? null);
          }}
        />
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus size={15} className="mr-1.5" />
              Choose File
            </Button>
            <p className="text-xs text-slate-500">PNG/JPG only, max 2MB</p>
          </div>
          {selectedFileName && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200">
              <span className="max-w-[240px] truncate">{selectedFileName}</span>
              <button
                type="button"
                className="text-slate-500 transition hover:text-slate-800"
                onClick={() => {
                  setSelectedFileName(null);
                  setValue("coverImageFile", undefined);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                aria-label="Remove selected file"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
        {existingImageName && (
          <p className="mt-1 text-xs text-slate-500">Current image: {existingImageName}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitText}
      </Button>
    </form>
  );
}
