"use client";

import { useState, useMemo } from "react";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
};

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 5,
  searchable = true,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // 🔍 Search
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // 🔄 Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortAsc]);

  // 📄 Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  // 🔽 Sort click
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 🔍 Search */}
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border rounded-xl dark:bg-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {/* 📊 Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key)}
                  className="p-3 text-left cursor-pointer"
                >
                  {col.label} 🔽
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-6">
                  No data found 😢
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="p-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}

                  {/* ⚡ Actions */}
                  <td className="p-3 flex gap-2">
                    <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-xs bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-zinc-500">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}