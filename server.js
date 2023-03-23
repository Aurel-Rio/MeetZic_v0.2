const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

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

app.get('/', function(req, res) {
  const FormLogin = require('./client/components/FormLogin');
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Meet'Zic</title>
    </head>
    <body>
      <section class="Welcome">
        <h4>Bienvenue sur Meet'Zic</h4>
      </section>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
      <script type="module" src="./client/components/FormLogin.js"></script>
    </body>
  </html>
  `;
  res.send(html);
});