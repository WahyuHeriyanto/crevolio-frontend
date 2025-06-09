// pages/home.js
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // logout dari Supabase
    router.push("/"); // balik ke halaman utama
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Halaman home dulu</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
