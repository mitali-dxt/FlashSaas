import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import HomePage
import DashboardPage from './pages/dashboardPage'; // Import DashboardPage

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/dashboard" element={<DashboardPage />} /> 
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
