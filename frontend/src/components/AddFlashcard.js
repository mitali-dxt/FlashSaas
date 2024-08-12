import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Select, Stack } from '@chakra-ui/react';

const AddFlashcard = ({ fetchFlashcards, categories }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddFlashcard = async () => {
    if (question && answer && selectedCategory) {
      try {
        await axios.post('https://flash-server-beta.vercel.app/flashcards', {
          question,
          answer,
          category_id: selectedCategory
        });
        setQuestion('');
        setAnswer('');
        setSelectedCategory('');
        fetchFlashcards();
      } catch (error) {
        console.error('Error adding flashcard:', error.message);
      }
    }
  };

  return (
    <Box mb={8}>
      <Stack spacing={4}>
      <Select
          placeholder="Select category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          width="500px"
          bg="rgba(0, 0, 0, 0.3)" // Adjusted for better visibility
          color="white"
          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Input 
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          width="500px"
          height="60px"
          bg="transparent"
          color="white"
          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.2)"
        />
        <Input 
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          width="500px"
          height="120px"
          bg="transparent"
          color="white"
          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.2)"
          resize="none"
        />
        
        <Button
          bg="rgb(190, 18, 60)"
          color="white"
          onClick={handleAddFlashcard}
          borderRadius="md"
          _hover={{ bg: 'rgb(160, 16, 50)' }}
        >
          Add Flashcard
        </Button>
      </Stack>
    </Box>
  );
};

export default AddFlashcard;
