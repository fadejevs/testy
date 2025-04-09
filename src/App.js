import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import theme from './theme/theme';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import EnhancePage from './pages/EnhancePage';
import VerifyPage from './pages/VerifyPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentPage from './pages/PaymentPage';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import SimpleAuthPage from './pages/SimpleAuthPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/enhance" element={
              <ProtectedRoute>
                <EnhancePage />
              </ProtectedRoute>
            } />
            <Route path="/verify/:id" element={<VerifyPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/auth" element={<SimpleAuthPage />} />
            <Route path="/login" element={<SimpleAuthPage />} />
            <Route path="/signup" element={<SimpleAuthPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 