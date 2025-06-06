import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientReducer from './slices/patientSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
  },
});

export default store;
