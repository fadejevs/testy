import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import EnhancePage from './pages/EnhancePage';
import VerifyPage from './pages/VerifyPage';
import PricingPage from './pages/PricingPage';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/enhance" element={<EnhancePage />} />
          <Route path="/verify/:id" element={<VerifyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 