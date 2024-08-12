import React from 'react';
import Navbar from '../components/navbar';
import Dashboard from '../components/dashboard';

const DashboardPage = () => (
  <div style={{ backgroundColor: 'black', minHeight: '200vh', color: 'white' }}>
    <Navbar />
    <Dashboard />
  </div>
);

export default DashboardPage;
