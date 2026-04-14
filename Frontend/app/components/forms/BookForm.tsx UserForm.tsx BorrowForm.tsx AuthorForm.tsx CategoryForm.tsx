"use client";

import { useState, useEffect } from "react";

export type Book = {
  id?: string;
  title: string;
  authorId: string;
  categoryId: string;
  publisher: string;
  isbn: string;
  status: "available" | "borrowed";
};

export default function BookForm({
  initialData,
  onSubmit,
}: {
  initialData?: Book;
  onSubmit: (data: Book) => Promise<void>;
}) {
  const [form, setForm] = useState<Book>({
    title: "",
    authorId: "",
    categoryId: "",
    publisher: "",
    isbn: "",
    status: "available",
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
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
      <input name="authorId" value={form.authorId} onChange={handleChange} placeholder="Author ID" className="input" />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" className="input" />
      <input name="publisher" value={form.publisher} onChange={handleChange} placeholder="Publisher" className="input" />
      <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" className="input" />

      <select name="status" value={form.status} onChange={handleChange} className="input">
        <option value="available">Available</option>
        <option value="borrowed">Borrowed</option>
      </select>

      <button className="btn" disabled={loading}>
        {loading ? "Saving..." : "Save Book"}
      </button>
    </form>
  );
}