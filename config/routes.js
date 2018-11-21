const passport = require('passport')
const users = require('../app/users')
const auth = require('./auth')

const authBearer = passport.authenticate('bearer', { session: false })

module.exports = (app, passport) => {
	app.get('/', auth.optional, (req, res) => res.send('Hello World!'))

	app.get('/me', auth.required, (req, res) => {
		res.json(req.user)
	})

	app.get('/about', authBearer, (req, res) => {
		res.json(req.user)
	})

	app.post('/api/login',
		passport.authenticate('local', {
			session: false
		}),
		users.login)

	app.get('/api/logout', users.logout)
}