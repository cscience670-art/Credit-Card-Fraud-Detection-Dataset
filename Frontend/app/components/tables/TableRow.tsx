"use client";

import React, { useState } from "react";

type Props<T> = {
  row: T;
  children: React.ReactNode;

  // 🔘 selection
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (row: T, checked: boolean) => void;

  // 🖱️ click row
  onClick?: (row: T) => void;

  // ⏳ loading
  loading?: boolean;

  // 🚫 disable row
  disabled?: boolean;

  // 📦 expandable row
  expandable?: boolean;
  expandedContent?: React.ReactNode;
};

export default function TableRow<T>({
  row,
  children,
  selectable = false,
  selected = false,
  onSelect,
  onClick,
  loading = false,
  disabled = false,
  expandable = false,
  expandedContent,
}: Props<T>) {
  const [expanded, setExpanded] = useState(false);

  const handleRowClick = () => {
    if (disabled || loading) return;
    onClick?.(row);
  };

  return (
    <>
      {/* 📊 Main Row */}
      <tr
        className={`
          border-t transition
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"}
        `}
        onClick={handleRowClick}
      >
        {/* 🔘 Checkbox */}
        {selectable && (
          <td className="p-3 w-[40px]" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => onSelect?.(row, e.target.checked)}
            />
          </td>
        )}

        {/* ⏳ Loading skeleton */}
        {loading ? (
          <td colSpan={99} className="p-4">
            <div className="h-4 w-full bg-zinc-200 animate-pulse rounded" />
          </td>
        ) : (
          children
        )}

        {/* 📦 Expand button */}
        {expandable && (
          <td
            className="p-3 text-center w-[40px]"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            <button className="text-xs text-zinc-500 hover:text-black dark:hover:text-white">
              {expanded ? "▲" : "▼"}
            </button>
          </td>
        )}
      </tr>

      {/* 📦 Expanded Row */}
      {expandable && expanded && (
        <tr>
          <td colSpan={99} className="p-4 bg-zinc-50 dark:bg-zinc-900">
            {expandedContent}
          </td>
        </tr>
      )}
    </>
  );
}