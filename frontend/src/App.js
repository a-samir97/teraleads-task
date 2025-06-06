import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import theme from './theme';
import store from './store';

// Components
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import Chatbot from './components/Chatbot';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="patients" element={
                <PrivateRoute>
                  <PatientList />
                </PrivateRoute>
              } />
              <Route path="patients/new" element={
                <PrivateRoute>
                  <PatientForm />
                </PrivateRoute>
              } />
              <Route path="patients/:id" element={
                <PrivateRoute>
                  <PatientForm />
                </PrivateRoute>
              } />
              <Route path="chatbot" element={
                <PrivateRoute>
                  <Chatbot />
                </PrivateRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
