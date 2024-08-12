import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="black" color="white" py={8} textAlign="center">
      {/* Main Header Text */}
      <Flex direction="column" align="center" mb={4}>
        <Text
          fontSize={{ base: "2xl", md: "7xl" }} // Adjust font size for responsiveness
          fontWeight="bold"
        >
          The ultimate {" "}
          <Text as="span" color="rgb(190, 18, 60)">
            learning
          </Text>{" "}
          <br />
          platform
        </Text>
      </Flex>

      {/* Subheader Text */}
      <Text fontSize={{ base: "sm", md: "md" }} maxW="xl" mx="auto" marginTop={12}>
        Meet FlashLearner, the new standard for learning. Fun, fast and ads
        are thrown right out the window. Try it out!
      </Text>
    </Box>
  );
};

export default Header;
