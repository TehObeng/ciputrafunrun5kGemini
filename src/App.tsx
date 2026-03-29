import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Activity, 
  Gift, 
  Medal, 
  Shirt, 
  Ticket,
  ChevronRight,
  Camera,
  Music,
  Smile,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import bibImage from './assets/bib.jpg';
import citralandMegahLogo from './assets/citraland-megah-warna.png';
import jerseyImage from './assets/jersey.jpg';
import logoFunRun from './assets/logo-fun-run-5k.png';
import medalImage from './assets/medals-and-lanyard.jpg';
import phoenixEventBatamLogo from './assets/phoenix-event-batam-logo.png';
import routeMapImage from './assets/peta-rute.png';
import bagImage from './assets/tas-running.jpg';

// Link Google Form Pendaftaran
const GOOGLE_FORM_URL = "https://forms.gle/gapqf3KjGvrc8SbG9";

const EVENT_NAME = 'Ciputra Batam Fun Run 2026';
const INSTAGRAM_HANDLE = 'batamfunrun.id';
const WHATSAPP_NUMBER = '+62 853 5151 8858';
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
const WHATSAPP_URL = 'https://wa.me/6285351518858';

type RacePackImage = {
  src: string;
  alt: string;
  label: string;
  imageClassName?: string;
};

const racePackImages: RacePackImage[] = [
  {
    src: jerseyImage,
    alt: `Jersey eksklusif ${EVENT_NAME}`,
    label: 'Jersey Eksklusif',
    imageClassName: 'scale-[1.2]',
  },
  {
    src: medalImage,
    alt: `Medali dan lanyard ${EVENT_NAME}`,
    label: 'Medali Finisher',
  },
  {
    src: bibImage,
    alt: `Nomor dada BIB ${EVENT_NAME}`,
    label: 'Nomor Dada (BIB)',
  },
  {
    src: bagImage,
    alt: `Tas running ${EVENT_NAME}`,
    label: 'Goodie Bag',
  },
];

function ContactInfoBlock({
  className,
  textClassName,
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={className}>
      <a
        className={`block transition-colors hover:text-orange-500 ${textClassName ?? ''}`}
        href={INSTAGRAM_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Instagram: {INSTAGRAM_HANDLE}
      </a>
      <a
        className={`block transition-colors hover:text-orange-500 ${textClassName ?? ''}`}
        href={WHATSAPP_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Whatsapp: {WHATSAPP_NUMBER}
      </a>
    </div>
  );
}

function ImagePreviewModal({
  image,
  onClose,
}: {
  image: RacePackImage | null;
  onClose: () => void;
}) {
  React.useEffect(() => {
    if (!image) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [image]);

  if (!image) {
    return null;
  }

  return (
    <div
      aria-label="Preview gambar race pack"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full max-w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Tutup preview gambar"
          className="absolute right-3 top-3 rounded-full bg-slate-950/70 p-2 text-white transition-colors hover:bg-slate-950"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] max-w-[90vw] object-contain"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedRacePackImage, setSelectedRacePackImage] = React.useState<RacePackImage | null>(null);

  React.useEffect(() => {
    if (!selectedRacePackImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedRacePackImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedRacePackImage]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                src={logoFunRun}
                alt={`Logo ${EVENT_NAME}`}
                className="h-10 w-auto object-contain sm:h-12"
              />
              <span className="max-w-[9rem] text-[11px] font-bold leading-tight text-slate-900 sm:max-w-none sm:text-base">
                {EVENT_NAME}
              </span>
            </div>
            <div>
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop" 
            alt="Runners" 
            className="object-cover w-full h-full opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              <span className="mb-4 flex flex-col items-center gap-3">
                <span className="inline-flex flex-wrap items-center justify-center">
                  <img
                    src={citralandMegahLogo}
                    alt="Logo CiptaLand Megah Batam"
                    className="h-8 w-auto object-contain sm:h-10 md:h-12"
                  />
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100 sm:text-base">
                  Organized By :
                </span>
                <span className="inline-flex flex-wrap items-center justify-center">
                  <img
                    src={phoenixEventBatamLogo}
                    alt="Logo Phoenix Event Batam"
                    className="h-8 w-auto object-contain sm:h-10 md:h-12"
                  />
                </span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Fun Run 2026
              </span>
            </h1>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Berlari dan nikmati keseruan tanpa batas! Acara lari santai untuk semua kalangan dengan hadiah puluhan juta rupiah.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-orange-500 rounded-full hover:bg-orange-600 hover:scale-105 shadow-lg shadow-orange-500/30"
              >
                Daftar Sekarang <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#info"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-white/10 border border-white/20 rounded-full hover:bg-white/20"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section id="info" className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-slate-100">
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Tanggal</h3>
              <p className="mt-1 text-lg font-bold text-slate-900">24 Mei 2026</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Waktu</h3>
              <p className="mt-1 text-lg font-bold text-slate-900">05:00 - 09:00 WIB</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Lokasi</h3>
              <p className="mt-1 text-lg font-bold text-slate-900">Emerald Hills</p>
              <p className="text-sm text-slate-500">Ciputra Batam</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Jarak</h3>
              <p className="mt-1 text-lg font-bold text-slate-900">5 Kilometers</p>
              <p className="text-sm text-slate-500">Fun Run & Walk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lebih Dari Sekadar Lari</h2>
            <p className="text-lg text-slate-600">
              Bergabunglah dengan 500+ peserta lainnya dalam acara lari paling seru tahun ini. Dirancang untuk semua level, dari pelari profesional hingga keluarga yang ingin berjalan santai.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rute Instagramable</h3>
              <p className="text-slate-600">
                Setiap kilometer menghadirkan spot foto menarik yang mendorong Anda untuk mengabadikan momen seru bersama teman dan keluarga.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Smile className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Untuk Semua Level</h3>
              <p className="text-slate-600">
                Tanpa batasan! Berbeda dari lomba kompetitif, fun run ini mengajak pejalan kaki, jogger, maupun pelari untuk berpartisipasi bersama.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Music className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Festival Pasca-Lari</h3>
              <p className="text-slate-600">
                Nikmati hiburan DJ Live, beragam stan makanan, dan puncaknya: pengundian doorprize dengan hadiah menarik yang siap dibawa pulang!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Race Pack & Pricing */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Race Pack Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Perlengkapan Peserta</h2>
              <p className="text-lg text-slate-600 mb-8">
                Setiap peserta yang terdaftar akan mendapatkan Race Pack eksklusif {EVENT_NAME}.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {racePackImages.map((item) => (
                  <div key={item.label} className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm group">
                    <button
                      aria-label={`Lihat gambar ${item.label}`}
                      className="aspect-square w-full overflow-hidden bg-slate-100 text-left cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-blue-200"
                      onClick={() => setSelectedRacePackImage(item)}
                      type="button"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.imageClassName ?? ''}`}
                      />
                    </button>
                    <div className="p-3 text-center text-sm font-bold text-slate-800 border-t border-slate-100">{item.label}</div>
                  </div>
                ))}
              </div>
              
              <ul className="space-y-4">
                {[
                  { icon: Shirt, text: `Jersey Eksklusif ${EVENT_NAME}` },
                  { icon: Medal, text: "Medali Finisher (untuk semua yang menyelesaikan rute)" },
                  { icon: Ticket, text: "Nomor Dada (Race Bib) dengan Chip Pencatat Waktu" },
                  { icon: Gift, text: "Goodie Bag & Lanyard" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-slate-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Cards */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Informasi Harga Tiket</h3>
                <p className="text-slate-500 mt-2">Daftar lebih awal atau ajak komunitasmu untuk harga spesial!</p>
              </div>

              <div className="space-y-4">
                {/* Early Bird */}
                <div className="bg-white p-5 rounded-2xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Early Bird</h4>
                    <p className="text-sm text-slate-500">Pendaftaran lebih awal</p>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">Rp 150k</div>
                </div>

                {/* Regular */}
                <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-500 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Reguler</h4>
                    <p className="text-sm text-slate-500">Harga normal</p>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">Rp 200k</div>
                </div>

                {/* Komunitas */}
                <div className="bg-white p-5 rounded-2xl border-l-4 border-green-500 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Komunitas</h4>
                    <p className="text-sm text-slate-500">Grup &gt; 20 Orang</p>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900">Rp 150k<span className="text-sm font-normal text-slate-500">/pax</span></div>
                </div>
              </div>

              <ContactInfoBlock
                className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-left"
                textClassName="text-sm font-medium text-slate-700"
              />

              <div className="mt-8">
                <a 
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                >
                  Isi Form Pendaftaran
                </a>
                <p className="text-center text-xs text-slate-500 mt-4">
                  *Pembayaran dilakukan setelah mengisi form pendaftaran.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rundown */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rundown Acara</h2>
            <p className="text-blue-200">4 Jam Penuh Keseruan Tanpa Henti (24 Mei 2026)</p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500 before:to-transparent">
            {[
              { time: "05:00", title: "Persiapan & Pendaftaran Dibuka", desc: "Pengambilan race pack bagi yang belum, penitipan barang." },
              { time: "05:30", title: "Upacara Pembukaan & Pemanasan", desc: "Sesi pemanasan bersama instruktur zumba/aerobik." },
              { time: "06:00", title: "Mulai Lari (Race Start)", desc: "Pelepasan peserta lari 5K di garis start." },
              { time: "07:30", title: "Perayaan Garis Finish", desc: "Pembagian medali, hidangan ringan, dan hiburan musik." },
              { time: "08:30", title: "Acara Hiburan & Doorprize", desc: "Pengundian hadiah menarik dan hiburan seru di area acara." },
              { time: "09:00", title: "Penutupan & Pembagian Hadiah", desc: "Pengumuman pemenang utama dan lomba foto." }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-blue-900 bg-orange-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-blue-800/50 backdrop-blur-sm p-4 rounded-xl border border-blue-700/50">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-lg text-white">{item.title}</h4>
                    <span className="text-orange-400 font-mono font-bold">{item.time}</span>
                  </div>
                  <p className="text-sm text-blue-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Details */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Rute Lari 5K</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nikmati pemandangan kota Batam yang indah di sepanjang rute lari yang telah kami siapkan.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {/* Route Map Image */}
            <div className="lg:col-span-1 bg-slate-50 p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="aspect-square lg:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white p-2">
                <img 
                  src={routeMapImage}
                  alt="Peta Rute 5K" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Titik Rute */}
            <div className="lg:col-span-1 bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Titik Rute</h3>
              <ul className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-slate-200">
                {[
                  "CitraLand Megah Batam (Start)",
                  "Masjid Raya Batam",
                  "One Batam Mall",
                  "AMP",
                  "Mitra 10",
                  "Bundaran BP Batam",
                  "Mega Mall",
                  "Bank BTN",
                  "CitraLand Megah Batam (Finish)"
                ].map((point, index, array) => (
                  <li key={index} className="relative flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 mt-0.5 z-10 ${index === 0 ? 'bg-green-500' : index === array.length - 1 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <span className={`font-medium ${index === 0 || index === array.length - 1 ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Water Stations & Legend */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  Pos Air Minum
                </h3>
                <p className="text-blue-800 mb-6 text-sm">
                  Tetap terhidrasi! Kami menyediakan pos air minum di beberapa titik strategis sepanjang rute.
                </p>
                <div className="flex gap-4 justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shadow-md mb-2">KM 1</div>
                  </div>
                  <div className="w-8 border-t-2 border-dashed border-blue-200 my-auto"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md mb-2">KM 3</div>
                  </div>
                  <div className="w-8 border-t-2 border-dashed border-blue-200 my-auto"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold shadow-md mb-2">KM 5</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-500 shrink-0 shadow-sm border-2 border-white"></div>
                  <div>
                    <span className="block font-bold text-green-900">Garis Start</span>
                    <span className="text-sm text-green-700">CitraLand Megah Batam</span>
                  </div>
                </div>
                <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-red-500 shrink-0 shadow-sm border-2 border-white"></div>
                  <div>
                    <span className="block font-bold text-red-900">Garis Finish</span>
                    <span className="text-sm text-red-700">CitraLand Megah Batam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lokasi Acara</h2>
            <p className="text-lg text-slate-600">Emerald Hills, Ciputra Batam</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.7637217085844!2d104.05802468777274!3d1.1245903737664467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d988e6d3675a01%3A0x49e9d0d995ebd175!2sCitraLand%20Megah!5e1!3m2!1sen!2sid!4v1774784431443!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-6 flex justify-center">
              <a 
                href="https://maps.app.goo.gl/1uGEasqj9XjYQNmR8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA & Footer */}
      <footer className="bg-slate-950 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Untuk Berlari?</h2>
          <p className="text-slate-400 text-lg mb-10">
            Jangan lewatkan kesempatan untuk menjadi bagian dari acara lari paling seru di Batam. Kuota terbatas!
          </p>
          <a 
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all bg-gradient-to-r from-orange-500 to-orange-600 rounded-full hover:scale-105 shadow-xl shadow-orange-500/20"
          >
            Daftar Sekarang via Google Form
          </a>
          
          <div className="mt-20 pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              © 2026 Ciputra Batam. All rights reserved.
            </p>
          </div>

          <ContactInfoBlock
            className="mt-6 space-y-1"
            textClassName="text-sm text-slate-400"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <img
              src={logoFunRun}
              alt={`Logo ${EVENT_NAME}`}
              className="h-14 w-auto object-contain sm:h-16"
            />
            <img
              src={citralandMegahLogo}
              alt="Logo CitraLand Megah"
              className="h-12 w-auto object-contain sm:h-16"
            />
          </div>
        </div>
      </footer>

      <ImagePreviewModal
        image={selectedRacePackImage}
        onClose={() => setSelectedRacePackImage(null)}
      />
    </div>
  );
}
