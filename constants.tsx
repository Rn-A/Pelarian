
import { Database } from './types';

export const INITIAL_DATA: Database = {
  home: {
    logo: "",
    bannerImage: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    communityName: "PELARIAN RC",
    slogan: "RUN • CONNECT • INSPIRE"
  },
  about: {
    bannerImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
    title: "MENGALIR DALAM SETIAP LANGKAH",
    description: "<p>Pelarian Running Clan adalah lebih dari sekadar komunitas lari. Kami adalah wadah bagi individu yang ingin melarikan diri sejenak dari rutinitas dan menemukan kekuatan baru melalui olahraga lari.</p>",
    vision: "Menjadi komunitas lari yang paling inspiratif dan inklusif di Indonesia.",
    mission: "Menyelenggarakan kegiatan lari rutin yang aman dan menyenangkan.",
    history: "Dimulai dari sekelompok kecil teman pada tahun 2022.",
    activeMembers: "200+",
    completedEvents: "50+",
    philosophy: "Lari bukan hanya soal mencapai garis finish, tapi tentang kebersamaan."
  },
  events: [
    {
      id: "1",
      title: "City Night Run",
      category: "Night Run",
      images: ["https://images.unsplash.com/photo-1552674605-db6ffd4facb5"],
      date: "2024-05-25",
      time: "19:00",
      location: "Sudirman - Thamrin, Jakarta",
      description: "Lari malam di tengah kota Jakarta.",
      status: "ongoing",
      gformLink: "https://forms.gle/demo",
      slots: "100 Peserta"
    }
  ],
  merchandise: [],
  organizers: [],
  articles: [],
  gallery: []
};
