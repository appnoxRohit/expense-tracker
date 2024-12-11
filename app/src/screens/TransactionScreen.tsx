import React, { useState, useMemo } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { clearTransactions } from "../store/Slices/TransactionSlice";

const TransactionsPage = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  console.log(transactions);
  

  const filters = ["All", "income", "expense"];

    const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (selectedFilter === "All") return true;
      if (selectedFilter === "income") return transaction.category === "income";
      if (selectedFilter === "expense")
        return transaction.category === "expense";
    });
  }, [transactions, selectedFilter]);
  console.log(filteredTransactions)

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Transactions</Text>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={styles.filterItem}
              onPress={() => {
                setSelectedFilter(filter);
                setFilterModalVisible(false);
              }}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const handleClearTransactions = () => {
    dispatch(clearTransactions());
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#082c05", "#169e1d", "#88e578"]}
        style={styles.gradientBackground}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Transactions</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.filterButtonText}>
              Filter: {selectedFilter}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {transactions ?  (
            <>
              <View style={styles.transactionsContainer}>
                {filteredTransactions.map((transaction) => (
                  <TouchableOpacity
                    key={transaction.id}
                    style={styles.transactionItem}
                  >
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionTitle}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionCategory}>
                        {transaction.category}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {transaction.date}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.category === "expense"
                          ? styles.expenseText
                          : styles.incomeText,
                      ]}
                    >
                      {transaction.category === "income" ? "+" : "-"}$
                      {Math.abs(transaction.amount).toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>):
            (
            <View style={styles.transactionsContainer2}>
              <Text>Sorry Nothing To Show !</Text>
            </View>
          ) 
          }

          <TouchableOpacity onPress={handleClearTransactions}>
            <View style={styles.clearBtn}>
              <Text style={{ color: "red", fontWeight: "500" }}>
                Clear Recent Transactions
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
      {renderFilterModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  pageTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  filterButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  filterButtonText: { color: "white", fontWeight: "bold" },
  scrollContent: { paddingVertical: 10, paddingHorizontal: 15 },
  transactionsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
  },
  transactionsContainer2: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignContent: "center",
    alignItems: "center",
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  transactionDetails: { flex: 1, marginRight: 10 },
  transactionTitle: { fontSize: 16, fontWeight: "bold" },
  transactionCategory: { fontSize: 14, color: "#666", marginTop: 5 },
  transactionDate: { fontSize: 12, color: "#999", marginTop: 5 },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
  expenseText: { color: "red" },
  incomeText: { color: "green" },
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
  filterItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterText: { fontSize: 16, textAlign: "center" },
  clearBtn: {
    width: "100%",
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
});

export default TransactionsPage;
