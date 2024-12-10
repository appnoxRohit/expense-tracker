import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Modal 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TransactionsPage = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Mock transaction data - replace with actual data from your state management
  const transactions = [
    { 
      id: 1, 
      title: 'Grocery Shopping', 
      amount: -85.50, 
      date: '2024-02-15', 
      category: 'Food' 
    },
    { 
      id: 2, 
      title: 'Salary', 
      amount: 3200.00, 
      date: '2024-02-10', 
      category: 'Income' 
    },
    { 
      id: 3, 
      title: 'Dining Out', 
      amount: -45.75, 
      date: '2024-02-12', 
      category: 'Entertainment' 
    },
    { 
      id: 4, 
      title: 'Utility Bill', 
      amount: -120.00, 
      date: '2024-02-05', 
      category: 'Utilities' 
    },
  ];

  const filters = ['All', 'Income', 'Expense'];

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

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Income') return transaction.amount > 0;
    if (selectedFilter === 'Expense') return transaction.amount < 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#082c05', '#169e1d', '#88e578']}
        style={styles.gradientBackground}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Transactions</Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.filterButtonText}>Filter: {selectedFilter}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.transactionsContainer}>
            {filteredTransactions.map(transaction => (
              <TouchableOpacity 
                key={transaction.id} 
                style={styles.transactionItem}
              >
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text 
                  style={[
                    styles.transactionAmount, 
                    transaction.amount < 0 ? styles.expenseText : styles.incomeText
                  ]}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>

      {renderFilterModal()}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  filterButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionDetails: {
    flex: 1,
    marginRight: 10,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseText: {
    color: 'red',
  },
  incomeText: {
    color: 'green',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TransactionsPage;