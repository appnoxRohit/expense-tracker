import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  transactions: [],
  income: 0,
  expense: 0,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const transaction = action.payload;
      state.transactions.push(transaction);
      

      if (transaction.type === 'income') {
        state.income += transaction.amount;
        state.balance += transaction.amount;
      } else if (transaction.type === 'expense') {
        state.expense -= transaction.amount;
        state.balance -= transaction.amount;
      }
    },
    deleteTransaction: (state, action) => {
      const transactionId = action.payload;
      state.transactions = state.transactions.filter(t => t.id !== transactionId);
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.income = 0;
      state.expense = 0;
      state.balance = 0;
    },
  },
});

export const { addTransaction, deleteTransaction, clearTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
