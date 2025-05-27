import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface ClearAllConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ClearAllConfirmModal: React.FC<ClearAllConfirmModalProps> = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* This View fills the screen and centers its content, and has the backdrop color */}
      <View className="flex-1 justify-center items-center bg-black/50">
        {/*
          This TouchableWithoutFeedback is the *single child* of the outer View.
          Its direct child (the View below) needs to fill the whole space,
          and handle the tapping to close the modal.
        */}
        <TouchableWithoutFeedback onPress={onClose}>
          {/*
            This View is the single direct child of TouchableWithoutFeedback.
            It's a container that ensures the tap-to-close area covers the
            entire modal backdrop, and also implicitly centers the modal content.
          */}
          <View className="flex-1 justify-center items-center">
            {/*
              This is the actual modal content. It's wrapped in *another*
              TouchableWithoutFeedback with an empty onPress handler to
              prevent the outer TFWB from triggering when you tap inside the modal itself.
              This needs to be a direct child of the centering View.
            */}
            <TouchableWithoutFeedback onPress={() => { /* Prevents closing when tapping on modal content */ }}>
              {/* This is the actual modal box */}
              <View className="w-4/5 bg-white rounded-lg p-6 shadow-xl">
                <Text className="text-xl font-bold mb-4 text-red-700 text-center">
                  Konfirmasi Hapus Semua Data
                </Text>
                <Text className="text-base mb-6 text-gray-700 text-center">
                  Anda yakin ingin menghapus **SEMUA** berita lokal? Tindakan ini **TIDAK BISA DIBATALKAN**.
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
                    <Text className="text-white font-bold text-center">Hapus Semua</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ClearAllConfirmModal;