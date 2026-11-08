const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all books with search, sorting and filtering
router.get('/', (req, res) => {

    let {
        search_q = '',
        order_by = 'id',
        order = 'ASC',
        limit = '10',
        offset = '0',
        min_price,
        max_price
    } = req.query;

    const allowedColumns = ['id', 'title', 'author', 'price', 'pages'];

    if (!allowedColumns.includes(order_by)) {
        return res.status(400).json({
            message: 'Invalid order_by column'
        });
    }

    if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
        return res.status(400).json({
            message: 'Order must be ASC or DESC'
        });
    }

    limit = Number(limit);
    offset = Number(offset);

    if (!Number.isInteger(limit) || limit < 1 ||
        !Number.isInteger(offset) || offset < 0) {
        return res.status(400).json({
            message: 'Invalid limit or offset'
        });
    }

    if (min_price !== undefined && !Number.isFinite(Number(min_price))) {
        return res.status(400).json({
            message: 'Invalid minimum price'
        });
    }

    if (max_price !== undefined && !Number.isFinite(Number(max_price))) {
        return res.status(400).json({
            message: 'Invalid maximum price'
        });
    }

    if (min_price !== undefined && max_price !== undefined &&
        Number(min_price) > Number(max_price)) {
        return res.status(400).json({
            message: 'Minimum price cannot exceed maximum price'
        });
    }

    const conditions = [];
    const params = [];

    if (search_q) {
        conditions.push('title LIKE ?');
        params.push(`%${search_q}%`);
    }

    if (min_price !== undefined) {
        conditions.push('price >= ?');
        params.push(Number(min_price));
    }

    if (max_price !== undefined) {
        conditions.push('price <= ?');
        params.push(Number(max_price));
    }

    const where = conditions.length
        ? 'WHERE ' + conditions.join(' AND ')
        : '';

    const sql = `
        SELECT * FROM book
        ${where}
        ORDER BY ${order_by} ${order.toUpperCase()}
        LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    db.all(sql, params, (err, rows) => {

        if (err) {
            return res.status(500).json({
                message: 'Failed to retrieve books'
            });
        }

        res.status(200).json(rows);
    });
});


// GET book by ID
router.get('/:id', (req, res) => {

    db.get(
        'SELECT * FROM book WHERE id = ?',
        [req.params.id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json(row);
        }
    );
});


// POST - Add new book
router.post('/', (req, res) => {

    const { title, author, price, pages } = req.body;

    if (!title || !title.trim() ||
        !author || !author.trim() ||
        price === undefined || price === null ||
        String(price).trim() === '' ||
        !Number.isFinite(Number(price)) ||
        pages === undefined || pages === null ||
        String(pages).trim() === '' ||
        !Number.isInteger(Number(pages)) ||
        Number(pages) < 0) {

        return res.status(400).json({
            message: 'Valid title, author, price and pages are required'
        });
    }

    db.run(
        'INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)',
        [title.trim(), author.trim(), Number(price), Number(pages)],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to add book'
                });
            }

            res.status(201).json({
                message: 'Book created successfully',
                id: this.lastID
            });
        }
    );
});


// PUT - Update book
router.put('/:id', (req, res) => {

    const { title, author, price, pages } = req.body;

    if (!title || !title.trim() ||
        !author || !author.trim() ||
        price === undefined || price === null ||
        String(price).trim() === '' ||
        !Number.isFinite(Number(price)) ||
        pages === undefined || pages === null ||
        String(pages).trim() === '' ||
        !Number.isInteger(Number(pages)) ||
        Number(pages) < 0) {

        return res.status(400).json({
            message: 'Valid title, author, price and pages are required'
        });
    }

    db.run(
        'UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?',
        [title.trim(), author.trim(), Number(price), Number(pages), req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to update book'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book updated successfully'
            });
        }
    );
});


// DELETE book
router.delete('/:id', (req, res) => {

    db.run(
        'DELETE FROM book WHERE id = ?',
        [req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: 'Failed to delete book'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book deleted successfully'
            });
        }
    );
});

module.exports = router;