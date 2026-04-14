import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white">
      {/* 🔥 Navbar */}
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">📚 Library System</h1>

          <nav className="flex gap-6 text-sm">
            <Link href="/books">Books</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Library <br /> Like a Pro 🚀
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            A powerful system to manage books, users, and borrowing operations
            بسهولة واحترافية.
          </p>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black"
            >
              Get Started
            </Link>

            <Link
              href="/books"
              className="px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700"
            >
              Browse Books
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/library.png"
            alt="Library"
            width={400}
            height={400}
            className="rounded-xl"
          />
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="bg-white dark:bg-zinc-900 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-zinc-500">Books</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">2K+</h3>
            <p className="text-zinc-500">Users</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">5K+</h3>
            <p className="text-zinc-500">Borrowed</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-zinc-500">Categories</p>
          </div>
        </div>
      </section>

      {/* 📚 Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border dark:border-zinc-800">
            <h3 className="text-xl font-semibold mb-2">📖 Book Management</h3>
            <p className="text-zinc-500">
              Add, edit, delete and organize books بسهولة.
            </p>
          </div>

          <div className="p-6 rounded-2xl border dark:border-zinc-800">
            <h3 className="text-xl font-semibold mb-2">👥 User System</h3>
            <p className="text-zinc-500">
              Manage admins, librarians and readers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border dark:border-zinc-800">
            <h3 className="text-xl font-semibold mb-2">🔄 Borrow System</h3>
            <p className="text-zinc-500">
              Track borrowing, returns and late books.
            </p>
          </div>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to build your library system?
        </h2>

        <Link
          href="/dashboard"
          className="px-6 py-3 bg-white text-black rounded-xl"
        >
          Go to Dashboard
        </Link>
      </section>

      {/* ⚡ Footer */}
      <footer className="py-6 text-center text-zinc-500 text-sm">
        © 2026 Library System — Built with Next.js 🚀
      </footer>
    </div>
  );
}