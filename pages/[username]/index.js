import { supabase } from "../../lib/supabaseClient";

export async function getServerSideProps({ params }) {
  const { username } = params;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !profile) {
    return { notFound: true };
  }

  return {
    props: { profile },
  };
}

export default function PortofolioPage({ profile }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div>
          <div className="text-lg font-bold">{profile.full_name}</div>
          <div className="text-sm">{profile.birth_place_date}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-blue-500 space-x-8 p-4">
        <div className="cursor-pointer">Portofolio</div>
        <div className="cursor-pointer">Collaboration</div>
      </div>

      {/* Content bisa ditambah di sini */}
    </div>
  );
}
