import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useArticle } from '@/context/ArticleContext';
import { Feather } from '@expo/vector-icons';

export default function DetailNews() {
  const router = useRouter();
  const { article } = useArticle();
  const currentArticle = article;

  const handleOpenURL = () => {
    if (currentArticle?.url) {
      Linking.openURL(currentArticle.url);
    }
  };

  if (!currentArticle) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="mb-4 text-lg text-gray-600 font-semibold">Data artikel tidak ditemukan.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center space-x-2 px-4 py-2 bg-blue-600 rounded-full mt-4"
        >
          <Feather name="arrow-left" size={18} color="white" />
          <Text className="text-white font-semibold">Kembali ke Berita</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Card Container */}
      <View className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Gambar Artikel */}
        {currentArticle.urlToImage ? (
          <Image
            source={{ uri: currentArticle.urlToImage }}
            className="w-full h-56"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-56 bg-gray-300 justify-center items-center">
            <Text className="text-gray-500 italic">Gambar tidak tersedia</Text>
          </View>
        )}

        {/* Konten Artikel */}
        <View className="p-5">
          <Text className="text-2xl font-extrabold text-gray-900 mb-3">{currentArticle.title}</Text>

          <Text className="text-base text-gray-700 leading-relaxed mb-6">
            {currentArticle.description || 'Tidak ada deskripsi.'}
          </Text>

          {/* Info sumber dan tanggal */}
          <View className="flex-row justify-between mb-6">
            <Text className="text-sm text-gray-500 italic">
              Sumber: {currentArticle.source.name || '-'}
            </Text>
            <Text className="text-sm text-gray-500 italic">
              {new Date(currentArticle.publishedAt).toLocaleDateString()}
            </Text>
          </View>

          {/* Tombol Aksi */}
          <View className="space-y-3">
            <TouchableOpacity
              onPress={handleOpenURL}
              className="flex-row items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 rounded-full shadow"
            >
              <Feather name="external-link" size={18} color="white" />
              <Text className="text-white font-semibold">Buka Artikel Asli</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center justify-center space-x-2 px-4 py-3 bg-blue-600 rounded-full shadow"
            >
              <Feather name="arrow-left" size={18} color="white" />
              <Text className="text-white font-semibold">Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
