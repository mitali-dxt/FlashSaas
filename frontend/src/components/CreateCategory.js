import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Stack } from '@chakra-ui/react';

const CreateCategory = ({ fetchCategories }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = async () => {
    if (newCategory) {
      try {
        const response = await axios.post('http://localhost:5000/categories', { name: newCategory });
        fetchCategories();
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error.message);
      }
    }
  };

  return (
    <Box mb={8}>
      <Stack spacing={4}>
        <Input 
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          width="500px" // Adjusted width
          height="60px" // Increased height
          bg="transparent" // Transparent background
          color="white" // White text color
          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.2)"
        />
        <Button
          bg="rgb(190, 18, 60)"
          color="white"
          onClick={handleAddCategory}
          borderRadius="md"
          _hover={{ bg: 'rgb(160, 16, 50)' }}
        >
          Add Category
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateCategory;
