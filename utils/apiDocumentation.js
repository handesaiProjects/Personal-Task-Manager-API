/**
 * API Documentation for Personal Task Manager API
 * This documentation provides an overview of the available endpoints within the Personal Task Manager API,
 * including details on the required parameters and example request/response formats.
 */

/**
 * AUTHENTICATION ENDPOINTS
 */

/**
 * @api {post} /api/v1/auth/register Register a New User
 * @apiDescription Register a new user with a username, email, and password.
 * @apiParam {String} username User's desired username.
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's desired password.
 * @apiSuccess {Boolean} success Indicates the success of the operation.
 * @apiSuccess {String} token JWT token for the registered user.
 * @apiExample {curl} Example usage:
 *     curl -X POST http://localhost:3000/api/v1/auth/register \
 *     -H 'Content-Type: application/json' \
 *     -d '{"username": "johndoe", "email": "john@example.com", "password": "password123"}'
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "success": true,
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 */

/**
 * @api {post} /api/v1/auth/login Login User
 * @apiDescription Login a user with email and password.
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's password.
 * @apiSuccess {Boolean} success Indicates the success of the operation.
 * @apiSuccess {String} token JWT token for the authenticated user.
 * @apiExample {curl} Example usage:
 *     curl -X POST http://localhost:3000/api/v1/auth/login \
 *     -H 'Content-Type: application/json' \
 *     -d '{"email": "john@example.com", "password": "password123"}'
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 */

/**
 * TASK MANAGEMENT ENDPOINTS
 * Note: All task management endpoints require JWT authentication.
 */

/**
 * @api {get} /api/tasks Get All Tasks
 * @apiDescription Retrieve all tasks for the authenticated user.
 * @apiHeader {String} Authorization User's JWT token.
 * @apiSuccess {Boolean} success Indicates the success of the operation.
 * @apiSuccess {Object[]} data List of tasks.
 * @apiExample {curl} Example usage:
 *     curl -X GET http://localhost:3000/api/tasks \
 *     -H 'Authorization: Bearer <Your_JWT_Token>'
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "count": 2,
 *       "data": [
 *         {
 *           "title": "Task 1",
 *           "description": "Description for Task 1",
 *           "status": "pending",
 *           "dueDate": "2023-12-31"
 *         },
 *         {
 *           "title": "Task 2",
 *           "description": "Description for Task 2",
 *           "status": "completed",
 *           "dueDate": "2023-11-30"
 *         }
 *       ]
 *     }
 */

/**
 * CATEGORY MANAGEMENT ENDPOINTS
 * Note: All category management endpoints require JWT authentication.
 */

/**
 * @api {post} /categories Create a New Category
 * @apiDescription Create a new category for organizing tasks.
 * @apiHeader {String} Authorization User's JWT token.
 * @apiParam {String} name Name of the category.
 * @apiSuccess {Boolean} success Indicates the success of the operation.
 * @apiSuccess {Object} data Created category details.
 * @apiExample {curl} Example usage:
 *     curl -X POST http://localhost:3000/categories \
 *     -H 'Authorization: Bearer <Your_JWT_Token>' \
 *     -H 'Content-Type: application/json' \
 *     -d '{"name": "Work"}'
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "success": true,
 *       "data": {
 *         "name": "Work",
 *         "user": "userId"
 *       }
 *     }
 */

/**
 * This document provides a basic overview of the API endpoints. For more detailed information,
 * including additional endpoints and parameters, please refer to the source code and comments within
 * the controllers and routes.
 */
