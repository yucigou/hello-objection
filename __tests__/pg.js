require('dotenv').config()
// const uuidv4 = require('uuid/v4');
const { Pool, Client } = require('pg')

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

// pools will use environment variables
// for connection information
const pool = new Pool()

const createPerson = () => {
    const values = ['Yuci', 'Gou'];
    return pool.query(`INSERT INTO people (firstname, lastname) VALUES($1, $2) RETURNING *`, values);
}

describe('pg database operation', () => {
  test("Creating person", async () => {
  	let {rows} = await createPerson();
  	console.log('rows', rows)
  })
})
