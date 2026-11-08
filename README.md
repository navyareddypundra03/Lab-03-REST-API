# LAB 3 – REST API Development

## Student Details

- **Name:** P. Navyasri
- **Section:** CSE-2D
- **Registration Number:** 252U1R1203
- **Course:** Backend Development Fundamentals
- **University:** Aurora Deemed to Be University


## Project Title
**REST API Development using Node.js, Express.js and SQLite**

## Project Description
This project demonstrates the development of a REST API using Node.js, Express.js and SQLite. It manages book records through different HTTP methods and supports searching, sorting, filtering and validation.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Visual Studio Code

## Deployment Details

The REST API can be deployed on a cloud hosting platform such as Render.

- **Deployment Platform:** Render

- **Books Endpoint:** [Add your deployed URL]/books

The deployed API allows users to access the book management endpoints through HTTP requests.

**Note:** Replace the placeholders with your actual deployment URL after successful deployment.

## Project Structure

```text
lab-03/
├── database/
│   └── books.db
├── routes/
│   └── books.js
├── Screenshots/
├── app.js
├── db.js
├── package.json
├── package-lock.json
└── README.md
```

## API Features

1. Get all books.
2. Get a book by ID.
3. Add a new book.
4. Update book details.
5. Delete a book.
6. Search books.
7. Sort books by columns.
8. Filter books by price.
9. Validate user input.
10. Handle errors with appropriate HTTP status codes.

## How to Run the Project

1. Install Node.js.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
node app.js
```

6. Open Postman and enter:

```text
http://localhost:3000/books
```

## Screenshots

The `Screenshots` folder contains evidence of API operations, query parameters, validation errors and debugging.

## Conclusion

This project helped me understand REST API development, Express.js routing, SQLite database connectivity, HTTP methods, query parameters and error handling.
