import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { Article } from '@/type/news';

interface ArticleFormModalProps {
  isVisible: boolean;
  editMode: boolean;
  currentArticle: Article | null;
  onClose: () => void;
  onSubmit: () => void;
  inputTitle: string;
  setInputTitle: (text: string) => void;
  inputDescription: string;
  setInputDescription: (text: string) => void;
  inputUrl: string;
  setInputUrl: (text: string) => void;
  inputImage: string;
  setInputImage: (text: string) => void;
  inputSource: string;
  setInputSource: (text: string) => void;
}

const ArticleFormModal: React.FC<ArticleFormModalProps> = ({
  isVisible,
  editMode,
  onClose,
  onSubmit,
  inputTitle,
  setInputTitle,
  inputDescription,
  setInputDescription,
  inputUrl,
  setInputUrl,
  inputImage,
  setInputImage,
  inputSource,
  setInputSource,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center bg-black/50"
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>
        <View className="w-11/12 bg-white rounded-lg p-6 shadow-xl">
          <Text className="text-2xl font-bold mb-4 text-blue-800 text-center">
            {editMode ? 'Edit Artikel' : 'Tambah Artikel Baru'}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-3 text-base bg-white"
              placeholder="Judul Berita"
              value={inputTitle}
              onChangeText={setInputTitle}
            />
            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-3 text-base bg-white"
              placeholder="Deskripsi"
              value={inputDescription}
              onChangeText={setInputDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TextInput
              className={`border border-gray-300 p-3 rounded-md mb-3 text-base bg-white ${editMode ? 'bg-gray-200' : ''}`}
              placeholder="URL Artikel (Harus Unik)"
              value={inputUrl}
              onChangeText={setInputUrl}
              editable={!editMode}
            />
            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-3 text-base bg-white"
              placeholder="URL Gambar (Opsional)"
              value={inputImage}
              onChangeText={setInputImage}
            />
            <TextInput
              className="border border-gray-300 p-3 rounded-md mb-5 text-base bg-white"
              placeholder="Nama Sumber (Misal: Tech Daily)"
              value={inputSource}
              onChangeText={setInputSource}
            />
          </ScrollView>
          <View className="flex-row justify-around mt-4">
            <TouchableOpacity
              onPress={onSubmit}
              className={`flex-1 p-3 rounded-lg mr-2 ${editMode ? 'bg-orange-500' : 'bg-blue-600'}`}
            >
              <Text className="text-white font-bold text-center text-base">{editMode ? 'Simpan Perubahan' : 'Tambahkan'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} className="flex-1 p-3 rounded-lg bg-gray-400 ml-2">
              <Text className="text-white font-bold text-center text-base">Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ArticleFormModal;