import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { FiPlus, FiFilter } from "react-icons/fi";
import { useRouter } from "next/router";
import AddProjectModal from "../../components/AddProjectModal";


const AVAILABLE_FILTERS = [
  "Design",
  "UI/UX",
  "Ilustrator",
  "Mobile App",
  "Web",
  "Desktop",
  "AI"
];

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
  const [activeTab, setActiveTab] = useState("portofolio");
  const [cvOpen, setCvOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isOwner = currentUser?.id === profile.id;
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };
  getUser();
    fetchProjects();
  }, [filters]);

  async function fetchProjects() {
    const { data } = await supabase
      .from("portfolios")
      .select("*")
      .contains("content_type", filters)
      .eq("user_id", profile.id)
    setProjects(data || []);
      console.log("Filters:", filters);
      console.log("Profile ID:", profile.id);
      console.log("Fetched data:", data);
  }

  function toggleFilter(f) {
    if (filters.includes(f)) {
      setFilters(filters.filter(x => x !== f));
    } else if (filters.length < 3) {
      setFilters([...filters, f]);
    }
  }




  return (
    <>
      {/* Modal pop-up ini ditaruh di sini */}
      {showModal && (
        <AddProjectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          username={profile.username}
          onSaved={() => fetchProjects()}
          id={profile.id} 
        /> 
      )}
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      {/* Header */}
    <div
      className="text-white px-8 pt-6 pb-4 px-8 flex flex-col"
      style={{
        backgroundColor: profile.background_url ? undefined : "black",
        backgroundImage: profile.background_url ? `url(${profile.background_url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-6">
          <div className="w-36 h-36 bg-gray-300 rounded-full overflow-hidden">
            {profile.photo_url && (
              <img
                src={profile.photo_url}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            )}
          </div>
      <div>
        <div className="text-2xl font-semibold">{profile.full_name}</div>
        <div className="mt-1 text-sm">{profile.email}</div>
        <div className="mt-1 text-sm">{profile.description}</div>

        <div className="relative inline-block">
          <button
            onClick={() => setCvOpen(!cvOpen)}
            className="mt-4 px-3 py-1 bg-gray-300 text-sm text-black rounded"
          >
            Curriculum Vitae
          </button>

          {cvOpen && profile.cv_url && (
            <div className="absolute mt-2 bg-white border rounded text-black shadow w-40 z-10">
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Lihat CV
              </a>
              <a
                href={profile.cv_url}
                download
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Download CV
              </a>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Tombol panjang di kanan atas */}
    <div className="w-48 h-10 bg-gray-300 rounded-full"></div>
  </div>

      {/* Ikon sosial */}
      <div className="mt-6 flex space-x-4 justify-end">
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:opacity-80 transition"
          >
            <FaLinkedinIn className="text-black text-lg" />
          </a>
        )}
        {profile.instagram && (
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:opacity-80 transition"
          >
            <FaInstagram className="text-black text-lg" />
          </a>
        )}
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:opacity-80 transition"
          >
            <FaGithub className="text-black text-lg" />
          </a>
        )}
      </div>
    </div>
      {/* Tab Portofolio */}
      <div className="flex justify-center border-b border-gray-300">
        <div
          onClick={() => setActiveTab("portofolio")}
          className={`px-6 py-3 cursor-pointer text-lg ${
            activeTab === "portofolio" ? "border-b-2 border-black font-semibold" : ""
          }`}
        >
          Portofolio
        </div>
        <div
          onClick={() => setActiveTab("collaboration")}
          className={`px-6 py-3 cursor-pointer text-lg ${
            activeTab === "collaboration" ? "border-b-2 border-black font-semibold" : ""
          }`}
        >
          Collaboration
        </div>
      </div>

      {/* Tab Portofolio */}
      {activeTab === "portofolio" && (
      <>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-2 border rounded flex items-center space-x-2"
            >
              <FiFilter />
              <span>Filter</span>
            </button>
            {showFilterMenu && (
              <div className="absolute z-10 bg-white border shadow mt-2 rounded p-2 w-40">
                {["Semua", ...AVAILABLE_FILTERS].map((f) => (
                  <label key={f} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={f === "Semua" ? filters.length === 0 : filters.includes(f)}
                      onChange={() =>
                        f === "Semua" ? setFilters([]) : toggleFilter(f)
                      }
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Buat Baru */}
          {isOwner && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gray-300 text-black rounded-full flex items-center space-x-2"
            >
              <span>Buat Baru</span>
              <FiPlus />
            </button>
          )}
        </div>

        {/* Filter aktif */}
        <div className="flex flex-wrap gap-2 p-4">
          {filters.map((f) => (
            <div
              key={f}
              className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm"
            >
              {f}
            </div>
          ))}
        </div>

        {/* Konten Portofolio */}
        <div className="grid grid-cols-1 gap-4 p-4">
          {projects.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-4 rounded-lg shadow flex"
            >
              {/* Thumbnail */}
              <div className="w-40 h-32 bg-white border mr-4">
                {item.thumbnail_url && (
                  <img
                    src={item.thumbnail_url}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-lg font-semibold">{item.title}</div>
                  {isOwner && <button className="text-sm">✏️</button>}
                </div>
                <div className="text-sm text-gray-600">
                  Dibuat {new Date(item.created_at).toLocaleDateString()} <br />
                  Status: {item.status}%
                </div>
                <p className="mt-1 text-sm">{item.description}</p>

                <div className="mt-2 flex items-center space-x-4">
                  <div className="text-sm">Kolaborator:</div>
                  <div className="flex -space-x-2">
                    {item.collaborators?.slice(0, 2).map((c, i) => (
                      <a key={i} href={`/u/${c.username}`}>
                        <img
                          src={c.photo_url}
                          className="w-8 h-8 rounded-full border"
                          alt="kolaborator"
                        />
                      </a>
                    ))}
                    {item.collaborators?.length > 2 && (
                      <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center text-xs">
                        {item.collaborators.length - 2}+
                      </div>
                    )}
                  </div>

                  <div className="text-sm">Dibuat dengan:</div>
                  <div className="flex space-x-1">
                    {item.tools?.map((tool, i) => (
                      <img
                        key={i}
                        src={`/icons/${tool}.svg`}
                        className="w-6 h-6"
                        alt={tool}
                      />
                    ))}
                  </div>
                </div>
              <button
                onClick={() => {
                  const slugifiedTitle = item.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "");
                  
                  router.push(`/${profile.username}/${slugifiedTitle}`);
                }}
                className="mt-3 px-4 py-1 bg-white border rounded-full text-sm"
              >
                Tampilkan
              </button>
              </div>
            </div>
          ))}
        </div>
      </>
      )}
    </div>
    </>
  );
}
