import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("user_id", user.id)
          .single();

        console.log("user.id:", user.id);
        console.log("profile:", profile);
        console.log("error:", error);

        if (profile) {
          setUsername(profile.username);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Halaman home</h1>
      {username && (
        <button
          onClick={() => router.push(`/${username}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lihat Portofolio
        </button>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
