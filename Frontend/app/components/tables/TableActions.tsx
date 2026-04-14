"use client";

import { useState } from "react";

type Action<T> = {
  label: string;
  onClick: (row: T) => Promise<void> | void;
  variant?: "primary" | "danger" | "secondary";
  confirm?: boolean;
};

type Props<T> = {
  row: T;
  actions: Action<T>[];
};

export default function TableActions<T>({ row, actions }: Props<T>) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleClick = async (action: Action<T>, index: number) => {
    if (action.confirm) {
      const confirmed = confirm("Are you sure?");
      if (!confirmed) return;
    }

    try {
      setLoadingIndex(index);
      await action.onClick(row);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoadingIndex(null);
    }
  };

  const getStyle = (variant?: string) => {
    switch (variant) {
      case "danger":
        return "bg-red-500 text-white hover:bg-red-600";
      case "secondary":
        return "bg-zinc-200 dark:bg-zinc-700";
      default:
        return "bg-blue-500 text-white hover:bg-blue-600";
    }
  };

  return (
    <div className="flex gap-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => handleClick(action, index)}
          disabled={loadingIndex === index}
          className={`px-3 py-1 text-xs rounded transition ${getStyle(
            action.variant
          )}`}
        >
          {loadingIndex === index ? "..." : action.label}
        </button>
      ))}
    </div>
  );
}