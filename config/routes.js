const users = require('../app/users')
const auth = require('./auth')

module.exports = (app, passport) => {
	app.get('/', auth.optional, (req, res) => res.send('Hello World!'))

	app.get('/me', auth.required, (req, res) => {
		res.json(req.user)
	})

	app.post('/api/login',
		passport.authenticate('local', {
			session: false
		}),
		users.login)

	app.get('/api/logout', users.logout)
}