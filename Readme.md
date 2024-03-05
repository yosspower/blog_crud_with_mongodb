# Simple CRUD Application with Express.js and MONGODB

## Installation

1. Clone this repository to your local machine:
   git clone `https://github.com/yosspower/blog_crud_with_mongodb.git`

2. Navigate to the project directory:

   cd blog_project

3. Install dependencies:

   npm install

## Roles

1. **Admin** - can create, read, update & delete every post .
2. **User** - can read all posts and can only update and delete his own posts and add new ones.
3. **Quest** - have only read access for all posts

## Usage

1. Start the server:

node app.js or nodemon (if you have installed it)

2. The server will be running at `http://localhost:3000` by default.

3.go to `/register` and enter your information so you can get the jwt token generated or `/login` if you already have an account

4.after succesfully authenticated you need to refresh the page you will be redirected to /profile

5. You can perform CRUD operations using the following endpoints:
   - `GET /profile`:profile page that displays all posts posted by user.
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
- `middleware/isAlowed.js`: middleware for checking if a user allowed to modify or delete that specific post .
- `middleware/ensureToken.js`: middleware for stopping non-authentificated users from accessing routes that require authentication.
- `middleware/log.js`: Log middleware that logs each request to the log.md file with the specific user.
- `middleware/pageNotFound.js`: Middleware for handling 404 errors.
- `routes/loginRoutes.js`: login routes.
- `routes/registerRoutes.js`: register Routes.
- `routes/postRoutes.js`: post Routes(protected by ensureToken middleware).
- `medels/User.js`:User model.
- `medels/Post.js`: Post model.
