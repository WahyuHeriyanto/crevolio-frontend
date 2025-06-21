// components/AddProjectModal.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddProjectModal({ isOpen, onClose, username, onSaved, id }) {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("memulai");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(0);
  const [type, setType] = useState("individu");
  const [contentType, setContentType] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [toolInput, setToolInput] = useState("");
  const [tools, setTools] = useState([]);
  const [copyright, setCopyright] = useState("");
  const [demo, setDemo] = useState("");
  const [download, setDownload] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const AVAILABLE_TYPES = ["Mobile App", "Design", "Ilustrator", "Web", "Desktop"];

  

  const handleSave = async () => {
    let thumbnail_url = null;
    if (thumbnailFile) {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;
      const filePath = `user/${username}/${thumbnailFile.name}`;
const { error: uploadError } = await supabase.storage
  .from("user-files")
  .upload(filePath, thumbnailFile);

      if (uploadError) {
        alert("Gagal upload gambar");
        return;
      }
      thumbnail_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-files/${filePath}`;
    }

    console.log({
        thumbnail_url,
        user_id: id,
        title,
        description,
        status,
        start_date: startDate,
        end_date: status === "selesai" ? endDate : null,
        progress: status === "sedang berlangsung" ? progress : status === "selesai" ? 100 : 0,
        type,
        collaborators,
        tools,
        copyright,
        demo,
        download,
        });

    const { error: insertError } = await supabase.from("portfolios").insert({
      user_id: id,
      title,
      description,
      status,
      start_date: startDate || null,
      end_date: status === "selesai" ? endDate : null,
      progress: status === "sedang berlangsung" ? progress : status === "selesai" ? 100 : 0,
      type,
      content_type: contentType,
      collaborators,
      tools,
      copyright,
      demo,
      download,
      thumbnail_url,
    });

    if (insertError) {
      alert("Gagal menyimpan proyek");
    } else {
      alert("Berhasil menyimpan proyek");
      onClose();
      onSaved();
    }
  };

  const handleCollaboratorSearch = async (text) => {
    if (!text) return setSearchResults([]);
    const { data } = await supabase
      .from("profiles")
      .select("username, photo_url")
      .ilike("username", `%${text}%`);
    setSearchResults(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-12 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative flex flex-col space-y-3">
        <h2 className="text-xl font-semibold mb-4">Tambahkan Proyek Baru</h2>

        {/* Upload Thumbnail */}
        <input
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          onChange={(e) => setThumbnailFile(e.target.files[0])}
          className="mb-4"
        />

        {/* Text Fields */}
        <input placeholder="Nama Proyek" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Deskripsi Proyek" className="input" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* Status */}
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="memulai">Memulai</option>
          <option value="sedang berlangsung">Sedang berlangsung</option>
          <option value="selesai">Selesai</option>
        </select>

        {(status === "memulai" || status === "sedang berlangsung" || status === "selesai") && (
          <input type="date" className="input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        )}

        {(status === "selesai") && (
          <input type="date" className="input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        )}

        {(status === "sedang berlangsung") && (
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
            />
            <input
              type="number"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-16 border px-2 py-1 rounded"
            />%
          </div>
        )}

        {/* Type */}
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="individu">Individu</option>
          <option value="tim">Tim</option>
        </select>

        {/* Kolaborator */}
        {type === "tim" && (
          <div>
            <input
              placeholder="Cari kolaborator"
              className="input"
              onChange={(e) => handleCollaboratorSearch(e.target.value)}
            />
            <ul className="bg-gray-100 max-h-32 overflow-auto">
              {searchResults.map((user) => (
                <li
                  key={user.username}
                  className="px-2 py-1 hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    setCollaborators([...collaborators, user]);
                    setSearchResults([]);
                  }}
                >
                  {user.username}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap mt-2">
              {collaborators.map((c, i) => (
                <div key={i} className="text-xs bg-gray-300 rounded px-2 py-1 mr-1 mb-1">
                  {c.username}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
            <label className="font-medium text-sm">Tipe Konten</label>
            <div className="flex flex-wrap gap-2 mt-1">
                {AVAILABLE_TYPES.map((typeOption) => (
                <label key={typeOption} className="flex items-center gap-1 text-sm">
                    <input
                    type="checkbox"
                    checked={contentType.includes(typeOption)}
                    onChange={(e) => {
                        if (e.target.checked) {
                        setContentType([...contentType, typeOption]);
                        } else {
                        setContentType(contentType.filter((t) => t !== typeOption));
                        }
                    }}
                    />
                    {typeOption}
                </label>
                ))}
            </div>
        </div>
        <input placeholder="Alat yang digunakan" className="input" value={toolInput} onChange={(e) => setToolInput(e.target.value)} onBlur={() => {
          if (toolInput) setTools([...tools, toolInput]);
          setToolInput("");
        }} />
        <div className="flex flex-wrap mt-2">
          {tools.map((tool, i) => (
            <div key={i} className="text-xs bg-gray-300 rounded px-2 py-1 mr-1 mb-1">{tool}</div>
          ))}
        </div>

        <input placeholder="Perlindungan Hak Cipta" className="input" value={copyright} onChange={(e) => setCopyright(e.target.value)} />
        <input placeholder="Demo" className="input" value={demo} onChange={(e) => setDemo(e.target.value)} />
        <input placeholder="Unduh" className="input" value={download} onChange={(e) => setDownload(e.target.value)} />

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Batalkan</button>
          <button onClick={handleSave} className="bg-black text-white px-4 py-2 rounded">Simpan</button>
        </div>
      </div>
    </div>
  );
}
