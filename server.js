const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client/build'));

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Domino777.',
  database: 'meetzic_test'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const sqlInsert = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sqlInsert, [username, email, password], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('User registered successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});