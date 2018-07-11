const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

conn.connect();

conn.query('SELECT * FROM USERS', (err, results, fields) => {
  if(err) throw err;
  console.log(results);
})

conn.end();