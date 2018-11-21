const users = require('../app/users')

module.exports = (app, passport) => {
	app.get('/', (req, res) => res.send('Hello World!'))

	app.post('/api/login',
		passport.authenticate('local', {
			session: false
		}),
		users.login)

	app.get('/api/logout', users.logout)
}