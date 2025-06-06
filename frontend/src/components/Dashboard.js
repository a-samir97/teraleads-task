import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  People as PeopleIcon,
  Chat as ChatIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { fetchPatients } from '../store/slices/patientSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patients } = useSelector((state) => state.patients);

  React.useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const quickActions = [
    {
      title: 'New Patient',
      description: 'Add a new patient to the system',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/patients/new'),
    },
    {
      title: 'Chat with AI',
      description: 'Get assistance from our AI assistant',
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/chatbot'),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action) => (
                <Grid item xs={12} sm={6} key={action.title}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        {action.icon}
                        <Typography variant="h6" sx={{ mt: 1 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={action.action}
                      >
                        {action.title}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Patients
            </Typography>
            {patients.slice(0, 5).map((patient) => (
              <Paper
                key={patient.id}
                sx={{
                  p: 2,
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    {patient.user.first_name} {patient.user.last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.user.email}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  View Details
                </Button>
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 