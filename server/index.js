require('dotenv').config()
const express = require('express')
const passport = require('passport')
const db = require('../db')

const port = process.env.PORT || 3300
const app = express()

//serves the index.html
app.use(express.static(__dirname +'./../'))

require('../config/passport')(passport, db)
require('../config/express')(app, passport)
require('../config/routes')(app, passport)

const server = app.listen(port, () => {
	console.log('Express app started on port ' + port)
})

const io = require('./socket').init(server);
io.on('connection', client => {
	console.log('Collection received from client')
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});

server.on('close', () => {
	console.log('Closed express server')
	db.pool.end(() => {
		console.log('Shut down connection pool')
	})
})