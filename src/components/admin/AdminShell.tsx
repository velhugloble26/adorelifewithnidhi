"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["/admin", "dashboard", "Overview"],
  ["/admin/bookings", "calendar_month", "Bookings"],
  ["/admin/blogs", "article", "Blogs"],
  ["/admin/gallery", "photo_library", "Gallery"],
  ["/admin/enquiries", "inbox", "Enquiries"],
  ["/admin/access", "admin_panel_settings", "Access control"],
] as const;

type User = { name?: string; email?: string; role?: string };

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        if (!active) return;
        const nextUser = payload?.data?.user;
        if (!nextUser || nextUser.role !== "admin") {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
        setUser(nextUser);
        setChecking(false);
      })
      .catch(() => router.replace(`/login?redirect=${encodeURIComponent(pathname)}`));
    return () => { active = false; };
  }, [pathname, router]);

  async function logout() {
    const refreshToken = localStorage.getItem("refreshToken") || "cookie-session";
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/login?redirect=/admin");
  }

  if (checking) {
    return <main className="min-h-screen grid place-items-center surface-base"><div className="admin-state">Checking administrator access…</div></main>;
  }

  return (
    <div className="min-h-screen surface-base lg:grid lg:grid-cols-[270px_1fr]">
      <header className="lg:hidden sticky top-0 z-40 glass-nav border-b border-surface px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="text-headline-md ui-heading">Adore Life Admin</Link>
        <button className="admin-icon-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle admin navigation">
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </header>

      <aside className={`${menuOpen ? "block" : "hidden"} lg:flex fixed lg:sticky inset-x-0 top-[65px] lg:top-0 z-30 h-[calc(100vh-65px)] lg:h-screen flex-col surface-lowest border-r border-surface p-5`}>
        <Link href="/" className="hidden lg:flex items-center gap-3 px-2 py-4" aria-label="Return to website">
          <img src="/website_logo.png" alt="Adore Life" className="h-12 w-auto" />
        </Link>
        <div className="hidden lg:block px-3 mb-5 text-label-md uppercase tracking-[0.18em] ui-muted">Admin workspace</div>
        <nav className="space-y-1" aria-label="Admin navigation">
          {links.map(([href, icon, label]) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`admin-nav-link ${active ? "admin-nav-link-active" : ""}`}>
                <span className="material-symbols-outlined">{icon}</span><span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-surface pt-5 px-2">
          <p className="font-medium ui-heading truncate">{user?.name || "Administrator"}</p>
          <p className="text-sm ui-muted truncate">{user?.email}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/" className="admin-button-secondary flex-1">View site</Link>
            <button onClick={logout} className="admin-icon-button" title="Sign out"><span className="material-symbols-outlined">logout</span></button>
          </div>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-10 xl:p-12">{children}</main>
    </div>
  );
}
