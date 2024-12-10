# Movie Portal🎥  

The backend for the **Movie Portal** application provides secure and efficient APIs to manage movie data, user authentication, and CRUD operations. It supports seamless interaction with the database to ensure a smooth movie browsing experience.

## 🚀 Live API  
[**Movie Portal Live**](https://movie-portal-90500.web.app/)  

---

## ✨ Features  
- **CRUD Operations**: API endpoints for adding, updating, deleting, and retrieving movie data.  
- **User Authentication**: Secure authentication with Firebase and JSON Web Tokens (JWT).  
- **Favorites Management**: Handle user-specific favorite movies efficiently.  
- **Pagination & Search**: Support for server-side search and pagination for improved performance.  
- **Environment Variables**: Sensitive data like MongoDB credentials and Firebase keys are secured using environment variables.  

---

## 📜 Technologies Used  
- **Node.js**: Server-side JavaScript runtime.  
- **Express.js**: Framework for building robust RESTful APIs.  
- **MongoDB**: NoSQL database for storing movie and user data.  
- **Firebase Admin SDK**: For handling secure authentication.  
- **dotenv**: To manage environment variables.  

---

## 🌟 Additional Features  
- **Data Validation**: All inputs are validated before processing.  
- **Error Handling**: Proper error messages for invalid requests and server issues.  
- **Favorites API**: Endpoints to add, fetch, and delete favorite movies for users.  
- **Update API**: Update movie details with validation for consistent data.  

---

## 📂 Project Structure  
- **Routes**: Organized into modular routes for movies and user authentication.  
- **Controllers**: Contains business logic for handling requests.  
- **Models**: Mongoose models for movies and favorites.  
- **Middleware**: Custom middleware for authentication and error handling.  

---

## 📋 Setup Instructions  
1. Clone the repository:  
   ```bash
   git clone https://github.com/khairul1036/Movie-Portal-Server.git
