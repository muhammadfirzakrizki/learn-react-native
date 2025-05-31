import React, { useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DetailNewsScreen() {
    const { title, image, source, date, description, content, url } = useLocalSearchParams();
    const router = useRouter();

    // Animasi fade dan slide
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current; // start posisi 20 px bawah

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    return (
        <ScrollView className="flex-1 bg-white px-4 pt-4">
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center mb-4"
            >
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text className="ml-2 text-base font-medium text-gray-700">Kembali</Text>
            </TouchableOpacity>

            {/* Card with animation */}
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                }}
                className="bg-white rounded-2xl shadow-md p-5 mb-6"
            >
                {image && (
                    <Image
                        source={{ uri: image as string }}
                        className="w-full h-52 rounded-xl mb-4 bg-gray-300"
                        resizeMode="cover"
                    />
                )}

                <Text className="text-2xl font-extrabold text-gray-900 mb-2">{title}</Text>

                <View className="flex-row items-center space-x-2 mb-4">
                    <Ionicons name="newspaper-outline" size={16} color="#6b7280" />
                    <Text className="text-sm text-gray-500">
                        {source} • {new Date(date as string).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Text>
                </View>

                <Text className="text-base text-gray-800 mb-3">
                    {description || 'No description available.'}
                </Text>

                <Text className="text-sm text-gray-600 leading-relaxed">
                    {content || 'No content available.'}
                </Text>

                {url && (
                    <TouchableOpacity
                        onPress={() => Linking.openURL(url as string)}
                        className="mt-6 bg-blue-600 py-3 px-4 rounded-xl flex-row justify-center items-center"
                        activeOpacity={0.85}
                    >
                        <Ionicons name="link-outline" size={18} color="white" />
                        <Text className="text-white ml-2 font-semibold">Baca Selengkapnya</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </ScrollView>
    );
}
