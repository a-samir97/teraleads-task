import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';

// Components
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import Chatbot from './components/Chatbot';
import Login from './components/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<PatientList />} />
              <Route path="patients/new" element={<PatientForm />} />
              <Route path="patients/:id" element={<PatientForm />} />
              <Route path="chatbot" element={<Chatbot />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 