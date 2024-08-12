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
      position="relative"
    >
     

      <Box
        width={{ base: '100%', md: '80%', lg: '60%' }}
        bg="transparent"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        zIndex="1"
      >
        <Stack spacing={4} mb={8} align="center">
          <Input 
            color="white"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            width="80%" // Set the width as needed
            height="50px" // Set the height for the question input
          />
          <Input align="center"
            color="white"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            width="80%" // Set the width as needed
            height="100px" // Set the height for the answer textarea
            resize="none" // Prevent resizing of the textarea

          />
          {editId ? (
            <Button colorScheme="black" onClick={() => handleEditFlashcard(editId)} mt={4}>
              Update Flashcard
            </Button>
          ) : (
            <Button bg="rgb(190, 18, 60)" color="white" onClick={handleAddFlashcard} mt={4}>
              Add Flashcard
            </Button>
          )}
        </Stack>
         {/* Blurred Background Behind Grid */}
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

        <Text fontSize="2xl" color="white" mt={20} mb={10} textAlign="center" fontWeight="bold">
          Your Flashcards
        </Text>

        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
  {flashcards.map((flashcard) => (
    <Box
      key={flashcard.id}
      bg="rgba(255, 255, 255, 0.1)" // Slightly transparent white background for glassmorphism
      p={6}
      borderRadius="md"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // Light shadow for depth
      backdropFilter="blur(10px)" // Blur effect for glassmorphism
      border="1px solid rgba(255, 255, 255, 0.3)" // Border to enhance glassmorphism effect
      _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
      transition="all 0.2s"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between" // Space between content and buttons
      textAlign="center"
      height="200px" // Set fixed height or adjust as needed
      minHeight="200px"
      overflowY="auto" // Enable vertical scrolling if content overflows
    >
      <Box flex="1"overflowY="auto" // Enable vertical scrolling
        padding="2"
        textOverflow="ellipsis"
        wordBreak="break-word"
        display="flex"
        flexDirection="column"
        alignItems="center"> {/* Flex item to grow and shrink with the content */}
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
    </Flex>
  );
};

export default Dashboard;
