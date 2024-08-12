import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import Flashcard from './flashcard';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'; // Import the icons

const flashcards = [
  { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
  { question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to XML.' },
  // Add more flashcards here
];

const FlashcardDeck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <Box
      bg="black" // Black background for the entire container
      height="80vh"
      position="relative"
      overflow="hidden" // Ensure no overflow outside the container
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="500px"
        height="500px"
        borderRadius="20%"
        bgGradient="linear(to-t, black, rgb(190, 18, 60))"
        boxShadow="lg"
        zIndex="0" // Ensure it is behind other content
        style={{
            filter: 'blur(70px)', // Apply blur effect
            opacity: 0.2, // Adjust opacity for the glass effect
          }}
      />
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="80vh"
        p="8"
        position="relative"
        zIndex="1" // Ensure this is above the gradient circle
      >
        <Flex align="center" position="relative">
          <IconButton
            aria-label="Previous"
            icon={<ArrowBackIcon boxSize={8}/>}
            onClick={prevCard}
            position="absolute"
            left="16px" // Adjusted position
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
            borderRadius="full"
            color="black"
            background="transparent"
            _hover={{ background: "transparent" }}
            _active={{ background: "transparent" }}
            _focus={{ boxShadow: "none" }}
          />
          <Box>
            <Flashcard
              question={flashcards[currentIndex].question}
              answer={flashcards[currentIndex].answer}
            />
          </Box>
          <IconButton
            aria-label="Next"
            icon={<ArrowForwardIcon boxSize={8} />}
            onClick={nextCard}
            position="absolute"
            right="16px" // Adjusted position
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
            borderRadius="full"
            color="black"
            background="transparent"
            _hover={{ background: "transparent" }}
            _active={{ background: "transparent" }}
            _focus={{ boxShadow: "none" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default FlashcardDeck;
