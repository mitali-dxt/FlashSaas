// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';

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
    <Box p={4}>
      <Stack spacing={4}>
        <Input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Input
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {editId ? (
          <Button onClick={() => handleEditFlashcard(editId)}>Update Flashcard</Button>
        ) : (
          <Button onClick={handleAddFlashcard}>Add Flashcard</Button>
        )}
        <Stack spacing={4}>
          {flashcards.map((flashcard) => (
            <Box key={flashcard.id} borderWidth="1px" borderRadius="md" p={4}>
              <Text fontWeight="bold">{flashcard.question}</Text>
              <Text>{flashcard.answer}</Text>
              <Button onClick={() => { setQuestion(flashcard.question); setAnswer(flashcard.answer); setEditId(flashcard.id); }}>Edit</Button>
              <Button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</Button>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dashboard;
