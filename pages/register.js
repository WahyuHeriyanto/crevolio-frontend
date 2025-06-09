// pages/register.js
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Berhasil daftar! Silakan login.");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Register
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <p className="mt-4 text-sm">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
