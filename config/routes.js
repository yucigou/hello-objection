const users = require('../app/users')

module.exports = (app, passport) => {
	app.post('/api/login',
		passport.authenticate('local', {
			session: false
		}),
		users.login)

	app.get('/api/logout', users.logout)
}