import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/Slices/TransactionSlice";
import Feather from "@expo/vector-icons/Feather";
import Voice from "@react-native-voice/voice";

const ExpensePage = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [result , setResult]= useState('');
  const [error , setError]= useState('');
  const [isRecording , setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = result => setResult(result.value[0]);

  const startRecording = async()=>{
    try {
      await Voice.start('en-US');
      
    } catch (err) {
      setError(err);
      
    }
  }
  const stopRecording = async()=>{
    try {
      await Voice.end();

    } catch (err) {
      setError(err);
      
    }
  }

  const categories = ["income", "expense"];

  const handleAddExpense = () => {
    if (!amount || !category || !description) {
      alert("Please enter both amount and category and description");
      return;
    }
    const newTransaction = {
      id: Date.now(),
      type: `${category}`,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    };
    dispatch(addTransaction(newTransaction));
    setAmount("");
    setCategory("");
    setDescription("");
  };

  const renderCategoryModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCategoryModalVisible}
      onRequestClose={() => setIsCategoryModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Category</Text>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.categoryItem}
              onPress={() => {
                setCategory(cat);
                setIsCategoryModalVisible(false);
              }}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
  console.log("result",result);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#082c05", "#169e1d", "#88e578"]}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.expenseContainer}>
            <Text style={styles.pageTitle}>Add New Expense</Text>

            {/* Amount Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter expense amount"
                placeholderTextColor="#a0a0a0"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Category Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsCategoryModalVisible(true)}
              >
                <Text
                  style={
                    category ? styles.selectedCategory : styles.placeholderText
                  }
                >
                  {category || "Select Category"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.multilineInput}
                placeholder="Add a note (optional)"
                placeholderTextColor="#a0a0a0"
                multiline={true}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddExpense}
              >
                <Text style={styles.addButtonText}>Add Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.micBtn} onPress={isRecording?stopRecording:startRecording}>
                { isRecording ? <Feather name="mic-off" size={24} color="black" /> :      
                  <Feather name="mic" size={24} color="black" />  }     
              </TouchableOpacity>
            </View>
            <View><Text>{result} </Text></View>
          </View>
        </ScrollView>
      </LinearGradient>

      {renderCategoryModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
  },
  expenseContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  multilineInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
  },
  placeholderText: {
    color: "#a0a0a0",
  },
  selectedCategory: {
    color: "#333",
  },
  addButton: {
    backgroundColor: "#169e1d",
    width: "80%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  micBtn: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "20%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ExpensePage;
