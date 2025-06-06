import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
} from '@mui/material';
import { createPatient, updatePatient, fetchPatients } from '../store/slices/patientSlice';

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  date_of_birth: '',
  gender: '',
  address: '',
  medical_history: '',
  status: 'active',
};

function PatientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patients);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const patient = patients.find((p) => p.id === parseInt(id));
      if (patient) {
        setFormData(patient);
      }
    }
  }, [id, patients]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number is invalid';
    }
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const patientData = {
        user: {
          username: formData.email.split('@')[0], // Generate username from email
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: 'changeme123' // Default password that should be changed
        },
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        phone_number: formData.phone_number,
        address: formData.address,
        medical_history: formData.medical_history || '',
        allergies: formData.allergies || ''
      };

      if (id) {
        await dispatch(updatePatient({ id: parseInt(id), patientData }));
      } else {
        await dispatch(createPatient(patientData));
      }
      if (!error) {
        navigate('/patients');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Patient' : 'Add New Patient'}
      </Typography>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.detail || 'An error occurred'}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                error={!!errors.phone_number}
                helperText={errors.phone_number}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                error={!!errors.date_of_birth}
                helperText={errors.date_of_birth}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={2}
                error={!!errors.address}
                helperText={errors.address}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical History"
                name="medical_history"
                value={formData.medical_history}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/patients')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : id ? 'Update Patient' : 'Add Patient'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default PatientForm;
