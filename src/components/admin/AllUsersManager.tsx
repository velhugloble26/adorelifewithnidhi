"use client";

import { ADMIN_USER, ADMIN_USERS, GET_ALL_PERMISSIONS, GET_ALL_ROLES } from "@/utils/api";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyState, LoadingState, Modal, Notice, PageHeader, requestApi, SearchBar } from "./AdminUI";

type Permission = { _id: string; key: string; description?: string; module?: string };
type Role = { _id: string; user_type: string; description?: string; permissions?: Permission[] };
type UserStatus = "active" | "inactive" | "suspended";
type UserRecord = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: UserStatus;
  emailVerified?: boolean;
  created_at?: string;
  role?: Role | null;
  role_id?: string;
  permissions?: string[];
};

const STATUS_OPTIONS: UserStatus[] = ["active", "inactive", "suspended"];

export default function AllUsersManager() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({ page: "1", limit: "200" });
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);

      const [usersPayload, rolesPayload, permissionPayload] = await Promise.all([
        requestApi(`${ADMIN_USERS}?${params.toString()}`),
        requestApi(GET_ALL_ROLES),
        requestApi(GET_ALL_PERMISSIONS + "?page=1&limit=200"),
      ]);

      const nextUsers = Array.isArray(usersPayload.data)
        ? usersPayload.data
        : usersPayload.data?.data || [];
      setUsers(nextUsers);
      setRoles(Array.isArray(rolesPayload.data) ? rolesPayload.data : rolesPayload.data?.data || []);
      setPermissions(Array.isArray(permissionPayload.data) ? permissionPayload.data : permissionPayload.data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const hasUsers = users.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="All users"
        description="Review registered users, update their role or permission set, and maintain account status."
      />

      {success && <Notice kind="success">{success}</Notice>}
      {error && <Notice>{error}</Notice>}

      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email">
        <select
          className="admin-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </SearchBar>

      {loading ? (
        <LoadingState label="Loading users…" />
      ) : !hasUsers ? (
        <EmptyState title="No users found" body="No accounts match the current filter." />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email verification</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || "—"}</td>
                  <td>
                    <span className="admin-badge capitalize">{user.role?.user_type || "user"}</span>
                  </td>
                  <td>
                    <span className={`admin-badge ${user.status === "active" ? "bg-emerald-100 text-emerald-800" : user.status === "suspended" ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-700"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td><span className={`admin-badge ${user.emailVerified !== false ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{user.emailVerified !== false ? "Verified" : "Pending"}</span></td>
                  <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</td>
                  <td>
                    <button className="admin-button-secondary" onClick={() => setEditingUser(user)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingUser && (
        <UserEditor
          user={editingUser}
          roles={roles}
          permissions={permissions}
          onClose={() => setEditingUser(null)}
          onSaved={(message) => {
            setSuccess(message);
            setEditingUser(null);
            void load();
          }}
        />
      )}
    </>
  );
}

function UserEditor({
  user,
  roles,
  permissions,
  onClose,
  onSaved,
}: {
  user: UserRecord;
  roles: Role[];
  permissions: Permission[];
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(user.role_id || user.role?._id || roles[0]?._id || "");
  const [status, setStatus] = useState<UserStatus>(user.status || "active");
  const [phone, setPhone] = useState(user.phone || "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(user.permissions || []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const selectedRole = useMemo(
    () => roles.find((role) => role._id === selectedRoleId) || user.role || null,
    [roles, selectedRoleId, user.role]
  );

  useEffect(() => {
    if (!selectedRole) return;
    const permissionIds = selectedRole.permissions?.map((permission) => permission._id) || [];
    setSelectedPermissions(permissionIds);
  }, [selectedRole]);

  function togglePermission(permissionId: string) {
    setSelectedPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((value) => value !== permissionId)
        : [...current, permissionId]
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const payload = await requestApi(ADMIN_USER(user._id), {
        method: "PATCH",
        body: JSON.stringify({
          roleId: selectedRoleId,
          status,
          phone,
          permissions: selectedPermissions,
        }),
      });
      onSaved(payload.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update user.");
    } finally {
      setBusy(false);
    }
  }

  const groupedPermissions = useMemo(() => {
    return Object.groupBy(permissions, (permission) => permission.module || "Other");
  }, [permissions]);

  return (
    <Modal title={`Edit user · ${user.name}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-5">
        {error && <Notice>{error}</Notice>}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="admin-label">
            User name
            <input className="admin-field" value={user.name} disabled />
          </label>

          <label className="admin-label">
            Email
            <input className="admin-field" value={user.email} disabled />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="admin-label">
            Phone
            <input
              className="admin-field"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+91 98765 43210"
            />
          </label>

          <label className="admin-label">
            Status
            <select className="admin-field" value={status} onChange={(event) => setStatus(event.target.value as UserStatus)}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="admin-label">
          Role
          <select className="admin-field" value={selectedRoleId} onChange={(event) => setSelectedRoleId(event.target.value)}>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.user_type}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="admin-label mb-3">
            Permissions {selectedRole?.user_type === "admin" && <span className="normal-case font-normal ui-muted">(admins receive all permissions)</span>}
          </legend>

          <div className="space-y-4 max-h-72 overflow-auto border border-surface rounded-lg p-4">
            {selectedRole?.user_type === "admin" ? (
              <p className="ui-copy">This role has full access to all permissions.</p>
            ) : Object.entries(groupedPermissions).length === 0 ? (
              <p className="ui-copy">No permissions available.</p>
            ) : (
              Object.entries(groupedPermissions).map(([module, values]) => (
                <div key={module}>
                  <p className="text-xs uppercase tracking-[0.15em] ui-accent mb-2">{module}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {values?.map((permission) => (
                      <label className="admin-check" key={permission._id}>
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission._id)}
                          onChange={() => togglePermission(permission._id)}
                        />
                        <span>{permission.key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </fieldset>

        <div className="flex justify-end gap-3">
          <button type="button" className="admin-button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
