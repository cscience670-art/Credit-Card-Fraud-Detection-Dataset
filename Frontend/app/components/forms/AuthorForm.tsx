"use client";

import { useState, useEffect } from "react";

type Author = {
  id?: string;
  name: string;
  bio: string;
  country: string;
  birthDate: string;
};

type Props = {
  initialData?: Author;
  onSubmit: (data: Author) => Promise<void>;
};

export default function AuthorForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Author>({
    name: "",
    bio: "",
    country: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Load edit data
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  // ✍️ Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🧠 simple validation
    if (!form.name || !form.country) {
      setError("Name and Country are required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Edit Author ✏️" : "Create Author 📚"}
      </h2>

      {/* ❌ Error */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* 👤 Name */}
      <div>
        <label className="text-sm">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Author name"
        />
      </div>

      {/* 🌍 Country */}
      <div>
        <label className="text-sm">Country</label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="e.g. Algeria"
        />
      </div>

      {/* 📅 Birth Date */}
      <div>
        <label className="text-sm">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
      </div>

      {/* 📝 Bio */}
      <div>
        <label className="text-sm">Biography</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-3 border rounded h-32"
          placeholder="Short biography..."
        />
      </div>

      {/* 🚀 Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded hover:bg-zinc-800 transition"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Author"
          : "Create Author"}
      </button>
    </form>
  );
}