import { Article } from '@/type/news';

export const INITIAL_DUMMY_ARTICLES: Article[] = [
  {
    title: 'Penemuan Baru AI: Algoritma Deep Learning Revolusioner',
    description: 'Para peneliti berhasil mengembangkan algoritma deep learning baru yang menunjukkan peningkatan signifikan dalam pengenalan pola dan pemrosesan bahasa alami.',
    url: 'https://example.com/ai-discovery-1',
    image: 'https://images.unsplash.com/photo-1518770660439-4630ee8ebc36?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedAt: '2023-10-26T10:00:00Z',
    source: { name: 'Tech Daily' },
  },
  {
    title: 'Smartphone Lipat Terbaru Dirilis dengan Desain Inovatif',
    description: 'Perusahaan teknologi terkemuka meluncurkan smartphone lipat generasi terbaru yang menawarkan durabilitas dan pengalaman pengguna yang ditingkatkan.',
    url: 'https://example.com/foldable-phone-2',
    image: 'https://images.unsplash.com/photo-1616781987508-ea244463a563?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedAt: '2023-10-25T14:30:00Z',
    source: { name: 'Gadget World' },
  },
  {
    title: 'Masa Depan Kendaraan Listrik: Inovasi Baterai dan Infrastruktur',
    description: 'Pengembangan teknologi baterai dan infrastruktur pengisian daya terus berkembang pesat, membuka jalan bagi adopsi kendaraan listrik yang lebih luas.',
    url: 'https://example.com/ev-future-3',
    image: 'https://images.unsplash.com/photo-1544652230-da1d1f057885?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedAt: '2023-10-24T09:15:00Z',
    source: { name: 'Auto Tech Review' },
  },
  {
    title: 'Cybersecurity: Meningkatnya Ancaman Serangan Ransomware',
    description: 'Laporan terbaru menunjukkan peningkatan signifikan dalam serangan ransomware global, mendorong perusahaan untuk memperkuat pertahanan siber mereka.',
    url: 'https://example.com/cybersecurity-5',
    image: 'https://images.unsplash.com/photo-1596556514749-d757d5982e5b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Contoh tanpa gambar
    publishedAt: '2023-10-22T11:20:00Z',
    source: { name: 'InfoSec Daily' },
  },
];