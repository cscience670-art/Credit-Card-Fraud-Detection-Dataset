"use client";

import { useState, useEffect } from "react";

export type User = {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "librarian" | "member";
};

export default function UserForm({
  initialData,
  onSubmit,
}: {
  initialData?: User;
  onSubmit: (data: User) => Promise<void>;
}) {
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />

      <select name="role" value={form.role} onChange={handleChange} className="input">
        <option value="admin">Admin</option>
        <option value="librarian">Librarian</option>
        <option value="member">Member</option>
      </select>

      <button className="btn" disabled={loading}>
        {loading ? "Saving..." : "Save User"}
      </button>
    </form>
  );
}