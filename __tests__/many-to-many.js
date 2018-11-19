const User = require('../models/user');
const uuidv4 = require('uuid/v4');

const yuciId = uuidv4()

const yuci = {
	id: yuciId,
	email: 'yuci@example.com',
	team: [
		{
			id: uuidv4(),
			role: 'Reviewer'
		},
		{
			id: uuidv4(),
			role: 'Submitter'
		},
	]
}

describe('Objection many-to-many operation', () => {
	afterAll(() => {
		User.destroy()
	})

	test("Creating a user with two teams", () => {
		let user = new User(yuci)
		user.save().then((val) => {
			console.log("Objects inserted: ", val)
		}).catch((reason) => {
			console.log('Handle rejected promise ('+reason+') here.');
		})	
	})
})
