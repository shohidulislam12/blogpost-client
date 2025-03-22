# Blog Web

A simple blog web application with authentication and CRUD operations using **Node.js, Express, MongoDB, and JWT authentication**.

## Features

- User Authentication (JWT-based login/logout)
- CRUD Operations for Blogs (Create, Read, Update, Delete)
- Secure API Endpoints
- MongoDB Database Integration

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Frontend**: React.js (for UI, if applicable)
- **Authentication**: JSON Web Token (JWT)
- **Styling**: TailwindCSS / DaisyUI 

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/shohidulislam12/blogpost-client.git
   cd blog-web
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Routes

### Authentication

- **POST** `/jwt` – Generate JWT token for authentication

### Blog Management

- **POST** `/blogs` – Create a new blog
- **GET** `/blogs` – Fetch all blogs
- **GET** `/blogs/:id` – Fetch a specific blog by ID
- **PUT** `/blogs/:id` – Update a blog by ID
- **DELETE** `/blogs/:id` – Delete a blog by ID

## Usage

- Use **Postman** or any API client to test the API.
- Integrate the frontend with the backend API.

## Troubleshooting

- **Error: "secretOrPrivateKey must have a value"**
  - Ensure `.env` has `ACCESS_TOKEN_SECRET` set.
  - Restart the server after updating `.env`.


## Author

**MD. Shohidul Islam Sifat**
- [LinkedIn](https://www.linkedin.com/in/shohidulislam200/)

