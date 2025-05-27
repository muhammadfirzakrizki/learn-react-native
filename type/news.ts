// --- Types ---
export interface Article {
  title: string;
  description: string;
  url: string; // URL akan digunakan sebagai ID unik
  image?: string;
  publishedAt: string;
  source: {
    name: string;
  };
};