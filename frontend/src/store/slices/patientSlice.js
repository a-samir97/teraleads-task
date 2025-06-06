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

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/patients/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (patientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/patients/', patientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/patients/${id}/`, patientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/patients/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  patients: [],
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(p => p.id !== action.payload);
      });
  },
});

export default patientSlice.reducer; 