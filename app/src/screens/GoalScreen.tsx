import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Modal,
  TextInput 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GoalsPage = () => {
  const [isAddGoalModalVisible, setIsAddGoalModalVisible] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');

  const [goals, setGoals] = useState([
    { 
      id: 1, 
      name: 'Emergency Fund', 
      currentAmount: 2000, 
      targetAmount: 5000,
      progress: 0.4 
    },
    { 
      id: 2, 
      name: 'Vacation Trip', 
      currentAmount: 500, 
      targetAmount: 3000,
      progress: 0.02 
    },
    { 
      id: 3, 
      name: 'New Laptop', 
      currentAmount: 1200, 
      targetAmount: 2000,
      progress: 0.6 
    },
  ]);

  const handleAddGoal = () => {
    if (newGoalName && newGoalAmount) {
      const newGoal = {
        id: goals.length + 1,
        name: newGoalName,
        currentAmount: 0,
        targetAmount: parseFloat(newGoalAmount),
        progress: 0
      };
      setGoals([...goals, newGoal]);
      setNewGoalName('');
      setNewGoalAmount('');
      setIsAddGoalModalVisible(false);
    }
  };

  const renderAddGoalModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddGoalModalVisible}
      onRequestClose={() => setIsAddGoalModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Goal</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Goal Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter goal name"
              value={newGoalName}
              onChangeText={setNewGoalName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Target Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter target amount"
              keyboardType="numeric"
              value={newGoalAmount}
              onChangeText={setNewGoalAmount}
            />
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddGoal}
          >
            <Text style={styles.addButtonText}>Create Goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#082c05', '#169e1d', '#88e578']}
        style={styles.gradientBackground}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Savings Goals</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAddGoalModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Goal</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.goalsContainer}>
            {goals.map(goal => (
              <View key={goal.id} style={styles.goalItem}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalAmount}>
                  ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${goal.progress * 100}%` }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(goal.progress * 100)}% Complete
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>

      {renderAddGoalModal()}
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
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  goalsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  goalItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalAmount: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#169e1d',
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
});

export default GoalsPage;