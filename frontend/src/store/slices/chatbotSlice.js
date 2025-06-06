import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with auth header
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/chatbot/ask/', { question: message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          type: 'user',
          content: action.payload.question,
          timestamp: new Date().toISOString(),
        });
        state.messages.push({
          type: 'bot',
          content: action.payload.answer,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = chatbotSlice.actions;
export default chatbotSlice.reducer; 