const bodyParser = require('body-parser')

module.exports = (app, passport) => {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use(passport.initialize())
	app.use(passport.session())
}