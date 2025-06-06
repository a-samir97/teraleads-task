import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import { createPatient, updatePatient } from '../store/slices/patientSlice';

function PatientForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patients, loading, error } = useSelector((state) => state.patients);

  const [formData, setFormData] = React.useState({
    user: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    },
    date_of_birth: '',
    gender: '',
    phone_number: '',
    address: '',
    medical_history: '',
    allergies: '',
  });

  React.useEffect(() => {
    if (id) {
      const patient = patients.find(p => p.id === parseInt(id));
      if (patient) {
        setFormData({
          user: {
            username: patient.user.username,
            email: patient.user.email,
            first_name: patient.user.first_name,
            last_name: patient.user.last_name,
            password: '',
          },
          date_of_birth: patient.date_of_birth,
          gender: patient.gender,
          phone_number: patient.phone_number,
          address: patient.address,
          medical_history: patient.medical_history,
          allergies: patient.allergies,
        });
      }
    }
  }, [id, patients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('user.')) {
      const userField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [userField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the data
    const formattedData = {
      user: {
        username: formData.user.username,
        email: formData.user.email,
        first_name: formData.user.first_name,
        last_name: formData.user.last_name,
        password: formData.user.password,
      },
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      phone_number: formData.phone_number,
      address: formData.address,
      medical_history: formData.medical_history || '',
      allergies: formData.allergies || '',
    };

    const result = await dispatch(
      id
        ? updatePatient({ id, patientData: formattedData })
        : createPatient(formattedData)
    );
    
    if (!result.error) {
      navigate('/patients');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Patient' : 'New Patient'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.detail || 'An error occurred'}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Username"
                name="user.username"
                value={formData.user.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="user.email"
                type="email"
                value={formData.user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="user.first_name"
                value={formData.user.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="user.last_name"
                value={formData.user.last_name}
                onChange={handleChange}
              />
            </Grid>
            {!id && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="user.password"
                  type="password"
                  value={formData.user.password}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical History"
                name="medical_history"
                multiline
                rows={3}
                value={formData.medical_history}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Allergies"
                name="allergies"
                multiline
                rows={2}
                value={formData.allergies}
                onChange={handleChange}
              />
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
                  {loading ? 'Saving...' : id ? 'Update' : 'Create'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default PatientForm; 