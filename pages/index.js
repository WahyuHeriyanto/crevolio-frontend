import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [section, setSection] = useState("");

  const sectionRefs = {
    section2: useRef(null),
    section3: useRef(null),
    section4: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Crevolio - Platform Portofolio dan Komunitas</title>
      </Head>

      <div className="min-h-screen w-full overflow-x-hidden font-sans bg-black text-white">
        {/* Navbar */}
        <header className="flex justify-between items-center px-6 py-4">
          <div className="text-lg font-semibold">Logo crevolio</div>
          <nav className="flex gap-6">
            <Link href="/">Beranda</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/about">Tentang Kami</Link>
          </nav>
        </header>
        <section className="min-h-screen bg-black text-white flex flex-col justify-center px-4 md:px-12 py-24">
          {/* Konten atas: teks kiri */}
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start">
            {/* Kiri: teks utama */}
            <div className="flex-1 pr-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Jadikan portofoliomu lebih dari <br /> kumpulan karya
              </h1>
              <p className="text-gray-300 text-lg md:text-xl">
                koneksi, kolaborasi, dan komunitas, semua ada di Crevolio
              </p>
            </div>
          </div>

          {/* Tombol Mulai */}
          <div className="mt-26 max-w-7xl mx-auto w-full flex justify-between items-center px-2 md:px-0">
            {/* Tombol mulai (center secara horizontal) */}
            <div className="text-3xl flex-1 flex justify-center">
              <Link
                href="/login"
                className="px-8 py-2 border-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                Mulai
              </Link>
            </div>

            {/* Kanan: tersedia juga */}
            <div className="text-sm text-gray-400 text-center">
              <p className="text-lg mb-4">Tersedia juga</p>
              <div className="flex gap-4 justify-center">
                <a href="/android.apk" target="_blank">
                  <img src="/assets/android.png" alt="Android" className="w-18 h-18" />
                </a>
                <a href="/ios" target="_blank">
                  <img src="/assets/ios.png" alt="iOS" className="w-18 h-18" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section
          id="section2"
          ref={sectionRefs.section2}
          className="min-h-screen flex flex-col md:flex-row items-center px-6 py-24 bg-white text-black gap-12"
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={section === "section2" ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img src="/assets/animasi1.png" alt="Animasi 1" className="w-full max-w-md" />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={section === "section2" ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold mb-2">Buat Portofolio yang Mengesankan</h2>
            <p className="text-gray-700">
              Desain portofoliomu dengan bebas, tampilkan proyek, ide, dan pencapaian dalam satu
              tempat yang elegan. Bangun personal branding yang kuat dan tampil menonjol
            </p>
          </motion.div>
        </section>

        {/* Section 3 */}
        <section
          id="section3"
          ref={sectionRefs.section3}
          className="min-h-screen flex flex-col md:flex-row-reverse items-center px-6 py-24 bg-white text-black gap-12"
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={section === "section3" ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img src="/assets/animasi2.png" alt="Animasi 2" className="w-full max-w-md" />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={section === "section3" ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold mb-2">
              Bangun Koneksi yang Bermakna
            </h2>
            <p className="text-gray-700">
              Terhubung dengan kreator lain, saling mengikuti, menyukai karya, hingga berdiskusi
              langsung. Bagikan profilmu ke teman, komunitas, atau recruiter di berbagai platform
            </p>
          </motion.div>
        </section>

        {/* Section 4 - Kolaborasi */}
        <section
          id="section4"
          ref={sectionRefs.section4}
          className="min-h-screen bg-gray-100 text-black px-6 py-24"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={section === "section4" ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold">Kolaborasi dan Bangun Komunitas</h2>
            <p className="text-gray-600 mt-2">
              Jalankan proyek bersama, berdiskusi topik menarik, dan bangun komunitas kreatif.
              Publikasikan karya kolaboratif dan kembangkan potensi bersama
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={section === "section4" ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white p-4 shadow rounded flex flex-col items-center justify-center"
              >
                <div className="w-full h-80 bg-gray-300 flex items-center justify-center mb-4">
                  Gambar
                </div>
                <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 transition">
                  Kunjungi <span>→</span>
                </button>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white text-sm px-6 py-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>Logo crevolio</div>
            <div className="flex gap-6">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Tentang Kami</Link>
              <Link href="#">Gabung</Link>
              <Link href="#">Kontak</Link>
            </div>
          </div>
          <div className="text-right text-gray-500 mt-24">© 2025 Ziyu Tech</div>
        </footer>
      </div>
    </>
  );
}
