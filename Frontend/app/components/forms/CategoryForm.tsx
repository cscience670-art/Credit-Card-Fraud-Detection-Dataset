"use client";

import { useState, useEffect } from "react";

export type Category = {
  id?: string;
  name: string;
  description: string;
};

export default function CategoryForm({
  initialData,
  onSubmit,
}: {
  initialData?: Category;
  onSubmit: (data: Category) => Promise<void>;
}) {
  const [form, setForm] = useState<Category>({
    name: "",
    description: "",
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
      <input name="name" value={form.name} onChange={handleChange} placeholder="Category name" className="input" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />

      <button className="btn" disabled={loading}>
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
}