import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Flashcard from './flashcard';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import axios from 'axios';

const FlashcardDeck = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchFlashcards(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://flash-server-beta.vercel.app/categories');
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0].id); // Auto-select the first category
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFlashcards = async (categoryId) => {
    try {
      const response = await axios.get(`https://flash-server-beta.vercel.app/flashcards?category=${categoryId}`);
      setFlashcards(response.data);
      setCurrentIndex(0); // Reset to the first flashcard when category changes
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

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
        <Text fontSize="3xl" color="white" mb={4} mt={20} fontWeight="bold">What do you want to study?</Text>
        <Tabs
          isFitted
          variant="soft-rounded"
          colorScheme="red"
          mt={10}
          mb={6}
          onChange={(index) => {
            const categoryId = categories[index]?.id;
            if (categoryId) {
              setSelectedCategory(categoryId);
            }
          }}
        >
          <TabList>
            {categories.map((category) => (
              <Tab key={category.id} _selected={{ color: 'pink.400', borderColor: 'pink.400' }} color="white">
                {category.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {categories.map((category) => (
              <TabPanel key={category.id}>
                {flashcards.length > 0 && (
                  <Flex direction="column" align="center" justify="center" position="relative">
                    <Flex align="center" position="relative">
                      <IconButton
                        aria-label="Previous"
                        icon={<ArrowBackIcon boxSize={8}/>}
                        onClick={prevCard}
                        position="absolute"
                        left="16px"
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
                        right="16px"
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
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default FlashcardDeck;
