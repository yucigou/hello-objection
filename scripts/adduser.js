require('dotenv').config()
const bcrypt = require('bcrypt')
const {query} = require('../db')
const uuidv4 = require('uuid/v4');

const saltRounds = process.env.BCRYPT_SALT_ROUNDS //the higher the better - the longer it takes to generate & compare
const password = bcrypt.hashSync(process.env.USER_PASSWORD, saltRounds)

const insert = async () => {
	await query(`INSERT INTO users (id, email, password) VALUES($1, $2, $3) RETURNING *`, [uuidv4(), process.env.USER_EMAIL, password])
}

insert()
