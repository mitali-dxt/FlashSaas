import React from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import FlashcardDeck from '../components/flashcardDeck';

const HomePage = () => (
  <div style={{ backgroundColor: 'black', minHeight: '150vh'}} >
    <Navbar />
    <Header />
    <FlashcardDeck />
  </div>
);

export default HomePage;
