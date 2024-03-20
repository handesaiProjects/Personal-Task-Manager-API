#!/bin/bash

# Set your JWT token
JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFiZTM1ZTQyMWYzZDAyNGZjZTMzMSIsImlhdCI6MTcxMDkzMTUwOSwiZXhwIjoxNzEzNTIzNTA5fQ.34Jz_lsXL7osKTRUUB_eDrU8ZMyNPc6BfVOgReJqLtc"
# Replace <task_id> with an actual task ID
TASK_ID="65fabe63e421f3d024fce334"
# Replace <category_id> with an actual category ID
CATEGORY_ID="65fabe9fe421f3d024fce337"


# Register a new user
echo "Registering a new user..."
curl -X POST http://localhost:3000/api/users/register \
-H 'Content-Type: application/json' \
-d '{"username": "johndoe", "email": "john@example.com", "password": "password123"}'
echo ""

# Login user
echo "Logging in..."
curl -X POST http://localhost:3000/api/users/login \
-H 'Content-Type: application/json' \
-d '{"email": "john@example.com", "password": "password123"}'
echo ""

# Get all tasks
echo "Getting all tasks..."
curl -X GET http://localhost:3000/api/tasks \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Create a new task
echo "Creating a new task..."
curl -X POST http://localhost:3000/api/tasks \
-H "Authorization: Bearer $JWT_TOKEN" \
-H 'Content-Type: application/json' \
-d '{"title": "New Task", "description": "Task description", "dueDate": "2023-12-31"}'
echo ""

# Create a new category
echo "Creating a new category..."
curl -X POST http://localhost:3000/api/categories \
-H "Authorization: Bearer $JWT_TOKEN" \
-H 'Content-Type: application/json' \
-d '{"name": "Work", "description": "Tasks related to work"}'
echo ""


# Retrieve a task by ID
echo "Retrieving a task by ID..."
curl -X GET http://localhost:3000/api/tasks/$TASK_ID \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Update a task
echo "Updating a task..."
curl -X PATCH http://localhost:3000/api/tasks/$TASK_ID \
-H "Authorization: Bearer $JWT_TOKEN" \
-H 'Content-Type: application/json' \
-d '{"title": "Updated Task Title"}'
echo ""


# Retrieve the current user's profile
echo "Retrieving the current user's profile..."
curl -X GET http://localhost:3000/api/users/profile \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Update the current user's profile
echo "Updating the current user's profile..."
curl -X PATCH http://localhost:3000/api/users/profile \
-H "Authorization: Bearer $JWT_TOKEN" \
-H 'Content-Type: application/json' \
-d '{"username": "newUsername"}'
echo ""


# Retrieve all categories for the logged-in user
echo "Retrieving all categories..."
curl -X GET http://localhost:3000/api/categories \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Retrieve a category by ID
echo "Retrieving a category by ID..."
curl -X GET http://localhost:3000/api/categories/$CATEGORY_ID \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Update a category
echo "Updating a category..."
curl -X PATCH http://localhost:3000/api/categories/$CATEGORY_ID \
-H "Authorization: Bearer $JWT_TOKEN" \
-H 'Content-Type: application/json' \
-d '{"name": "Updated Category Name"}'
echo ""


# add a task to a category
echo "Adding a task to a category..."
curl -X PATCH http://localhost:3000/api/tasks/$TASK_ID \
-H "Authorization: Bearer $JWT_TOKEN" \
-H 'Content-Type: application/json' \
-d '{"category": "'$CATEGORY_ID'"}'
echo ""

# get all tasks from a category
echo "Getting all tasks of a category..."
curl -X GET http://localhost:3000/api/tasks?category=$CATEGORY_ID \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""


# Delete a task
echo "Deleting a task..."
curl -X DELETE http://localhost:3000/api/tasks/$TASK_ID \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Delete a category
echo "Deleting a category..."
curl -X DELETE http://localhost:3000/api/categories/$CATEGORY_ID \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""

# Delete the current user's profile
echo "Deleting the current user's profile..."
curl -X DELETE http://localhost:3000/api/users/profile \
-H "Authorization: Bearer $JWT_TOKEN"
echo ""