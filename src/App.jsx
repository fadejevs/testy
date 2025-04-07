import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Simple components for testing
const Home = () => <div style={{padding: 20}}><h1>Home Page</h1></div>;
const Login = () => <div style={{padding: 20}}><h1>Login Page</h1></div>;
const Test = () => <div style={{padding: 20}}><h1>Test Page</h1></div>;

// Simple navbar
const Navbar = () => (
  <nav style={{
    padding: '10px 20px',
    background: '#f0f0f0',
    display: 'flex',
    gap: '20px'
  }}>
    <Link to="/login">Login</Link>
    <Link to="/test">Test</Link>
  </nav>
);

// Layout component
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App; 