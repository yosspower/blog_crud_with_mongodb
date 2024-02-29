# Simple CRUD Application with Express.js and JSON

## Installation

1. Clone this repository to your local machine:
   git clone `https://github.com/yosspower/blog_crud_with_mongodb.git`

2. Navigate to the project directory:

   cd <project_directory>

3. Install dependencies:

   npm install

## Usage

1. Start the server:

node app.js or nodemon (if you have installed it)

2. The server will be running at `http://localhost:3000` by default.

3.go to /register and enter your information so you can get the jwt token generated or /login if you already have an account 

4. You can perform CRUD operations using the following endpoints:

   - `GET profile/posts`: Retrieve all posts.
   - `POST profile/posts`: Create a new post.
   - `PUT profile/posts/:id`: Update an existing post.
   - `DELETE profile/posts/:id`: Delete a post by ID.

## File Structure

- `app.js`: Entry point of the application.
- `controllers/postController.js`: Controller functions for handling CRUD operations.
- `controllers/userController.js`: Controller functions for handling user authentification systeme.
- `middleware/errHandler.js`: Error handling middleware.
- `middleware/isAuth.js`: middleware for redirecting authentificated users back to profile .
- `middleware/ensureToken.js`: middleware for stopping non-authentificated  users from accessing routes that require authentication.
- `middleware/log.js`: Logging middleware.
- `middleware/pageNotFound.js`: Middleware for handling 404 errors.
- `routes/loginRoutes.js`: login routes.
- `routes/registerRoutes.js`: register Routes.
- `routes/postRoutes.js`: post Routes(protected by ensureToken middleware).
- `medels/User.js`:User model.
- `medels/Post.js`: Post model.





