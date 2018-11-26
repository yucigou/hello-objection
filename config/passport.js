const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy;
const jwt = require('jsonwebtoken')

/* See: https://www.npmjs.com/package/passport-local
*/
module.exports = (passport, db) => {
	passport.use(new LocalStrategy((username, password, cb) => {
		console.log("Authenticating user: ", username)

		db.query('SELECT u.id as id, i.password_hash as password FROM users u INNER JOIN identity i on u.id = i.user_id WHERE i.username =$1', [username], (err, result) => {
			if(err) {
				console.log('Error when selecting user on login', err)
				return cb(err)
			}

			if(result.rows.length > 0) {
				const first = result.rows[0]
				bcrypt.compare(password, first.password, function(err, res) {
					console.log("Authentication result: ", res)

					if(res) {
						cb(null, { id: first.id })
					} else {
						cb(null, false)
					}
				})
			} else {
				cb(null, false)
			}
		})
	}))

	passport.use(new BearerStrategy((token, done) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			console.log("decoded: ", decoded)

			if (err) {
				console.log('err: ', err)
				return done(null)
			}

			return done(null, {
				id: decoded.id,
			}, {
				id: decoded.id,
				token,
			})
		})
	}))

	passport.use(new AnonymousStrategy());

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