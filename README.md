# Markdown challenge

A real-time collaborative Markdown editor that allows multiple users to simultaneously edit documents, with updates reflected in real-time.

## Table of Contents

- [Installation Instructions](#installation-instructions)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
  - [auth](#auth)
  - [Documents](#documents)
- [Design Decisions and Challenges](#design-decisions-and-challenges)

## Installation Instructions

### Frontend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your_username/your_repository.git

2. **Navigate to the frontend directory:**
   ```bash
   cd your_repository/frontend

3. **Install the dependencies:**
   ```bash
   npm install

4. **Start the development server:**
   ```bash
   npm run dev

### Backend

1. **Navigate to the backend directory:**
   ```bash
   cd your_repository/backend

2. **Install the dependencies:**
   ```bash
   npm install

3. **Configure the .env file:**
- Create a new file named `.env` in the backend directory.
   - Add the following lines to configure your database connection and JWT secret:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
     JWT_SECRET="your_jwt_secret"
     ```
   - Replace `user`, `password`, `localhost`, `5432`, and `mydb` with your actual database credentials and settings.

4. **Create the database and run migrations:**
   ```bash
   npx prisma migrate dev

5. **Start the server:**
   ```bash
   npm run dev


## API Endpoints

### auth

- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Log in a user.

### Documents

- **GET** `/documents`: List the user's documents.
- **POST** `/documents`: Create a new document.

## Design Decisions and Challenges

- **Choice of Prisma**: I chose to use Prisma to facilitate seamless interaction with the database while ensuring the security of queries.

- **Real-Time Collaboration**: The implementation of Socket.IO enables multiple users to edit documents simultaneously, with all changes being reflected in real-time.