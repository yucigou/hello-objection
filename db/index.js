const { Pool, Client } = require('pg')

const pool = new Pool()
pool.on('error', function (err) {
	console.log('idle client error', err.message, err.stack)
})

module.exports = {
	pool,
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	}
}
