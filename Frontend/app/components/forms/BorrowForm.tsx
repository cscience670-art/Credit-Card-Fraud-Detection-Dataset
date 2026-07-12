"use client";

import { useState } from "react";

export type Borrow = {
  bookId: string;
  userId: string;
  dueDate: string;
};

export default function BorrowForm({
  onSubmit,
}: {
  onSubmit: (data: Borrow) => Promise<void>;
}) {
  const [form, setForm] = useState<Borrow>({
    bookId: "",
    userId: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

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
      <input name="bookId" value={form.bookId} onChange={handleChange} placeholder="Book ID" className="input" />
      <input name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" className="input" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="input" />

      <button className="btn" disabled={loading}>
        {loading ? "Creating..." : "Create Borrow"}
      </button>
    </form>
  );
}