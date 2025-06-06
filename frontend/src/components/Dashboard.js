import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchPatients } from '../store/slices/patientSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patients, loading } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const recentPatients = patients.slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Patients
            </Typography>
            <Typography component="p" variant="h4">
              {patients.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              New Patients This Month
            </Typography>
            <Typography component="p" variant="h4">
              {patients.filter(p => {
                const created = new Date(p.created_at);
                const now = new Date();
                return created.getMonth() === now.getMonth() &&
                       created.getFullYear() === now.getFullYear();
              }).length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Active Patients
            </Typography>
            <Typography component="p" variant="h4">
              {patients.filter(p => p.status === 'active').length}
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography component="h2" variant="h6" color="primary">
                Recent Patients
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/patients/new')}
              >
                Add Patient
              </Button>
            </Box>
            <List>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : recentPatients.length > 0 ? (
                recentPatients.map((patient, index) => (
                  <React.Fragment key={patient.id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <ListItemText
                        primary={`${patient.first_name} ${patient.last_name}`}
                        secondary={`Phone: ${patient.phone_number} | Email: ${patient.email}`}
                      />
                    </ListItem>
                    {index < recentPatients.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography>No patients found</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
