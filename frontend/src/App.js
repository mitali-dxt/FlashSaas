import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/navbar";
import Header from "./components/header";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Header />
      {/* Other components can be added here */}
    </ChakraProvider>
  );
}

export default App;
