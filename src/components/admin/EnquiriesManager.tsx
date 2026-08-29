/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import { EmptyState, LoadingState, Notice, PageHeader, Pager, Pagination, requestApi, SearchBar } from "./AdminUI";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  selectedOption?: string;
  preferredSession?: string;
  preferredFormat?: string;
  message?: string;
  created_at?: string;
};
type Tab = "contacts" | "quotes";

export default function EnquiriesManager() {
  const [tab, setTab] = useState<Tab>("contacts"); const [items, setItems] = useState<Enquiry[]>([]); const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState(1); const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const query = new URLSearchParams({ page: String(page), limit: "20" }); if (search) query.set("search", search); const url = tab === "contacts" ? "/api/contact/getallcontact" : "/api/quick-quotes/getallquickquote"; const payload = await requestApi(`${url}?${query}`); setItems(payload.data?.data || []); setPagination(payload.data?.pagination); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to load enquiries."); } finally { setLoading(false); }
  }, [page, search, tab]);
  useEffect(() => { load(); }, [load]);
  function switchTab(next: Tab) { setTab(next); setPage(1); setSearch(""); }
  return <>
    <PageHeader eyebrow="Leads" title="Enquiries" description="Review contact requests and quick quote submissions. These APIs currently provide read-only administration." />
    <div className="admin-tabs"><button className={tab === "contacts" ? "active" : ""} onClick={() => switchTab("contacts")}>Contact enquiries</button><button className={tab === "quotes" ? "active" : ""} onClick={() => switchTab("quotes")}>Quick quotes</button></div>
    {error && <Notice>{error}</Notice>}
    <SearchBar value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Search name, email or topic" />
    {loading ? <LoadingState label="Loading enquiries…" /> : items.length === 0 ? <EmptyState title="No enquiries found" body={search ? "Try a different search." : "New submissions will appear here."} /> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Person</th><th>Session</th><th>Format</th><th>Message</th><th>Received</th><th>Contact</th></tr></thead><tbody>{items.map((item) => <tr key={item._id}><td><strong>{item.name}</strong><span>{item.email}</span>{item.phone && <span>{item.phone}</span>}</td><td>{item.preferredSession || item.selectedOption || "—"}</td><td>{item.preferredFormat || "—"}</td><td className="min-w-[260px]"><p className="line-clamp-3">{item.message || "No message provided"}</p></td><td>{item.created_at ? new Date(item.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"}</td><td><a className="admin-button-secondary inline-flex" href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.selectedOption || item.preferredSession || "Your enquiry to Adore Life"}`)}`}>Email</a></td></tr>)}</tbody></table></div>}
    <Pager value={pagination} onChange={setPage} />
  </>;
}
