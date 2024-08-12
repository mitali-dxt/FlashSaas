import React from "react";
import { Box, Button, Flex, HStack, Image, Spacer } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
   <Box bg="black" color="white" px={4}>
      <Flex h={16} alignItems="center">
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}> {/* Navigate to home page */}
          <Box>
            <Image
              src="/logo.svg" // Path to your SVG logo
              alt="Logo"
              width="200px"
              height="100px"
            />
          </Box>
        </Link>

        {/* Dashboard Link */}
        <Link to="/dashboard">
          <Button
            variant="link"
            color="white"
            fontSize="lg"
            fontWeight="bold"
            ml="30px"
            _hover={{ textDecoration: "none" }} // Style on hover
            _focus={{ boxShadow: "none" }} // Remove focus outline
            _active={{ color: "white", bg: "black" }} // Maintain color on click
          >
            Dashboard
          </Button>
        </Link>

        <Spacer />

        {/* Sign Up and Log In Buttons */}
        <HStack spacing={4}>
          <Button
            //bg="rgb(190, 18, 60)"
            borderColor={"grey"}
            color="white"
            _hover={{ bg: "rgb(160, 16, 50)" }} // Slightly darker shade on hover
            variant="outline"
          >
            Sign Up
          </Button>
          <Button
            bg="rgb(190, 18, 60)"
            color="white"
            _hover={{ bg: "rgb(160, 16, 50)" }} // Slightly darker shade on hover
            variant="solid"
          >
            Log In
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
