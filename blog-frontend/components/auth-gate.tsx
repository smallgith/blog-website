"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/navbar";
import { Spinner } from "@/components/ui/spinner";

const PUBLIC_ROUTES = ["/login", "/register"];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, isPublicRoute, router]);

  if (isLoading) return <Spinner />;
  if (!isAuthenticated && !isPublicRoute) return <Spinner />;
  if (isAuthenticated && isPublicRoute) return <Spinner />;

  return (
    <>
      {!isPublicRoute && <Navbar />}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">{children}</main>
    </>
  );
}
