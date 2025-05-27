import React, { useState } from 'react';
import { FlatList, Linking, Image, TouchableOpacity, View, Text } from 'react-native';

// --- Types ---
type Article = {
  title: string;
  description: string;
  url: string;
  image?: string; // image can be optional
  publishedAt: string;
  source: {
    name: string;
  };
};

// --- Dummy Local Data ---
const LOCAL_ARTICLES: Article[] = [
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
    title: 'Quantum Computing: Terobosan Baru dalam Algoritma Kuantum',
    description: 'Para ilmuwan mengumumkan terobosan dalam pengembangan algoritma kuantum yang dapat memecahkan masalah kompleks jauh lebih cepat dari komputer klasik.',
    url: 'https://example.com/quantum-computing-4',
    image: 'https://images.unsplash.com/photo-1581092100868-b7880dfdc278?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedAt: '2023-10-23T16:45:00Z',
    source: { name: 'Scientific Innovators' },
  },
  {
    title: 'Cybersecurity: Meningkatnya Ancaman Serangan Ransomware',
    description: 'Laporan terbaru menunjukkan peningkatan signifikan dalam serangan ransomware global, mendorong perusahaan untuk memperkuat pertahanan siber mereka.',
    url: 'https://example.com/cybersecurity-5',
    image: 'https://images.unsplash.com/photo-1596556514749-d757d5982e5b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    publishedAt: '2023-10-22T11:20:00Z',
    source: { name: 'InfoSec Daily' },
  },
];


// --- Utility Function ---
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return 'Invalid Date';
  }
}

// --- Main Component ---
export default function TabTwoScreen() {
  // Langsung gunakan data lokal, tidak perlu loading atau error state untuk fetching
  const [articles, setArticles] = useState<Article[]>(LOCAL_ARTICLES);

  // Tidak ada useEffect untuk fetching lagi karena data sudah lokal,
  // dan tidak ada loading/error state karena data sudah ada.

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Text className="text-3xl font-extrabold mb-6 text-gray-900">Berita Lokal (Data Statis)</Text>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.url} // URL adalah kunci unik yang bagus
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }} // NativeWind doesn't directly support `contentContainerClassName`
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-base text-gray-600">Tidak ada artikel berita lokal.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL(item.url).catch(err => console.error("Gagal membuka URL:", err))}
            className="flex-row mb-5 bg-gray-100 rounded-lg p-3 shadow-md"
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                className="w-28 h-20 rounded-lg bg-gray-300"
                resizeMode="cover"
              />
            ) : (
              <View className="w-28 h-20 rounded-lg bg-gray-300 justify-center items-center">
                <Text className="text-gray-500 text-xs">Tanpa Gambar</Text>
              </View>
            )}

            <View className="flex-1 ml-4 justify-between">
              <Text className="text-lg font-semibold text-gray-900" numberOfLines={2}>
                {item.title}
              </Text>
              <Text className="text-gray-700 mt-1 text-sm" numberOfLines={3}>
                {item.description || 'Deskripsi tidak tersedia.'}
              </Text>
              <View className="flex-row justify-between mt-3">
                <Text className="italic text-xs text-gray-500">{item.source.name}</Text>
                <Text className="text-xs text-gray-500">{formatDate(item.publishedAt)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}