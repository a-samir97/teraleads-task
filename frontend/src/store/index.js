import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientReducer from './slices/patientSlice';
import chatbotReducer from './slices/chatbotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    chatbot: chatbotReducer,
  },
}); 