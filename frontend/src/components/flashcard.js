import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      width="600px" // Increased width
      height="350px" // Increased height
      borderRadius="20px" // Rounded corners
      overflow="hidden"
      onClick={() => setFlipped(!flipped)}
      cursor="pointer"
      position="relative"
      bg="rgba(255, 255, 255, 0.2)" // Semi-transparent white for glass effect
      backdropFilter="blur(10px)" // Glassy effect
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.5)" // Subtle shadow for depth
      _hover={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)" }} // Hover effect
      transition="transform 0.8s" // Longer transition for smoother flip
      transformStyle="preserve-3d"
      transform={flipped ? "rotateY(180deg)" : "rotateY(0deg)"}
    >
      {/* Front Face */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        backfaceVisibility="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="6" // Increased padding
        bg="rgba(185, 18, 60, 0.9)" // Red background for front
        color="white"
        zIndex={flipped ? 0 : 1}
        transition="opacity 0.4s"
        opacity={flipped ? 0 : 1} // Hide the front face during flip
      >
        <Text fontSize="3xl" fontWeight="bold">{question}</Text> {/* Larger text */}
      </Box>
      
      {/* Back Face */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        backfaceVisibility="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="6" // Increased padding
        bg="rgba(255, 255, 255, 0.9)" // White background for back
        color="black"
        transform="rotateY(180deg)"
        zIndex={flipped ? 1 : 0}
        transition="opacity 0.4s"
        opacity={flipped ? 1 : 0} // Show the back face when flipped
      >
        <Text fontSize="xl" fontWeight="bold">{answer}</Text> {/* Larger text */}
      </Box>
    </Box>
  );
};

export default Flashcard;
