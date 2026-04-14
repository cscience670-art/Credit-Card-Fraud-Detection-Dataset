"use client";

import React from "react";

type SortDirection = "asc" | "desc" | null;

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  className?: string;
  renderHeader?: () => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  sortKey?: keyof T | null;
  sortDirection?: SortDirection;
  onSort?: (key: keyof T) => void;
  selectable?: boolean;
  allSelected?: boolean;
  onSelectAll?: (checked: boolean) => void;
};

export default function TableHeader<T>({
  columns,
  sortKey,
  sortDirection,
  onSort,
  selectable = false,
  allSelected = false,
  onSelectAll,
}: Props<T>) {
  const getSortIcon = (colKey: keyof T) => {
    if (sortKey !== colKey) return "↕";
    if (sortDirection === "asc") return "↑";
    if (sortDirection === "desc") return "↓";
    return "↕";
  };

  const getAriaSort = (colKey: keyof T) => {
    if (sortKey !== colKey) return "none";
    return sortDirection === "asc"
      ? "ascending"
      : sortDirection === "desc"
      ? "descending"
      : "none";
  };

  return (
    <thead className="sticky top-0 z-10 bg-zinc-100 dark:bg-zinc-800 backdrop-blur">
      <tr>
        {/* ✅ Select All */}
        {selectable && (
          <th className="p-3 w-[40px]">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll?.(e.target.checked)}
            />
          </th>
        )}

        {/* 📊 Columns */}
        {columns.map((col) => (
          <th
            key={String(col.key)}
            className={`p-3 text-left text-sm font-semibold cursor-pointer select-none ${
              col.className || ""
            }`}
            onClick={() => col.sortable && onSort?.(col.key)}
            aria-sort={getAriaSort(col.key)}
          >
            <div className="flex items-center gap-2">
              {/* 🧠 Custom Header */}
              {col.renderHeader ? col.renderHeader() : col.label}

              {/* 🔽 Sort Icon */}
              {col.sortable && (
                <span className="text-xs text-zinc-500">
                  {getSortIcon(col.key)}
                </span>
              )}
            </div>
          </th>
        ))}

        {/* ⚡ Actions column */}
        <th className="p-3 text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}