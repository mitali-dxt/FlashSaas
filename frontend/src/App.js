import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from "./components/navbar";
import Header from "./components/header";
import FlashcardDeck from './components/flashcardDeck';
import Dashboard from './components/dashboard'; // Import Dashboard

const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      {location.pathname === '/' && <Header />} {/* Conditionally render Header */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Define the route for Dashboard */}
        <Route path="/" element={<FlashcardDeck />} />
        {/* Add other routes here */}
      </Routes>
    </>
  );
};

function App() {
  return (
    <ChakraProvider>
      <Router> {/* Wrap your app with Router */}
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}

export default App;
