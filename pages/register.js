// pages/register.js
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthPlaceDate, setBirthPlaceDate] = useState("");
  const [error, setError] = useState("");

  async function generateUniqueUsername(baseUsername) {
    let usernameToTry = baseUsername;
    let exists = true;

    while (exists) {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", usernameToTry)
        .single();

      if (error || !data) {
        exists = false;
      } else {
        const randomStr = Math.random().toString(36).substring(2, 7);
        usernameToTry = `${baseUsername}-${randomStr}`;
      }
    }

    return usernameToTry;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
    setError("Gagal mendapatkan UID dari Supabase.");
    return;
  }

    // generate username unik
    const uniqueUsername = await generateUniqueUsername(username);

    // Insert ke table profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        username: uniqueUsername,
        full_name: fullName,
        birth_place_date: birthPlaceDate,
      },
    ]);

    if (profileError) {
      setError(profileError.message);
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
        <input
          type="text"
          placeholder="Nama Pengguna"
          className="border px-4 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="border px-4 py-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tempat Tanggal Lahir"
          className="border px-4 py-2 rounded"
          value={birthPlaceDate}
          onChange={(e) => setBirthPlaceDate(e.target.value)}
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
