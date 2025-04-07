import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import theme from './theme/theme';
import HomePage from './pages/HomePage';
import RetroLandingPage from './pages/RetroLandingPage';
import DashboardPage from './pages/DashboardPage';
import EnhancePage from './pages/EnhancePage';
import VerifyPage from './pages/VerifyPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import QuickSignupPage from './pages/QuickSignupPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentPage from './pages/PaymentPage';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './contexts/AuthContext';

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
            {/* <Route path="/" element={<RetroLandingPage />} /> */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/enhance" element={<EnhancePage />} />
            <Route path="/verify/:id" element={<VerifyPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<QuickSignupPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 