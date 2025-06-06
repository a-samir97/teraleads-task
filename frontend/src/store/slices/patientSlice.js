import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/patients/`, {
        headers: getAuthHeader(),
      });
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
      const response = await axios.post(`${API_URL}/api/patients/`, patientData, {
        headers: getAuthHeader(),
      });
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
      const response = await axios.put(`${API_URL}/api/patients/${id}/`, patientData, {
        headers: getAuthHeader(),
      });
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
      await axios.delete(`${API_URL}/api/patients/${id}/`, {
        headers: getAuthHeader(),
      });
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch patients
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
      // Create patient
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete patient
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.filter(p => p.id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = patientSlice.actions;
export default patientSlice.reducer;
