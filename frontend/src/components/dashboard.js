import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, Flex, Grid, Stack, Text, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Input, Textarea, useDisclosure
} from '@chakra-ui/react';
import AddFlashcard from './AddFlashcard';
import CreateCategory from './CreateCategory';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [originalCategoryId, setOriginalCategoryId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchFlashcards();
    fetchCategories();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/flashcards/${id}`);
      fetchFlashcards(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting flashcard:', error.message);
    }
  };

  const handleEditFlashcard = async () => {
    try {
      await axios.put(`http://localhost:5000/flashcards/${editId}`, {
        question,
        answer,
        category_id: originalCategoryId,
      });

      fetchFlashcards(); // Refresh the list after updating
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating flashcard:', error.message);
    }
  };

  const groupedFlashcards = flashcards.reduce((acc, flashcard) => {
    const category = categories.find(cat => cat.id === flashcard.category_id);
    const categoryName = category ? category.name : 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(flashcard);
    return acc;
  }, {});

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="black"
      minHeight="50vh"
      position="relative"
    >
      <Box
        width={{ base: '100%', md: '80%', lg: '60%' }}
        bg="black"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        zIndex="1"
      >
        <Stack spacing={4} mb={8} align="center">
          <Text fontSize="2xl" color="white" mt={20} mb={10} textAlign="center" fontWeight="bold">
            Add Flashcards and Categories
          </Text>

          <Flex direction="row" justify="space-between" mb={4}>
            <Box flex="1" mr={4}>
              <CreateCategory fetchCategories={fetchCategories} />
            </Box>
            <Box flex="1">
              <AddFlashcard
                fetchFlashcards={fetchFlashcards}
                categories={categories}
              />
            </Box>
          </Flex>

        </Stack>

        <Text fontSize="2xl" color="white" mt={20} mb={10} textAlign="center" fontWeight="bold">
          Your Flashcards
        </Text>

        <Box
          position="absolute"
          top="70%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="500px"
          height="500px"
          borderRadius="30%"
          bgGradient="linear(to-t, black, rgb(190, 18, 60))"
          boxShadow="lg"
          zIndex="0"
          style={{
            filter: 'blur(100px)',
            opacity: 0.2,
          }}
        />
        {Object.keys(groupedFlashcards).map((categoryName) => (
          <Box key={categoryName} mb={12}>
            <Text fontSize="xl" color="white" mb={4} fontWeight="bold">
              {categoryName}
            </Text>
            <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
              {groupedFlashcards[categoryName].map((flashcard) => (
                <Box
                  key={flashcard.id}
                  bg="rgba(255, 255, 255, 0.1)"
                  p={6}
                  borderRadius="md"
                  boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                  backdropFilter="blur(10px)"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="center"
                  height="200px"
                  minHeight="200px"
                  overflowY="auto"
                >
                  <Box
                    flex="1"
                    overflowY="auto"
                    padding="2"
                    textOverflow="ellipsis"
                    wordBreak="break-word"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Text fontWeight="bold" color="white" mb={2}>
                      {flashcard.question}
                    </Text>
                    <Text color="grey" mb={4}>
                      {flashcard.answer}
                    </Text>
                  </Box>

                  <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                    <Button
                      size="sm"
                      colorScheme="green"
                      borderRadius="20px"
                      onClick={() => {
                        setQuestion(flashcard.question);
                        setAnswer(flashcard.answer);
                        setEditId(flashcard.id);
                        setOriginalCategoryId(flashcard.category_id);
                        onOpen(); // Open the modal
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      borderRadius="20px"
                      onClick={() => handleDeleteFlashcard(flashcard.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Edit Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="black" color="white" border="1px solid" borderColor="grey">
            <ModalHeader fontWeight="bold">Edit Flashcard</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <Stack spacing={4}>
                <Input
                  placeholder="Edit Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  bg="gray.800"
                  borderColor="gray.600"
                  _placeholder={{ color: 'gray.400' }}
                  color="white"
                />
                <Textarea
                  placeholder="Edit Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  bg="gray.800"
                  borderColor="gray.600"
                  _placeholder={{ color: 'gray.400' }}
                  color="white"
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleEditFlashcard}>
                Save
              </Button>
              <Button colorScheme='black' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default Dashboard;
