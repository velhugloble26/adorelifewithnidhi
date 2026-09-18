"use client";

import { AUTH_ME, LOGOUT } from "@/utils/api";

import {
  CalendarDays,
  ClipboardList,
  FileText,
  House,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/bookings", icon: CalendarDays, label: "Bookings" },
  { href: "/admin/client-report", icon: ClipboardList, label: "Client Report" },
  { href: "/admin/blogs", icon: FileText, label: "Blogs" },
  { href: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
  { href: "/admin/enquiries", icon: Inbox, label: "Enquiries" },
  { href: "/admin/access", icon: ShieldCheck, label: "Access control" },
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
    fetch(AUTH_ME, { cache: "no-store" })
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
    await fetch(LOGOUT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).catch(() => null);
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
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <aside className={`${menuOpen ? "block" : "hidden"} lg:flex fixed lg:sticky inset-x-0 top-[65px] lg:top-0 z-30 h-[calc(100vh-65px)] lg:h-screen flex-col surface-lowest border-r border-surface p-5`}>
        <Link href="/" className="hidden lg:flex items-center gap-3 px-2 py-4" aria-label="Return to website">
          <House className="h-5 w-5" />
          <Image src="/website_logo.png" alt="Adore Life" width={1080} height={897} className="h-12 w-auto" />
        </Link>
        <div className="hidden lg:block px-3 mb-5 text-label-md uppercase tracking-[0.18em] ui-muted">Admin workspace</div>
        <nav className="space-y-1" aria-label="Admin navigation">
          {links.map(({ href, icon: Icon, label }) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`admin-nav-link ${active ? "admin-nav-link-active" : ""}`}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-surface pt-5 px-2">
          <p className="font-medium ui-heading truncate">{user?.name || "Administrator"}</p>
          <p className="text-sm ui-muted truncate">{user?.email}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/" className="admin-button-secondary flex-1">View site</Link>
            <button onClick={logout} className="admin-icon-button" title="Sign out"><LogOut size={18} /></button>
          </div>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-10 xl:p-12">{children}</main>
    </div>
  );
}
