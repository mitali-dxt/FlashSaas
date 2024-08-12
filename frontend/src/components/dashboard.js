import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, Stack, Text, Flex, Grid } from '@chakra-ui/react';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await axios.get('http://localhost:5000/flashcards');
    setFlashcards(response.data);
  };

  const handleAddFlashcard = async () => {
    if (question && answer) {
      await axios.post('http://localhost:5000/flashcards', { question, answer });
      setQuestion('');
      setAnswer('');
      fetchFlashcards();
    }
  };

  const handleEditFlashcard = async (id) => {
    if (question && answer) {
      await axios.put(`http://localhost:5000/flashcards/${id}`, { question, answer });
      setQuestion('');
      setAnswer('');
      setEditId(null);
      fetchFlashcards();
    }
  };

  const handleDeleteFlashcard = async (id) => {
    await axios.delete(`http://localhost:5000/flashcards/${id}`);
    fetchFlashcards();
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      p={8}
      bg="black"
      minHeight="100vh"
    >
      <Box
        width={{ base: '100%', md: '80%', lg: '60%' }}
        bg="black"
        p={6}
        borderRadius="md"
        boxShadow="lg"
      >
        <Stack spacing={4} mb={8}>
          <Input
            color="white"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Input
            color="white"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          {editId ? (
            <Button bg="rgb(190, 18, 60)" color="white" onClick={() => handleEditFlashcard(editId)} _hover={{color:"black", bg:"white"}}>
              Update Flashcard
            </Button>
          ) : (
            <Button bg="rgb(190, 18, 60)" color="white" onClick={handleAddFlashcard} _hover={{color:"black", bg:"white"}}>
              Add Flashcard
            </Button>
          )}
        </Stack>
        <Text fontSize="2xl" color="white" fontWeight="bold" mb={4} textAlign="center">
          Your Flashcards
        </Text>
        <Grid marginTop={20} templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
          {flashcards.map((flashcard) => (
            <Box
              key={flashcard.id}
              bg="rgb(190, 18, 60)"
              p={4}
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              <Text fontWeight="bold" color="white" mb={2}>
                {flashcard.question}
              </Text>
              <Text color="white" mb={4}>
                {flashcard.answer}
              </Text>
              <Stack direction="row" spacing={2}>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => {
                    setQuestion(flashcard.question);
                    setAnswer(flashcard.answer);
                    setEditId(flashcard.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteFlashcard(flashcard.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Dashboard;
