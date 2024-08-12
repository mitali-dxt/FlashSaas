import React from "react";
import { Box, Button, Flex, HStack, Image, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="black" color="white" px={4}>
      <Flex h={16} alignItems="center">
        {/* Logo */}
        <Box>
          <Image
            src="/logo.svg" // Path to your SVG logo
            alt="Logo"
            width="200px"
            height="100px"
          />
        </Box>

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
