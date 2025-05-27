import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Linking,
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';

import { Article } from '@/type/news';
import { INITIAL_DUMMY_ARTICLES } from '@data/news';
import { formatDate } from '@utils/formatDate';

import {
  getArticles,
  initializeArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  clearAllArticles
} from '@/utils/storage';

// Import newly created components
import ArticleCard from '@components/ArticleCard';
import ArticleFormModal from '@components/ArticleFormModal';
import DeleteConfirmModal from '@components/DeleteConfirmModal';
import ListHeader from '@components/ListHeader';
import ClearAllConfirmModal from '@/components/ClearAllConfirmModal';

export default function TabOneScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);


  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);
  const [articleToDeleteUrl, setArticleToDeleteUrl] = useState<string | null>(null);

  const [isClearAllConfirmModalVisible, setClearAllConfirmModalVisible] = useState(false);


  // Load articles from AsyncStorage
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await initializeArticles(INITIAL_DUMMY_ARTICLES);
      const storedArticles = await getArticles();
      setArticles(storedArticles);
    } catch (e: any) {
      setError(`Gagal memuat berita: ${e.message || 'Error tidak diketahui'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // Simplified reset form and close modal
  const resetFormAndCloseModal = () => {
    setEditMode(false);
    setCurrentArticle(null);
    // No need to reset individual input states here anymore
    setFormModalVisible(false);
  };

  // Open add article modal
  const handleAddArticle = () => {
    resetFormAndCloseModal(); // Ensures form is clean before opening for add
    setFormModalVisible(true);
  };

  // Handle form submission (add or update) - Now receives articleData from modal
  const handleSubmit = async (articleData: Article) => {
    try {
      let updatedList: Article[];
      if (editMode && currentArticle) {
        // Mode Edit: use the original URL to update
        articleData.url = currentArticle.url;
        updatedList = await updateArticle(articleData);
        Alert.alert('Sukses', 'Artikel berhasil diperbarui!');
      } else {
        // Mode Tambah: Check for URL duplication
        const existingArticle = articles.find(a => a.url === articleData.url);
        if (existingArticle) {
          Alert.alert('Duplikat URL', 'URL ini sudah ada. Silakan gunakan URL lain atau edit artikel yang sudah ada.');
          return;
        }
        updatedList = await addArticle(articleData);
        Alert.alert('Sukses', 'Artikel berhasil ditambahkan!');
      }
      setArticles(updatedList);
      resetFormAndCloseModal(); // Close modal after successful submission
    } catch (e: any) {
      Alert.alert('Error', `Gagal menyimpan artikel: ${e.message || 'Error tidak diketahui'}`);
    }
  };

  // Start edit mode
  const handleEdit = (article: Article) => {
    setEditMode(true);
    setCurrentArticle(article);
    setFormModalVisible(true); // Open the modal, data will be populated by modal's useEffect
  };

  // Open delete confirmation modal
  const openDeleteConfirmModal = (articleUrl: string) => {
    setArticleToDeleteUrl(articleUrl);
    setDeleteConfirmModalVisible(true);
  };

  // Confirm and delete article
  const confirmDelete = async () => {
    if (!articleToDeleteUrl) return;

    try {
      const updatedList = await deleteArticle(articleToDeleteUrl);
      setArticles(updatedList);
      Alert.alert('Sukses', 'Artikel berhasil dihapus!');
      if (currentArticle?.url === articleToDeleteUrl) {
        resetFormAndCloseModal();
      }
    } catch (e: any) {
      Alert.alert('Error', `Gagal menghapus artikel: ${e.message || 'Error tidak diketahui'}`);
    } finally {
      setDeleteConfirmModalVisible(false);
      setArticleToDeleteUrl(null);
    }
  };

  // Clear all data - opens confirmation modal
  const handleClearAll = async () => {
    setClearAllConfirmModalVisible(true);
  };

  // New function to handle the actual deletion after confirmation
  const confirmClearAll = async () => {
    try {
      await clearAllArticles();
      await loadArticles(); // Reload articles after clearing
      resetFormAndCloseModal();
      Alert.alert('Sukses', 'Semua berita berhasil dihapus.');
    } catch (e: any) {
      Alert.alert('Error', `Gagal menghapus semua artikel: ${e.message || 'Error tidak diketahui'}`);
    } finally {
      setClearAllConfirmModalVisible(false);
    }
  };


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-2 text-base text-gray-500">Memuat berita dari penyimpanan lokal...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-red-600 text-lg text-center">Error: {error}</Text>
        <TouchableOpacity onPress={loadArticles} className="mt-4 p-3 bg-blue-500 rounded-lg">
          <Text className="text-white font-semibold">Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListHeaderComponent={
          <ListHeader
            onAddArticle={handleAddArticle}
            onClearAll={handleClearAll}
          />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center bg-white mt-10">
            <Text className="text-base text-gray-600">Tidak ada artikel berita yang tersimpan.</Text>
            <Text className="text-sm text-gray-500 mt-2">Coba tambahkan yang baru di atas!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => Linking.openURL(item.url).catch(err => console.error("Gagal membuka URL:", err))}
            onEdit={() => handleEdit(item)}
            onDelete={() => openDeleteConfirmModal(item.url)}
            formatDate={formatDate}
          />
        )}
      />

      <ArticleFormModal
        isVisible={isFormModalVisible}
        editMode={editMode}
        currentArticle={currentArticle} // Pass currentArticle to the modal
        onClose={resetFormAndCloseModal}
        onSubmit={handleSubmit} // handleSubmit now receives article data from the modal
      />

      <DeleteConfirmModal
        isVisible={isDeleteConfirmModalVisible}
        onClose={() => setDeleteConfirmModalVisible(false)}
        onConfirm={confirmDelete}
      />

      <ClearAllConfirmModal
        isVisible={isClearAllConfirmModalVisible}
        onClose={() => setClearAllConfirmModalVisible(false)}
        onConfirm={confirmClearAll}
      />

    </View>
  );
}