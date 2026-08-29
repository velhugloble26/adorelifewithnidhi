"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingState, Notice, PageHeader, requestApi } from "./AdminUI";

const sources = [
  ["Bookings", "/api/admin/bookings?limit=1", "/admin/bookings", "calendar_month"],
  ["Blogs", "/api/blog/getallblog?limit=1", "/admin/blogs", "article"],
  ["Gallery items", "/api/gallery/getallgallery?limit=1", "/admin/gallery", "photo_library"],
  ["Contact enquiries", "/api/contact/getallcontact?limit=1", "/admin/enquiries", "mail"],
  ["Quick quotes", "/api/quick-quotes/getallquickquote?limit=1", "/admin/enquiries", "request_quote"],
] as const;

export default function AdminOverview() {
  const [stats, setStats] = useState<Record<string, number>>({}); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { Promise.all(sources.map(async ([label, url]) => { const payload = await requestApi(url); return [label, payload.data?.pagination?.total || 0] as const; })).then((values) => setStats(Object.fromEntries(values))).catch((err) => setError(err instanceof Error ? err.message : "Unable to load the overview.")).finally(() => setLoading(false)); }, []);
  return <><PageHeader eyebrow="Admin workspace" title="Overview" description="A concise view of the records managed by the application’s existing API routes." />{error && <Notice>{error}</Notice>}{loading ? <LoadingState label="Loading overview…" /> : <><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{sources.map(([label, , href, icon]) => <Link href={href} className="admin-card p-5 transition hover:-translate-y-0.5 hover:shadow-md" key={label}><span className="material-symbols-outlined ui-accent">{icon}</span><p className="mt-4 text-3xl font-semibold ui-heading">{stats[label] || 0}</p><p className="mt-1 text-sm ui-copy">{label}</p></Link>)}</section><section className="admin-card mt-7 p-6"><h2 className="text-headline-md ui-heading">Quick actions</h2><p className="mt-1 ui-copy">Common administration tasks.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Link className="admin-action-card" href="/admin/bookings"><span className="material-symbols-outlined">event_available</span>Manage bookings</Link><Link className="admin-action-card" href="/admin/blogs"><span className="material-symbols-outlined">post_add</span>Publish a blog</Link><Link className="admin-action-card" href="/admin/gallery"><span className="material-symbols-outlined">add_photo_alternate</span>Add gallery item</Link><Link className="admin-action-card" href="/admin/enquiries"><span className="material-symbols-outlined">mark_email_unread</span>Review enquiries</Link></div></section></>}</>;
}
