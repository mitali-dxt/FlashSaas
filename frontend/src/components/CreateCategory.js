import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Stack, Spinner, Text } from '@chakra-ui/react';

const CreateCategory = ({ fetchCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddCategory = async () => {
    if (newCategory) {
      setLoading(true);
      setMessage('');
      try {
        await axios.post('https://flash-server-beta.vercel.app/categories', { name: newCategory });
        fetchCategories();
        setNewCategory('');
        setMessage('Category added successfully!');
      } catch (error) {
        console.error('Error adding category:', error.message);
        setMessage('Failed to add category.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box mb={8}>
      <Stack spacing={4}>
      <Button
          bg="rgb(190, 18, 60)"
          color="white"
          onClick={handleAddCategory}
          borderRadius="md"
          _hover={{ bg: 'rgb(160, 16, 50)' }}
          isLoading={loading} // Show a spinner when loading
          loadingText="Adding..."
        >
          Add Category
        </Button>
        <Input 
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          width="500px"
          height="60px"
          bg="transparent"
          color="white"
          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.2)"
        />
        {message && <Text color="white">{message}</Text>} {/* Display message */}
      </Stack>
    </Box>
  );
};

export default CreateCategory;
