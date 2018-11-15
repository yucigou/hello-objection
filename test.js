require('dotenv').config()
const uuidv4 = require('uuid/v4');
const { Pool, Client } = require('pg')

// pools will use environment variables
// for connection information
const pool = new Pool()

const createPerson = () => {
    const values = [uuidv4(), 'Yuci', 'Gou'];
    return pool.query(`INSERT INTO people (id, firstname, lastname) VALUES($1, $2, $3) RETURNING *`, values);
}

createPerson().then(({ rows }) => {
  console.log('rows', rows)
}).catch((error) => {
  console.log('error: ', error);
});


// // you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()

// // clients will also use environment variables
// // for connection information
// const client = new Client()
// await client.connect()

// const res = await client.query('SELECT NOW()')
// await client.end()