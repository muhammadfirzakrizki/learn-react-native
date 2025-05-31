import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    FlatList,
    ScrollView,
    Modal,
    Alert,
    Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const CATEGORIES = ["Pribadi", "Kerja", "Belajar"];

type Todo = {
    id: number;
    activity: string;
    category: string;
    date: string;
    completed: boolean;
};

export default function HomeScreen() {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            activity: "Belajar React Native",
            category: "Belajar",
            date: "2025-06-01",
            completed: false,
        },
        {
            id: 2,
            activity: "Meeting Proyek",
            category: "Kerja",
            date: "2025-06-02",
            completed: true,
        },
    ]);

    // Modal states
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    // Form states
    const [activity, setActivity] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

    const formattedDate = date.toISOString().split("T")[0];

    // Open modal tambah
    const openAddModal = () => {
        setActivity("");
        setCategory(CATEGORIES[0]);
        setDate(new Date());
        setModalMode("add");
        setModalVisible(true);
    };

    // Open modal edit
    const openEditModal = (todo: Todo) => {
        setActivity(todo.activity);
        setCategory(todo.category);
        setDate(new Date(todo.date));
        setSelectedTodoId(todo.id);
        setModalMode("edit");
        setModalVisible(true);
    };

    // Simulasi tambah todo
    const handleSaveTodo = () => {
        if (activity.length < 3) {
            Alert.alert("Validasi", "Kegiatan harus minimal 3 karakter.");
            return;
        }
        if (modalMode === "add") {
            const newTodo: Todo = {
                id: Date.now(),
                activity,
                category,
                date: formattedDate,
                completed: false,
            };
            setTodos((prev) => [...prev, newTodo]);
        } else if (modalMode === "edit" && selectedTodoId !== null) {
            setTodos((prev) =>
                prev.map((t) =>
                    t.id === selectedTodoId
                        ? { ...t, activity, category, date: formattedDate }
                        : t
                )
            );
        }
        setModalVisible(false);
    };

    // Open delete konfirmasi
    const openDeleteModal = (todoId: number) => {
        setSelectedTodoId(todoId);
        setDeleteModalVisible(true);
    };

    // Hapus todo
    const handleDeleteTodo = () => {
        if (selectedTodoId !== null) {
            setTodos((prev) => prev.filter((t) => t.id !== selectedTodoId));
        }
        setDeleteModalVisible(false);
    };

    // Check Box untuk toggle status selesai
    const toggleCompletion = (id: number, currentStatus: boolean) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !currentStatus } : todo
            )
        );
    };

    const screenWidth = Dimensions.get("window").width;

    return (
        <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
            <Text className="text-3xl font-bold text-center mb-6 text-blue-700">
                LifeHub - Todo Manager
            </Text>

            {/* Tombol Tambah Todo */}
            <TouchableOpacity
                onPress={openAddModal}
                className="bg-blue-600 flex-row justify-center items-center p-3 rounded-xl mb-6"
            >
                <Ionicons name="add-circle-outline" size={20} color="white" />
                <Text className="text-white text-center font-semibold ml-2">
                    Tambah Todo
                </Text>
            </TouchableOpacity>

            {/* List Todos */}
            <Text className="text-xl font-bold mb-3 text-gray-700">Daftar Kegiatan</Text>
            <FlatList
                data={todos}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-xl shadow-sm mb-3 flex-row justify-between items-center">
                        <View className="flex-row items-center gap-3 flex-1">
                            <Checkbox
                                value={item.completed}
                                onValueChange={() => toggleCompletion(item.id, item.completed)}
                            />

                            <View className="flex-1">
                                <Text
                                    className="font-medium"
                                    style={{
                                        color: item.completed ? "#6B7280" : "#111827",
                                        textDecorationLine: item.completed ? "line-through" : "none",
                                    }}
                                >
                                    {item.activity}
                                </Text>
                                <Text className="text-sm text-gray-600" style={{
                                    color: item.completed ? "#6B7280" : "#111827",
                                    textDecorationLine: item.completed ? "line-through" : "none",
                                }}>
                                    {item.category} - {item.date}
                                </Text>
                            </View>
                        </View>

                        {/* Icon Aksi */}
                        <View className="flex-row items-center gap-3 ml-2">
                            <TouchableOpacity
                                onPress={() => openEditModal(item)}
                                className="bg-blue-500 p-2 rounded-full shadow"
                                activeOpacity={0.7}
                            >
                                <Feather name="edit" size={20} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => openDeleteModal(item.id)}
                                className="bg-red-500 p-2 rounded-full shadow"
                                activeOpacity={0.7}
                            >
                                <MaterialIcons name="delete-outline" size={22} color="white" />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            />

            {/* Modal Tambah/Edit */}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    className="flex-1 justify-center items-center bg-black bg-opacity-60 px-6"
                    style={
                        Platform.OS === "web"
                            ? { backdropFilter: "blur(5px)" }
                            : {}
                    }
                >
                    <View className="bg-white rounded-3xl p-8 w-full max-w-md shadow-lg">
                        {/* Header dengan ikon */}
                        <View className="flex-row items-center mb-6 gap-3">
                            {modalMode === "add" ? (
                                <Feather name="plus-circle" size={32} color="#2563EB" />
                            ) : (
                                <Feather name="edit-3" size={32} color="#2563EB" />
                            )}
                            <Text className="text-3xl font-extrabold text-gray-900">
                                {modalMode === "add" ? "Tambah Todo" : "Edit Todo"}
                            </Text>
                        </View>

                        <View className="flex-row items-center mb-3 gap-2">
                            <Feather name="activity" size={20} color="#4B5563" />
                            <Text className="text-gray-700 font-semibold">Kegiatan :</Text>
                        </View>
                        {/* Input Nama Kegiatan */}
                        <TextInput
                            className="border border-gray-300 p-4 rounded-2xl mb-5 bg-gray-50 focus:border-blue-500"
                            placeholder="Nama kegiatan"
                            value={activity}
                            onChangeText={setActivity}
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                            }}
                        />

                        {/* Label Kategori dengan ikon */}
                        <View className="flex-row items-center mb-3 gap-2">
                            <Feather name="tag" size={20} color="#4B5563" />
                            <Text className="text-gray-700 font-semibold">Kategori:</Text>
                        </View>
                        <View className="border border-gray-300 rounded-2xl mb-6 overflow-hidden">
                            <Picker
                                selectedValue={category}
                                onValueChange={(itemValue: any) => setCategory(itemValue)}
                                style={{ height: 50, width: "100%" }}
                                dropdownIconColor="#2563EB"
                            >
                                {CATEGORIES.map((cat) => (
                                    <Picker.Item label={cat} value={cat} key={cat} />
                                ))}
                            </Picker>
                        </View>

                        {/* Label Tanggal dengan ikon */}
                        <View className="flex-row items-center mb-3 gap-2">
                            <Feather name="calendar" size={20} color="#4B5563" />
                            <Text className="text-gray-700 font-semibold">Tanggal:</Text>
                        </View>
                        {Platform.OS === "web" ? (
                            <input
                                type="date"
                                value={formattedDate}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: 14,
                                    borderRadius: 16,
                                    marginBottom: 24,
                                    backgroundColor: "#f9f9f9",
                                    width: "100%",
                                    fontSize: 16,
                                    fontWeight: "500",
                                    outlineColor: "#2563EB",
                                }}
                            />
                        ) : (
                            <>
                                <TouchableOpacity
                                    onPress={() => setShowDate(true)}
                                    className="mb-5 p-4 border border-gray-300 rounded-2xl bg-gray-50 flex-row items-center"
                                >
                                    <Feather name="calendar" size={20} color="#2563EB" style={{ marginRight: 8 }} />
                                    <Text className="text-gray-900 font-medium" style={{ fontSize: 16 }}>
                                        {date.toDateString()}
                                    </Text>
                                </TouchableOpacity>
                                {showDate && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={(_, selectedDate) => {
                                            setShowDate(false);
                                            if (selectedDate) setDate(selectedDate);
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {/* Buttons */}
                        <View className="flex-row justify-end gap-5 mt-6">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="px-6 py-3 rounded-3xl border border-gray-400 flex-row items-center gap-2"
                                activeOpacity={0.7}
                            >
                                <Feather name="x" size={20} color="#374151" />
                                <Text className="text-gray-700 font-semibold text-lg">Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if (Platform.OS === 'web') {
                                        const confirmed = window.confirm(
                                            modalMode === "add"
                                                ? "Apakah kamu yakin ingin menambahkan todo ini?"
                                                : "Apakah kamu yakin ingin menyimpan perubahan?"
                                        );
                                        if (confirmed) {
                                            handleSaveTodo();
                                        }
                                    } else {
                                        Alert.alert(
                                            modalMode === "add" ? "Konfirmasi Tambah" : "Konfirmasi Edit",
                                            modalMode === "add"
                                                ? "Apakah kamu yakin ingin menambahkan todo ini?"
                                                : "Apakah kamu yakin ingin menyimpan perubahan?",
                                            [
                                                {
                                                    text: "Batal",
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "Ya, Lanjutkan",
                                                    onPress: handleSaveTodo,
                                                },
                                            ],
                                            { cancelable: true }
                                        );
                                    }
                                }}

                                className="bg-blue-600 px-6 py-3 rounded-3xl flex-row items-center gap-2"
                                activeOpacity={0.8}
                            >
                                <Feather name="check" size={20} color="white" />
                                <Text className="text-white font-semibold text-lg">
                                    {modalMode === "add" ? "Tambah" : "Simpan"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* Modal Delete Konfirmasi */}
            <Modal
                visible={deleteModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
                    <View className="bg-white rounded-3xl p-8 w-full max-w-xs shadow-lg">
                        {/* Ikon warning besar */}
                        <View className="items-center mb-6">
                            <MaterialIcons name="warning" size={48} color="#DC2626" />
                        </View>

                        {/* Judul */}
                        <Text className="text-center text-2xl font-extrabold text-red-600 mb-3">
                            Peringatan!
                        </Text>

                        {/* Pesan */}
                        <Text className="text-center text-gray-700 text-base mb-6 px-4">
                            Apakah kamu yakin ingin menghapus todo ini? Tindakan ini tidak dapat
                            dibatalkan.
                        </Text>

                        {/* Tombol */}
                        <View className="flex-row justify-center gap-6">
                            <TouchableOpacity
                                onPress={() => setDeleteModalVisible(false)}
                                className="px-6 py-3 rounded-2xl border border-gray-400 flex-row items-center gap-2"
                                activeOpacity={0.7}
                            >
                                <MaterialIcons name="cancel" size={22} color="#374151" />
                                <Text className="text-gray-700 font-semibold text-lg">Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDeleteTodo}
                                className="bg-red-600 px-6 py-3 rounded-2xl flex-row items-center gap-2"
                                activeOpacity={0.8}
                            >
                                <MaterialIcons name="delete" size={22} color="white" />
                                <Text className="text-white font-semibold text-lg">Hapus</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
