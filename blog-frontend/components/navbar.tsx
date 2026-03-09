"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    setIsMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <Logo />

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900",
                  pathname === link.href && "bg-slate-900 text-white ",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <>
                <Link href="/create-post">
                  <Button>Create Post</Button>
                </Link>
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </div>

        {isMobileOpen && (
          <div className="mb-4 space-y-2 rounded-2xl border border-slate-200 bg-white p-3 md:hidden">
            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100",
                    pathname === link.href && "bg-slate-100 text-slate-900",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {isAuthenticated ? (
                <>
                  <Link href="/create-post" onClick={() => setIsMobileOpen(false)}>
                    <Button className="w-full">Create</Button>
                  </Link>
                  <Button variant="secondary" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
