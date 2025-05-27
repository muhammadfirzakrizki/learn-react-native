import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface DeleteConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-white rounded-lg p-6 shadow-xl">
            <Text className="text-xl font-bold mb-4 text-red-700 text-center">Konfirmasi Hapus</Text>
            <Text className="text-base mb-6 text-gray-700 text-center">
              Anda yakin ingin menghapus artikel ini? Tindakan ini tidak bisa dibatalkan.
            </Text>
            <View className="flex-row justify-around">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 p-3 rounded-lg bg-gray-400 mr-2"
              >
                <Text className="text-white font-bold text-center">Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onConfirm}
                className="flex-1 p-3 rounded-lg bg-red-600 ml-2"
              >
                <Text className="text-white font-bold text-center">Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteConfirmModal;