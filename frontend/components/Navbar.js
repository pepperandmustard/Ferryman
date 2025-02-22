// frontend/components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Ferry Booking</h1>
        <div className="space-x-4">
          <Link href="/">
            <a className="hover:underline">Home</a>
          </Link>
          <Link href="/booking">
            <a className="hover:underline">Book a Ferry</a>
          </Link>
          <Link href="/dashboard">
            <a className="hover:underline">Dashboard</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
