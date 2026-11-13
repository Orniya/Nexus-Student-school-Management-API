# Student Management REST API

A REST API built using Node.js and Express.

## Features

- Create, read, update and delete students.
- Search students by name and email.
- Filter students by course, status and GPA.
- Get student statistics.
- Input validation.
- Custom middleware.
- Centralized error handling.

## Technologies

- Node.js
- Express.js
- Postman



## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get one student |
| POST | /api/students | Create student |
| PUT | /api/students/:id | Replace student |
| PATCH | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |
| GET | /api/students/stats | Get statistics |

