require('dotenv').config()
const express = require('express')
const passport = require('passport')
const db = require('../db')

const port = process.env.PORT || 3300
const app = express()

require('../config/passport')(passport, db)
require('../config/express')(app, passport)
require('../config/routes')(app, passport)

const server = app.listen(port, () => {
	console.log('Express app started on port ' + port)
})

server.on('close', () => {
	console.log('Closed express server')
	db.pool.end(() => {
		console.log('Shut down connection pool')
	})
})