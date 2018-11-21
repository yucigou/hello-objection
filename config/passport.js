const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

/* See: https://www.npmjs.com/package/passport-local
 */
module.exports = (passport, db) => {
	passport.use(new LocalStrategy((email, password, cb) => {
		console.log("Authenticating user: ", email)

		db.query('SELECT id, email, password FROM users WHERE email=$1', [email], (err, result) => {
			if(err) {
				console.log('Error when selecting user on login', err)
				return cb(err)
			}

			if(result.rows.length > 0) {
				const first = result.rows[0]
				bcrypt.compare(password, first.password, function(err, res) {
					console.log("Authentication result: ", res)

					if(res) {
						cb(null, { id: first.id, email: first.email })
					} else {
						cb(null, false)
					}
				})
			} else {
				cb(null, false)
			}
		})
	}))

	// I prefer not to use persistent login sessions
	/*
	passport.serializeUser((user, done) => {
		console.log('serializeUser...')
		done(null, user.id)
	})

	passport.deserializeUser((id, cb) => {
		console.log('deserializeUser...')
		db.query('SELECT id, email FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
			if(err) {
				console.log('Error when selecting user on session deserialize', err)
				return cb(err)
			}

			cb(null, results.rows[0])
		})
	})*/
}