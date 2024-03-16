const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const path = require("path")
const jwt = require('jsonwebtoken');
const JWT_SECRET = "super-secret-6FDFBB8F-2909-4565-85EA-3F685784355E";
const bookData = require('./data.json');

const app = express();
app.use(cors())
const PORT = 8081;

// Middleware
app.use(bodyParser.json());

let books = bookData.books;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.split(" ");
    token = token[1];
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

// API to generate JWT token (login)
app.post('/books/store/login', (req, res) => {
    const { username, password } = req.body;
    // Validation of  username and password 
    if (username === 'bookStore24/7' && password === '@2024') {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});


// Routes
app.get('/books/list', (req, res) => {
    res.json(books);
});
app.get('/books/:id', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    let filteredbooks = books.filter(book => book.id == id);
    res.json(filteredbooks);
});
// add new book in the list
app.post('/books/add', verifyToken, (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(200).json(newBook);
});
// update book details of the list
app.post('/books/:id/update', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    books = books.map(book => {
        if (book.id == id) {
            return { ...book, ...updatedBook };
        }
        return book;
    });
    res.json(books.find(book => book.id == id));
});

// delete book from List
app.post('/books/:id/delete', verifyToken, (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(book => book.id != id);
    res.status(200).send();
});
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "Frontend", "dist/simple-book-store-app")));
    res.sendFile(path.resolve(__dirname, "Frontend", "dist/simple-book-store-app", "index.html"));
});
// server start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});