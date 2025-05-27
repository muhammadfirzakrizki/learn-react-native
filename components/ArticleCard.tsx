import React from 'react';
import { View, Text, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Article } from '@/type/news';

interface ArticleCardProps {
  article: Article;
  onPress: (event: GestureResponderEvent) => void;
  onEdit: (event: GestureResponderEvent) => void;
  onDelete: (event: GestureResponderEvent) => void;
  formatDate: (dateString: string) => string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress, onEdit, onDelete, formatDate }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row mb-5 bg-gray-100 rounded-lg p-3 shadow-md"
    >
      {article.image ? (
        <Image
          source={{ uri: article.image }}
          className="w-28 h-20 rounded-lg bg-gray-300"
          resizeMode="cover"
        />
      ) : (
        <View className="w-28 h-20 rounded-lg bg-gray-300 justify-center items-center">
          <Text className="text-gray-500 text-xs text-center">No Image</Text>
        </View>
      )}

      <View className="flex-1 ml-4 justify-between">
        <Text className="text-lg font-semibold text-gray-900" numberOfLines={2}>
          {article.title}
        </Text>
        <Text className="text-gray-700 mt-1 text-sm" numberOfLines={3}>
          {article.description || 'Description not available.'}
        </Text>
        <View className="flex-row justify-between mt-3 items-center">
          <View>
            <Text className="italic text-xs text-gray-500">{article.source.name}</Text>
            <Text className="text-xs text-gray-500">{formatDate(article.publishedAt)}</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity onPress={onEdit} className="p-2 bg-yellow-500 rounded-md mr-2">
              <Text className="text-white text-xs font-bold">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} className="p-2 bg-red-500 rounded-md">
              <Text className="text-white text-xs font-bold">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;