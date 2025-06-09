// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-black text-white">
        <div className="text-xl font-bold">Logo Crevolio</div>
        <nav className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/explore" className="hover:underline">
            Explore
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 py-16 bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Tulisan Crevolio</h1>
        <p className="text-xl mb-8">Tagline</p>
        <Link
          href="/login"
          className="px-8 py-3 bg-white text-black font-semibold rounded shadow hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </main>

      {/* Fitur Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-8 py-16 space-y-8 md:space-y-0 md:space-x-12">
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-lg font-semibold">
          Gambar
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Fitur Crevolio</h2>
          <p className="text-gray-600">Deskripsi fitur</p>
        </div>
      </section>
    </div>
  );
}
