"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { useState } from "react";

const registerSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: signup } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });
  const passwordValue = useWatch({ control, name: "password", defaultValue: "" });
  const passwordScore = Math.min(
    4,
    Number(passwordValue.length >= 6) +
      Number(/[A-Z]/.test(passwordValue)) +
      Number(/[0-9]/.test(passwordValue)) +
      Number(/[^A-Za-z0-9]/.test(passwordValue)),
  );
  const passwordLabel =
    passwordScore <= 1 ? "Weak" : passwordScore <= 2 ? "Fair" : passwordScore <= 3 ? "Good" : "Strong";

  const onSubmit = async (values: RegisterValues) => {
    setFormError(null);
    try {
      await signup(values);
      router.push("/login");
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-5xl items-center gap-6 md:grid-cols-2">
      <div className="hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-700 via-sky-600 to-indigo-700 p-8 text-white md:flex md:min-h-[560px] md:flex-col md:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">Join BlogCraft</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">Start writing for your audience.</h1>
        <p className="mt-4 text-sm text-sky-100">
          Create an account to publish posts and build your public profile.
        </p>
      </div>

      <Card className="rounded-3xl border-slate-200/80 p-6 md:flex md:min-h-[560px] md:flex-col md:justify-center md:p-8">
        <h1 className="mb-5 text-3xl font-bold text-slate-900">Create account</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
            <div className="relative">
              <User
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input className="pl-9" placeholder="Optional" {...register("fullName")} />
            </div>
          </div>
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
                placeholder="At least 6 characters"
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
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                <span>Password strength</span>
                <span>{passwordLabel}</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[0, 1, 2, 3].map((segment) => (
                  <div
                    key={segment}
                    className={`h-1.5 rounded-full ${
                      segment < passwordScore ? "bg-sky-600" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {formError && <ErrorState message={formError} />}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Register"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-sky-700">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
