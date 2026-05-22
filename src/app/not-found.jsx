// src/app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white">
      <h1 className="text-7xl font-bold text-purple-400">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-purple-200 mt-3 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-full font-medium transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
