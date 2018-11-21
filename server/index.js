const express = require('express')
const passport = require('passport')
const db = require('../db')

const port = process.env.PORT || 3000
const app = express()

require('../config/passport')(passport, db)
require('../config/express')(app, passport)
require('../config/routes')(app, passport)

app.use(passport.initialize())

// I prefer not to use persistent login sessions
/* app.use(passport.session()) */

app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(port, () => {
	console.log('Express app started on port ' + port)
})

server.on('close', () => {
	console.log('Closed express server')
	db.pool.end(() => {
		console.log('Shut down connection pool')
	})
})