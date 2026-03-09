"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    try {
      await login(values);
      router.push("/");
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-5xl items-center gap-6 md:grid-cols-2">
      <div className="hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 text-white md:flex md:min-h-[560px] md:flex-col md:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Welcome back</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">Write and share your next idea.</h1>
        <p className="mt-4 text-sm text-slate-200">
          Sign in to publish posts, like stories, and connect with your readers.
        </p>
      </div>

      <Card className="rounded-3xl border-slate-200/80 p-6 md:flex md:min-h-[560px] md:flex-col md:justify-center md:p-8">
        <h1 className="mb-5 text-3xl font-bold text-slate-900">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input className="pl-9" placeholder="you@example.com" {...register("email")} />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                type={showPassword ? "text" : "password"}
                className="pl-9 pr-10"
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>
            )}
          </div>

          {formError && <ErrorState message={formError} />}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          No account?{" "}
          <Link href="/register" className="font-semibold text-sky-700">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
