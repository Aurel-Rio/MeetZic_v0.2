const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'riozacki',
  password: 'Domino777.',
  database: 'meetzic_test'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

module.exports = db;