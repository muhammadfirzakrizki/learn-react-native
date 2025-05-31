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
            setTodos((prev) => [newTodo, ...prev]);
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
                        <View className="flex-row items-center gap-2 ml-2">
                            <TouchableOpacity onPress={() => openEditModal(item)}>
                                <Feather name="edit" size={20} color="#4B5563" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openDeleteModal(item.id)}>
                                <MaterialIcons name="delete-outline" size={22} color="#EF4444" />
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
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
                    <View className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <Text className="text-2xl font-bold mb-4 text-gray-800">
                            {modalMode === "add" ? "Tambah Todo" : "Edit Todo"}
                        </Text>

                        <TextInput
                            className="border border-gray-300 p-3 rounded-xl mb-4 bg-gray-50"
                            placeholder="Nama kegiatan"
                            value={activity}
                            onChangeText={setActivity}
                        />

                        <Text className="mb-2 text-gray-600">Kategori:</Text>
                        <View className="border border-gray-300 rounded-xl mb-4">
                            <Picker
                                selectedValue={category}
                                onValueChange={(itemValue) => setCategory(itemValue)}
                                style={{ height: 40, width: "100%" }}
                                dropdownIconColor="#2563EB"
                            >
                                {CATEGORIES.map((cat) => (
                                    <Picker.Item label={cat} value={cat} key={cat} />
                                ))}
                            </Picker>
                        </View>

                        <Text className="mb-2 text-gray-600">Tanggal:</Text>
                        {Platform.OS === "web" ? (
                            <input
                                type="date"
                                value={formattedDate}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: 12,
                                    borderRadius: 12,
                                    marginBottom: 16,
                                    backgroundColor: "#f9f9f9",
                                    width: "100%",
                                }}
                            />
                        ) : (
                            <>
                                <TouchableOpacity
                                    onPress={() => setShowDate(true)}
                                    className="mb-3 p-3 border border-gray-300 rounded-xl bg-gray-50"
                                >
                                    <Text className="text-gray-800">{date.toDateString()}</Text>
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
                        <View className="flex-row justify-end gap-4 mt-4">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="px-4 py-2 rounded-xl border border-gray-400"
                            >
                                <Text className="text-gray-700 font-semibold">Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSaveTodo}
                                className="bg-blue-600 px-4 py-2 rounded-xl"
                            >
                                <Text className="text-white font-semibold">
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
                <View className="flex-1 justify-center items-center bg-black bg-opacity-40 px-6">
                    <View className="bg-white rounded-2xl p-6 w-full max-w-xs">
                        <Text className="text-xl font-semibold mb-4 text-gray-800 text-center">
                            Yakin ingin menghapus todo ini?
                        </Text>

                        <View className="flex-row justify-center gap-6">
                            <TouchableOpacity
                                onPress={() => setDeleteModalVisible(false)}
                                className="px-6 py-2 rounded-xl border border-gray-400"
                            >
                                <Text className="text-gray-700 font-semibold text-center">Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDeleteTodo}
                                className="bg-red-600 px-6 py-2 rounded-xl"
                            >
                                <Text className="text-white font-semibold text-center">Hapus</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
