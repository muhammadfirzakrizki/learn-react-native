// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/type/news'; // Sesuaikan path jika TabOneScreen berada di lokasi lain

const NEWS_STORAGE_KEY = '@local_news_articles';

/**
 * Mengambil semua artikel berita dari AsyncStorage.
 * @returns Promise<Article[]>
 */
export const getArticles = async (): Promise<Article[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(NEWS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading articles from AsyncStorage", e);
    return []; // Return empty array on error
  }
};

/**
 * Menyimpan array artikel berita ke AsyncStorage.
 * @param articles Artikel yang akan disimpan.
 * @returns Promise<void>
 */
export const saveArticles = async (articles: Article[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(articles);
    await AsyncStorage.setItem(NEWS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving articles to AsyncStorage", e);
  }
};

/**
 * Menambahkan artikel baru ke penyimpanan.
 * @param newArticle Artikel baru yang akan ditambahkan.
 * @returns Promise<Article[]> Artikel terbaru setelah penambahan.
 */
export const addArticle = async (newArticle: Article): Promise<Article[]> => {
  const currentArticles = await getArticles();
  // Tambahkan validasi duplikat jika perlu (misalnya berdasarkan URL)
  const updatedArticles = [...currentArticles, newArticle];
  await saveArticles(updatedArticles);
  return updatedArticles;
};

/**
 * Memperbarui artikel yang sudah ada berdasarkan URL.
 * @param updatedArticle Artikel dengan perubahan yang akan disimpan (URL sebagai kunci).
 * @returns Promise<Article[]> Artikel terbaru setelah pembaruan.
 */
export const updateArticle = async (updatedArticle: Article): Promise<Article[]> => {
  const currentArticles = await getArticles();
  const updatedArticles = currentArticles.map(article =>
    article.url === updatedArticle.url ? updatedArticle : article
  );
  await saveArticles(updatedArticles);
  return updatedArticles;
};

/**
 * Menghapus artikel berdasarkan URL.
 * @param articleUrl URL artikel yang akan dihapus.
 * @returns Promise<Article[]> Artikel terbaru setelah penghapusan.
 */

export const deleteArticle = async (articleUrl: string): Promise<Article[]> => {
  const currentArticles = await getArticles();
  const filteredArticles = currentArticles.filter(article => article.url !== articleUrl);
  await saveArticles(filteredArticles);
  return filteredArticles;
};

/**
 * Menginisialisasi penyimpanan dengan data dummy jika kosong.
 * @param initialData Data awal jika penyimpanan kosong.
 * @returns Promise<void>
 */
export const initializeArticles = async (initialData: Article[]): Promise<void> => {
  const currentArticles = await getArticles();
  if (currentArticles.length === 0) {
    console.log("Initializing AsyncStorage with dummy data.");
    await saveArticles(initialData);
  } else {
    console.log("AsyncStorage already contains data.");
  }
};

/**
 * Menghapus semua artikel dari penyimpanan (untuk debugging/reset).
 * @returns Promise<void>
 */
export const clearAllArticles = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(NEWS_STORAGE_KEY);
    console.log('All articles cleared from AsyncStorage.');
  } catch (e) {
    console.error('Error clearing articles from AsyncStorage', e);
  }
};