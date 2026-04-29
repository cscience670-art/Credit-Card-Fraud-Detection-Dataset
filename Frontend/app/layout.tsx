
import "./globals.css";

export const metadata = {
  title: "Fraud Detection AI System",
  description: "AI-powered banking fraud detection dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {/* Top Navbar */}
        <nav className="w-full px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <div className="font-bold text-xl">💸 Fraud AI</div>
          <div className="flex gap-4 text-sm text-gray-300">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/transactions" className="hover:text-white">Transactions</a>
            <a href="/dashboard" className="hover:text-white">Dashboard</a>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6">{children}</main>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
          © {new Date().getFullYear()} Fraud Detection AI System
        </footer>
      </body>
    </html>
  );
}
