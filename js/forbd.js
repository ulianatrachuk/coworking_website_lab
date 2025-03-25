const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'booking'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/api/saveBooking', (req, res) => {
    const { name, email, phone } = req.body;
    const sql = `INSERT INTO bookings (name, email, phone) VALUES ('${name}', '${email}', '${phone}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Booking saved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
