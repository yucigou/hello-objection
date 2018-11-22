const passport = require('passport')
const { graphqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const users = require('../app/users')
const auth = require('./auth')
const schema = require('../data/schema')

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], {
  session: false,
})

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

	/* https://medium.com/@jeffrey.allen.lewis/graphql-migrating-from-apollo-server-express-1-0-to-2-0-be80f5c61bee
	 */
	app.use('/graphql', bodyParser.json(), authBearerAndPublic, graphqlExpress(req => ({
	// app.use('/api', auth.optional, graphqlExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    })))
}