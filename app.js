// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
const items = [
    { id: 1, name: 'Apple', value: 10 },
    { id: 2, name: 'Banana', value: 20 },
    { id: 3, name: 'Orange', value: 30 }
];
let nextId = 4;

// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index', { items });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { name, value } = req.body;
    items.push({ id: nextId++, name, value: parseInt(value) });
    res.redirect('/');
});

app.get('/list', (req, res) => {
    res.render('list', { items });
});

app.get('/edit/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.render('edit', { item });
    } else {
        res.redirect('/list');
    }
});

app.post('/edit/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        item.name = req.body.name;
        item.value = parseInt(req.body.value);
    }
    res.redirect('/list');
});

app.post('/delete/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
        items.splice(index, 1);
    }
    res.redirect('/list');
});


// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
