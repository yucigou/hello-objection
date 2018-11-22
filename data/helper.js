const passport = require('passport')

const auth = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('local', { session: false }, (err, user) => {
  	if (err) {
  		console.log('err: ', err)
  	}
  	console.log('user: ', user)
    if (err) reject(err);
    if (user) resolve(user);
    else reject('Unauthorized');
  })(req, res);
});

module.exports = { auth }