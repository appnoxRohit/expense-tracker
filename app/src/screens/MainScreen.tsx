import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { balance, income, expense } = useSelector(
    (state: any) => state.transaction
  );

  console.log("balance:", balance, income, expense);

  const totalBalance = 10000;
  let peiBalance = (balance / totalBalance) ;
  let peiExpense = 1000;

  const data = {
    labels: ["Balance", "Expense", ],
    data: [peiBalance, peiExpense, ],
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

  const recentTransactions = [
    { id: 1, title: "Grocery Shopping", amount: -85.5, date: "2024-02-15" },
    { id: 2, title: "Salary", amount: 3200.0, date: "2024-02-10" },
    { id: 3, title: "Dining Out", amount: -45.75, date: "2024-02-12" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#082c05", "#169e1d", "#88e578"]}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.balanceContainer}>
            {/* <Text style={styles.balanceLabel}>Total Balance</Text> */}
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
            {/* <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add Income</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.amount < 0
                      ? styles.expenseText
                      : styles.incomeText,
                  ]}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toLocaleString()}
                </Text>
              </View>
            ))}
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonText}>See All Transactions</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
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
  balanceLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginBottom: 10,
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
});

export default Home;
