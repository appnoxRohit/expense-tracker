import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import transactionReducer from './Slices/TransactionSlice';
import goalReducer from './Slices/GoalSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['transaction', 'goal'], 
};

const rootReducer = combineReducers({
  transaction: transactionReducer,
  goal: goalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
