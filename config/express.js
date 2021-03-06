const bodyParser = require('body-parser')

module.exports = (app, passport) => {
	/* See: https://www.npmjs.com/package/body-parser
	 */
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use(passport.initialize())

	/* I prefer not to use persistent login sessions
	   See: http://www.passportjs.org/docs/downloads/html/
	 */
	/* app.use(passport.session()) */
}