"use client";

import { useState } from "react";

type Variant =
  | "text"
  | "number"
  | "date"
  | "badge"
  | "status"
  | "custom";

type Props<T> = {
  value?: any;
  row?: T;
  variant?: Variant;
  render?: (value: any, row?: T) => React.ReactNode;
  truncate?: boolean;
  copyable?: boolean;
  loading?: boolean;
};

export default function TableCell<T>({
  value,
  row,
  variant = "text",
  render,
  truncate = false,
  copyable = false,
  loading = false,
}: Props<T>) {
  const [copied, setCopied] = useState(false);

  // 📋 Copy
  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  // 🎨 Status colors
  const getStatusStyle = (val: string) => {
    switch (val) {
      case "available":
        return "bg-green-100 text-green-700";
      case "borrowed":
        return "bg-blue-100 text-blue-700";
      case "late":
        return "bg-red-100 text-red-700";
      case "reserved":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-zinc-200 text-zinc-700";
    }
  };

  // ⏳ Loading
  if (loading) {
    return (
      <td className="p-3">
        <div className="h-4 w-20 bg-zinc-200 animate-pulse rounded" />
      </td>
    );
  }

  let content: React.ReactNode;

  // 🧠 Render logic
  if (render) {
    content = render(value, row);
  } else {
    switch (variant) {
      case "date":
        content = new Date(value).toLocaleDateString();
        break;

      case "number":
        content = Number(value).toLocaleString();
        break;

      case "badge":
        content = (
          <span className="px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-700">
            {value}
          </span>
        );
        break;

      case "status":
        content = (
          <span
            className={`px-2 py-1 text-xs rounded ${getStatusStyle(value)}`}
          >
            {value}
          </span>
        );
        break;

      default:
        content = String(value);
    }
  }

  return (
    <td className="p-3 align-middle">
      <div className="flex items-center gap-2">
        {/* ✂️ Truncate */}
        <span
          className={`${
            truncate ? "truncate max-w-[150px]" : ""
          }`}
          title={truncate ? String(value) : ""}
        >
          {content}
        </span>

        {/* 📋 Copy */}
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-400 hover:text-black dark:hover:text-white"
          >
            {copied ? "✓" : "📋"}
          </button>
        )}
      </div>
    </td>
  );
}