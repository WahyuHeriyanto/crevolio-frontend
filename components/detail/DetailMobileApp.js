import React from "react";
import { FaGithub } from "react-icons/fa";

export default function DetailMobileApp({ project, profile }) {
  const {
    title,
    description,
    status,
    start_date,
    end_date,
    collaborators,
    tools,
    thumbnail_url,
    demo,
    download,
    content_type,
  } = project;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-lg">Logo crevolio</div>
        <nav className="space-x-4 text-sm">
          <a href="/">Beranda</a>
          <a href="/explore">Explore</a>
          <a href="/tentang">Tentang Kami</a>
        </nav>
      </header>

      {/* Judul */}
      <section className="text-center mt-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="mt-1 inline-block border px-2 py-0.5 text-xs rounded-full">
          V 1.0.1
        </div>
      </section>

      {/* Thumbnail */}
      <div className="flex justify-center mt-6">
        <div className="w-80 h-48 border relative overflow-hidden">
          {thumbnail_url ? (
            <img
              src={thumbnail_url}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Foto
            </div>
          )}
          {/* > Button atau carousel control */}
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl">
            &gt;
          </button>
        </div>
      </div>

      {/* Tipe dan Bahasa */}
      <div className="flex justify-center space-x-2 mt-2 text-sm">
        {content_type?.map((type, i) => (
          <div
            key={i}
            className="border rounded-full px-3 py-1 text-xs bg-gray-100"
          >
            {type}
          </div>
        ))}
        <div className="border rounded-full px-3 py-1 text-xs bg-gray-100">
          Bahasa Pemrograman
        </div>
      </div>

      {/* Durasi & Deskripsi */}
      <div className="max-w-xl mx-auto mt-6 px-4">
        <div className="font-semibold">Durasi pengerjaan</div>
        <div className="text-sm mb-3">
          {new Date(start_date).toLocaleDateString()} -{" "}
          {new Date(end_date).toLocaleDateString()}
        </div>

        <div className="font-semibold">Deskripsi Proyek</div>
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      {/* Kolaborator */}
      <div className="max-w-xl mx-auto mt-6 px-4">
        <div className="font-semibold mb-2">Kolaborator</div>

        {collaborators?.slice(0, 3).map((c, i) => (
          <div key={i} className="flex items-center space-x-3 mb-2">
            <img
              src={c.photo_url}
              alt="foto"
              className="w-8 h-8 rounded-full border"
            />
            <div>
              <div className="text-sm font-medium">{c.username}</div>
              <div className="text-xs text-gray-500">Jobdesk/Posisi</div>
            </div>
          </div>
        ))}
        {collaborators?.length > 3 && (
          <div className="text-xs text-blue-500 cursor-pointer">
            Selengkapnya
          </div>
        )}
        <button className="mt-2 border text-sm px-3 py-1 rounded">
          Minta Kolaborasi
        </button>
      </div>

      {/* Source Code */}
      <div className="max-w-xl mx-auto mt-6 px-4">
        <div className="font-semibold mb-2">Source Code</div>
        <div className="flex items-center space-x-2">
          <FaGithub className="text-xl" />
          <a
            href={project.source_code || "#"}
            className="text-sm underline"
            target="_blank"
            rel="noreferrer"
          >
            {project.source_code || "Belum tersedia"}
          </a>
        </div>
      </div>

      {/* Dapatkan Melalui */}
      <div className="max-w-xl mx-auto mt-10 px-4 text-center">
        <h3 className="font-bold text-lg mb-3">Dapatkan Melalui</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="border px-4 py-2 rounded"
            >
              Demo
            </a>
          )}
          {download && (
            <>
              <a
                href={download}
                target="_blank"
                rel="noreferrer"
                className="border px-4 py-2 rounded"
              >
                Google Play Store
              </a>
              <a
                href={download}
                target="_blank"
                rel="noreferrer"
                className="border px-4 py-2 rounded"
              >
                App Store
              </a>
            </>
          )}
        </div>
      </div>

      <footer className="mt-12 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} crevolio
      </footer>
    </div>
  );
}
