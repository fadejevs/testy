import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  console.log("Layout rendering"); // Add this for debugging
  
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout; 