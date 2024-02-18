# Simple CRUD Application with Express.js and JSON

## Installation

1. Clone this repository to your local machine:
   git clone `https://github.com/yosspower/blog_crud_operation.git`

2. Navigate to the project directory:

   cd <project_directory>

3. Install dependencies:

   npm install

## Usage

1. Start the server:

node app.js or nodemon (if you have installed it)

2. The server will be running at `http://localhost:3000` by default.

3. You can perform CRUD operations using the following endpoints:

   - `GET /posts`: Retrieve all posts.
   - `POST /posts`: Create a new post.
   - `PUT /posts/:id`: Update an existing post.
   - `DELETE /posts/:id`: Delete a post by ID.

## File Structure

- `index.js`: Entry point of the application.
- `controllers/postController.js`: Controller functions for handling CRUD operations.
- `middleware/errHandler.js`: Error handling middleware.
- `middleware/log.js`: Logging middleware.
- `middleware/pageNotFound.js`: Middleware for handling 404 errors.
- `data/posts.json`: JSON file for storing post data.
