// app/(tabs)/news/[slug].tsx

import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router'; // Pastikan Stack diimpor

interface Article {
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        name: string;
    };
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ArticleDetailScreen() {
    const params = useLocalSearchParams();
    const { article: articleJson } = params;

    let article: Article | null = null;
    if (typeof articleJson === 'string') {
        try {
            article = JSON.parse(articleJson) as Article;
        } catch (e) {
            console.error("Gagal mengurai JSON artikel:", e);
        }
    }

    if (!article) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg text-red-600">Artikel tidak ditemukan atau data rusak.</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white p-4">
            {/* INI YANG MENGONTROL HEADER UNTUK LAYAR DETAIL BERITA */}
            <Stack.Screen options={{ 
                title: article.title || 'Detail Artikel', // Judul header adalah judul artikel
            }} />

            {article.urlToImage && (
                <Image
                    source={{ uri: article.urlToImage }}
                    className="w-full h-60 rounded-lg mb-4 bg-gray-200"
                    resizeMode="cover"
                />
            )}
            <Text className="text-3xl font-bold mb-3 text-gray-900">
                {article.title}
            </Text>
            <View className="flex-row justify-between mb-4">
                <Text className="italic text-base text-gray-600">{article.source.name}</Text>
                <Text className="text-sm text-gray-500">{formatDate(article.publishedAt)}</Text>
            </View>
            <Text className="text-lg mb-4 text-gray-800">
                {article.description || 'Deskripsi tidak tersedia.'}
            </Text>
            {article.content && (
                <Text className="text-base text-gray-700 leading-relaxed mb-6">
                    {article.content.replace(/\[\+\d+ chars\]$/, '')}
                </Text>
            )}

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => Linking.openURL(article.url)}
                className="bg-blue-500 py-3 rounded-lg flex-row justify-center items-center"
            >
                <Text className="text-white text-lg font-semibold">Baca Artikel Lengkap</Text>
            </TouchableOpacity>

            <View className="h-12" />
        </ScrollView>
    );
}