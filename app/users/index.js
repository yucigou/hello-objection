const jwt = require('jsonwebtoken');
const { auth } = require('../../data/helper')

// https://www.npmjs.com/package/jsonwebtoken
const generateJWT = ({id, email}) => {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign({
		id,
		email,
		exp: parseInt(expirationDate.getTime() / 1000, 10),
	}, process.env.JWT_SECRET);
}

module.exports = {
	login: (req, res) => {
		const { user } = req
		console.log("User logged in: ", user)

		user.jwt = generateJWT(user)
		res.json(user)
	},

	signin: async (req, res) => {
		const user = await auth(req, res)
		console.log("User logged in: ", user)

		user.jwt = generateJWT(user)
		res.json(user)
	},

	logout: (req, res, next) => {
		req.session.destroy((err) => {
			if(err) return next(err)

				req.logout()

			res.sendStatus(200)
		})
	},

	ping: function(req, res) {
		res.sendStatus(200)
	}
}