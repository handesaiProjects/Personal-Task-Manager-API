# Personal Task Manager API

This project is a Personal Task Manager API built with Node.js, Express.js, and MongoDB. It allows users to manage their tasks through CRUD operations and organizes tasks into categories. The API uses JWT for authentication, ensuring that only authenticated users can perform operations beyond signing up and logging in.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository to your local machine.
```bash
git clone <repository-url>
```

2. Navigate to the project directory.
```bash
cd personal-task-manager-api
```

3. Install the dependencies.
```bash
npm install
```
or
```bash
yarn install
```

4. Create a `.env` file in the root directory and add the following variables:
```
PORT=3000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

### Running the API

Start the server with:
```bash
npm start
```
or
```bash
yarn start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Authentication

- **POST /users/signup**: Register a new user.
- **POST /users/login**: Login an existing user.

### Users

- **GET /users**: Retrieve all users (requires authentication).
- **GET /users/:id**: Retrieve a single user by ID (requires authentication).
- **PATCH /users/:id**: Update user details (requires authentication).
- **DELETE /users/:id**: Delete a user (requires authentication).

### Tasks

- **POST /tasks**: Create a new task (requires authentication).
- **GET /tasks**: Retrieve all tasks (requires authentication).
- **GET /tasks/:id**: Retrieve a task by ID (requires authentication).
- **PATCH /tasks/:id**: Update a task (requires authentication).
- **DELETE /tasks/:id**: Delete a task (requires authentication).

### Categories

- **POST /categories**: Create a new category (requires authentication).
- **GET /categories**: Retrieve all categories (requires authentication).
- **GET /categories/:id**: Retrieve a category by ID (requires authentication).
- **PATCH /categories/:id**: Update a category (requires authentication).
- **DELETE /categories/:id**: Delete a category (requires authentication).

## Models

### User

- **username**: String, required
- **email**: String, required, unique
- **password**: String, required

### Task

- **title**: String, required
- **description**: String, required
- **status**: Enum ['pending', 'in progress', 'completed'], default 'pending'
- **dueDate**: Date, required
- **user**: ObjectId, reference to User, required
- **category**: ObjectId, reference to Category

### Category

- **name**: String, required, unique
- **description**: String, required
- **user**: ObjectId, reference to User, required

## Error Handling

The API includes error handling middleware that catches and returns errors in a structured format.

## Documentation

For more detailed API documentation, refer to `utils/apiDocumentation.js`.

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
