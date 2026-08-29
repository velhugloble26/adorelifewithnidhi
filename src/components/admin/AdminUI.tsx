/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

export type Pagination = { page: number; limit: number; total: number; totalPages: number };

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-label-md uppercase tracking-[0.18em] ui-accent">{eyebrow}</p><h1 className="text-display-lg ui-heading mt-1">{title}</h1>{description && <p className="mt-2 max-w-2xl ui-copy">{description}</p>}</div>{action}</div>;
}

export function Notice({ kind = "error", children }: { kind?: "error" | "success"; children: ReactNode }) {
  return <div role="status" className={`admin-notice ${kind === "success" ? "admin-notice-success" : "admin-notice-error"}`}>{children}</div>;
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return <div className="admin-state"><span className="material-symbols-outlined animate-spin">progress_activity</span><span>{label}</span></div>;
}

export function EmptyState({ icon = "inbox", title, body }: { icon?: string; title: string; body: string }) {
  return <div className="admin-state"><span className="material-symbols-outlined text-4xl ui-accent">{icon}</span><h2 className="text-headline-md ui-heading">{title}</h2><p className="ui-copy">{body}</p></div>;
}

export function Pager({ value, onChange }: { value?: Pagination; onChange: (page: number) => void }) {
  if (!value || value.totalPages <= 1) return null;
  return <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm ui-copy"><span>Page {value.page} of {value.totalPages} · {value.total} results</span><div className="flex gap-2"><button className="admin-button-secondary" disabled={value.page <= 1} onClick={() => onChange(value.page - 1)}>Previous</button><button className="admin-button-secondary" disabled={value.page >= value.totalPages} onClick={() => onChange(value.page + 1)}>Next</button></div></div>;
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  useEffect(() => { const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose(); window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [onClose]);
  return <div className="fixed inset-0 z-50 bg-[#001e2d]/45 p-3 sm:p-6 grid place-items-center" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section role="dialog" aria-modal="true" aria-label={title} className="surface-lowest w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl shadow-xl border border-surface"><header className="sticky top-0 surface-lowest z-10 flex items-center justify-between border-b border-surface p-5"><h2 className="text-headline-md ui-heading">{title}</h2><button className="admin-icon-button" onClick={onClose} aria-label="Close"><span className="material-symbols-outlined">close</span></button></header><div className="p-5 sm:p-6">{children}</div></section></div>;
}

export function SearchBar({ value, onChange, placeholder = "Search", children }: { value: string; onChange: (value: string) => void; placeholder?: string; children?: ReactNode }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  function submit(event: FormEvent) { event.preventDefault(); onChange(draft.trim()); }
  return <form onSubmit={submit} className="admin-toolbar"><label className="admin-search"><span className="material-symbols-outlined">search</span><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>{children}<button className="admin-button-secondary" type="submit">Search</button>{value && <button className="admin-button-quiet" type="button" onClick={() => { setDraft(""); onChange(""); }}>Clear</button>}</form>;
}

export async function requestApi(url: string, init: RequestInit = {}) {
  const response = await fetch(url, { cache: "no-store", ...init, headers: init.body instanceof FormData ? init.headers : { "Content-Type": "application/json", ...init.headers } });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    const errors = payload?.errors;
    const detail = Array.isArray(errors) ? errors.join(" ") : errors && typeof errors === "object" ? Object.values(errors).join(" ") : errors;
    throw new Error(detail || payload?.message || `Request failed (${response.status}).`);
  }
  return payload;
}

export const fieldClass = "admin-field";
