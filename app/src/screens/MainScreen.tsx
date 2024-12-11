import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearTransactions, deleteTransaction } from "../store/Slices/TransactionSlice";
import AntDesign from "@expo/vector-icons/AntDesign";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { balance, income, expense } = useSelector(
    (state: any) => state.transaction
  );
  console.log("Balance:", balance, "Income:", income, "Expense:", expense);
  
  const handleDelete = (id,category) => {
    // console.log(category)
      // console.log("all three",id,category,Transactions)
    dispatch(deleteTransaction({id,category,Transactions}))

  }

  const Transactions = useSelector((state) => state.transaction.transactions);


  const totalBalance = 50000;
  let peiBalance = balance / totalBalance;
  let peiExpense = -expense / totalBalance;

  const data = {
    labels: ["Balance", "Expense"],
    data: [peiBalance, peiExpense],
  };

  const chartConfig = {
    backgroundGradientFrom: "#2b293a",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#100f24",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const screenWidth = Dimensions.get("window").width;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleReset = () => {
    setIsModalVisible(true);
  };

  const handleConfirmReset = () => {
    dispatch(clearTransactions());
    setIsModalVisible(false);
  };

  const handleCancelReset = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#082c05", "#169e1d", "#88e578"]}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.balanceContainer}>
            <ProgressChart
              data={data}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
            <Text style={styles.balanceAmount}>₹{balance}</Text>
          </View>

          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("Expense")}
            >
              <Text style={styles.actionButtonText}>Add Expense/Income</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleReset}>
              <Text style={styles.deleteBtn}>Reset Balance</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            {Transactions.slice(-4)
              .reverse()
              .map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View>
                    <Text style={styles.transactionTitle}>
                      {transaction.description}
                    </Text>
                    <Text style={{ color: "grey", fontSize: 10, gap: 10 }}>
                      {new Date(transaction.date).toISOString().slice(0, 10)}
                    </Text>
                  </View>
                  <View
                    style={{  flexDirection: "row",gap:15 }}
                  >
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.category === "expense"
                          ? styles.expenseText
                          : styles.incomeText,
                      ]}
                    >
                      {transaction.category === "income" ? "+" : "-"}₹
                      {Math.abs(transaction.amount).toLocaleString()}
                    </Text>
                    <TouchableOpacity onPress={()=>handleDelete(transaction.id,transaction.category)}>
                      <AntDesign name="delete" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>See All Transactions</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelReset}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to reset?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancelReset}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmReset}>
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  balanceContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  balanceAmount: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteBtn: {
    color: "black",
    fontWeight: "bold",
  },
  transactionsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  transactionTitle: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseText: {
    color: "red",
  },
  incomeText: {
    color: "green",
  },
  seeAllButton: {
    marginTop: 15,
    alignItems: "center",
  },
  seeAllButtonText: {
    color: "#169e1d",
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalCancelText: {
    color: "red",
    fontWeight: "bold",
  },
  modalConfirmText: {
    color: "green",
    fontWeight: "bold",
  },
});

export default Home;
