import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ListHeaderProps {
  onAddArticle: () => void;
  onClearAll: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({ onAddArticle, onClearAll }) => {
  return (
    <View>
      <Text className="text-3xl font-extrabold mb-6 text-gray-900">Berita Lokal (CRUD)</Text>

      <TouchableOpacity
        onPress={onAddArticle}
        className="p-3 bg-green-600 rounded-lg self-stretch mb-4 items-center"
      >
        <Text className="text-white font-bold text-lg">Tambah Artikel Baru</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClearAll}
        className="p-3 bg-red-500 rounded-lg self-stretch mb-6 items-center"
      >
        <Text className="text-white font-bold text-base">Hapus Semua Berita Lokal</Text>
      </TouchableOpacity>

      <View className="h-4" />
    </View>
  );
};

export default ListHeader;