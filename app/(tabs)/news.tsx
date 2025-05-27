import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Linking, Image, TouchableOpacity, View, Text } from 'react-native';

interface Article {
    title: string;
    description: string;
    url: string;
    image: string;
    publishedAt: string;
    source: {
        name: string;
    };
};

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function TabThreeScreen() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apikey = '7a5c296dee4005035db430d2be81c8a4';
        const url = `https://gnews.io/api/v4/search?q=technology&lang=en&country=us&max=10&apikey=${apikey}`;

        setLoading(true);
        setArticles([]);
        setError(null);

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (!data.articles) throw new Error('No articles found in response.');
                setArticles(data.articles);
            })
            .catch((err) => {
                setError(err.message || 'Unknown error');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-white px-4">
                <Text className="text-red-600 text-lg">Error: {error}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white px-4 pt-12">
            <Text className="text-3xl font-extrabold mb-6 text-gray-900">Berita GNews</Text>

            <FlatList
                data={articles}
                keyExtractor={(item) => item.url}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Linking.openURL(item.url)}
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
                                <Text className="text-gray-500">No Image</Text>
                            </View>
                        )}

                        <View className="flex-1 ml-4 justify-between">
                            <Text className="text-lg font-semibold text-gray-900" numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text className="text-gray-700 mt-1" numberOfLines={3}>
                                {item.description || 'No description available.'}
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
