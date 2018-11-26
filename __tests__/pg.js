require('dotenv').config()
const uuidv4 = require('uuid/v4');
const { Pool, Client } = require('pg')

// console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

// pools will use environment variables
// for connection information
const pool = new Pool()

const createUser = () => {
    const values = [uuidv4(), 'ORCID'];
    return pool.query(`INSERT INTO users (id, default_identity) VALUES($1, $2) RETURNING *`, values);
}

describe('Pure-postgres database operation', () => {
  test("Creating user", async () => {
  	let {rows} = await createUser();
  	console.log('rows', rows)
  })
})
