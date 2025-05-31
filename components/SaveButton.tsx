import { Alert, TouchableOpacity, Text, Platform } from 'react-native';

const SaveButton = () => {

    const handleSave = () => {
        if (Platform.OS === 'web') {
            const confirm = window.confirm("Apakah kamu yakin ingin menyimpan data ini?");
            if (confirm) {
                window.alert("Data berhasil disimpan!");
                // Lanjut simpan data di sini
            }
        } else {
            Alert.alert(
                "Konfirmasi Simpan",
                "Apakah kamu yakin ingin menyimpan data ini?",
                [
                    { text: "Batal", style: "cancel" },
                    {
                        text: "Ya, Simpan",
                        onPress: () => {
                            Alert.alert("Berhasil", "Data telah disimpan!");
                            // Lanjut simpan data di sini
                        }
                    }
                ]
            );
        }
    };


    return (
        <TouchableOpacity
            onPress={handleSave}
            style={{
                backgroundColor: "#2563EB",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 20,
            }}
        >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Simpan</Text>
        </TouchableOpacity>
    );
};

export default SaveButton;
