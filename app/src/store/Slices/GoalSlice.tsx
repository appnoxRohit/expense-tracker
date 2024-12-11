import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: [],
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      const goal = action.payload; 
      state.goals.push(goal);
    },
    updateGoal: (state, action) => {
      const { id, updatedData } = action.payload; 
      const goalIndex = state.goals.findIndex(goal => goal.id === id);
      if (goalIndex !== -1) {
        state.goals[goalIndex] = { ...state.goals[goalIndex], ...updatedData };
      }
    },
    deleteGoal: (state, action) => {
      const goalId = action.payload; 
      state.goals = state.goals.filter(goal => goal.id !== goalId);
    },
    updateProgress: (state, action) => {
      const { id, currentAmount } = action.payload; 
      const goalIndex = state.goals.findIndex(goal => goal.id === id);
      if (goalIndex !== -1) {
        state.goals[goalIndex].currentAmount = currentAmount;
        state.goals[goalIndex].progress = currentAmount / state.goals[goalIndex].targetAmount;
      }
    },
    clearGoals: (state) => {
      state.goals = [];
    },
  },
});

export const { addGoal, updateGoal, deleteGoal, updateProgress, clearGoals } = goalSlice.actions;

export default goalSlice.reducer;
