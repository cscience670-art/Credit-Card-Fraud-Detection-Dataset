import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library System",
  description: "Modern Library Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white">
        {/* 🔥 Navbar */}
        <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">📚 Library</h1>

            <nav className="flex gap-6 text-sm">
              <Link href="/">Home</Link>
              <Link href="/books">Books</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
          </div>
        </header>

        {/* 🧱 Main Content */}
        <main className="min-h-[80vh]">{children}</main>

        {/* ⚡ Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500">
          © 2026 Library System — All rights reserved
        </footer>
      </body>
    </html>
  );
}