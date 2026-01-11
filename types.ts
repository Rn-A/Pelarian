
export type EventStatus = 'ongoing' | 'completed';
export type MerchandiseStatus = 'open' | 'close';

export interface HomePageData {
  logo: string;
  bannerImage: string;
  communityName: string;
  slogan: string;
}

export interface AboutPageData {
  bannerImage: string;
  title: string;
  description: string; // HTML Content
  vision: string;
  mission: string;
  history: string;
  activeMembers: string;
  completedEvents: string;
  philosophy: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  images: string[];
  date: string;
  time: string;
  location: string;
  description: string; // HTML Content
  status: EventStatus;
  gformLink: string;
  slots: string; // Added slots field
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  status: MerchandiseStatus;
  description: string;
  specifications: string;
  sizes: string;
  poPeriod: string;
  productionEstimation: string;
  gformLink: string;
  whatsappLink: string;
  poNotes: string;
}

export interface Organizer {
  id: string;
  name: string;
  photo: string;
  position: string;
  instagramLink: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  authorName: string;
  authorPhoto: string;
  authorRole: string;
  images: string[];
  description: string; // HTML Content
}

export interface GalleryAlbum {
  id: string;
  title: string;
  coverImage: string;
  gdriveLink: string;
}

export interface Database {
  home: HomePageData;
  about: AboutPageData;
  events: Event[];
  merchandise: Product[];
  organizers: Organizer[];
  articles: Article[];
  gallery: GalleryAlbum[];
}
