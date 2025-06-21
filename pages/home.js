import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername(null);
    router.push("/");
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const { data: profile} = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUsername(profile.username);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 relative">
      {/* Nama pengguna di kanan atas */}
      <div className="absolute top-4 right-4 text-sm font-medium">
        {username ? `Login sebagai ${username}` : "Belum login"}
      </div>

      <h1 className="text-3xl font-bold">Halaman Home</h1>

      {/* Tampilkan tombol portofolio jika login */}
      {username && (
        <button
          onClick={() => router.push(`/${username}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lihat Portofolio
        </button>
      )}

      {/* Tombol login / logout sesuai status */}
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLoginRedirect}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
      )}
    </div>
  );
}
