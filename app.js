const express = require('express');

const app = express();

app.use(express.json());

const booksRoutes = require('./routes/books');

app.use('/books', booksRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});