# FlashLearn 🎯

FlashLearn is an interactive application designed to enhance learning through flashcards. It allows users to create, view, and flip through flashcards across various categories, making studying more engaging and effective.

## Features

- **Add Flashcards:** Create flashcards for any category.
- **View Flashcards:** Browse through your flashcards in different categories.
- **Flip Through Flashcards:** Study by flipping through your flashcards.

## Tech Stack

- **Frontend:** React, Chakra UI
- **Backend:** Node.js, Express
- **Database:** MySQL (hosted on freesqldatabase.com)

## Setup

### Frontend

1. **Install Dependencies:** `npm install`
2. **Run the Development Server:** `npm start`
   The frontend will be available at `http://localhost:3000`.

### Backend

1. **Navigate to the Backend Directory:** `cd dashboard`
2. **Install Dependencies:** `npm install`
3. **Run the Development Server:** `npm start`
   The backend will be available at `http://localhost:5000`.

## API Endpoints

- **GET /categories:** Retrieve all categories.
- **POST /categories:** Add a new category.
- **GET /flashcards:** Retrieve all flashcards.
- **GET /flashcards/:categoryId:** Retrieve flashcards by category.
- **POST /flashcards:** Add a new flashcard.
- **PUT /flashcards/:id:** Update an existing flashcard.
- **DELETE /flashcards/:id:** Delete a flashcard.

## Screenshots

HomePage:

![Homepage](https://github.com/user-attachments/assets/9cee227e-97ce-4061-bc60-a284d14fb35f) 

CRUD Operations:

![image](https://github.com/user-attachments/assets/07d80e78-6465-4473-ae51-30c3f180b806)

View category wise:

![image](https://github.com/user-attachments/assets/f9e66bb2-ddc4-400d-ae75-14a52baf9efc)


## Deployment

- **Frontend:** Deployed on [Vercel](https://flash-learner.vercel.app/)
- **Backend:** Deployed on [Vercel](https://flash-server-beta.vercel.app)

## Database

The application uses a free MySQL database hosted on [freesqldatabase.com](https://www.freesqldatabase.com)

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

