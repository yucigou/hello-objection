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

describe('Objection many-to-many operation: insertGraph', () => {
	afterAll(() => {
		User.destroy()
	})

	test("Creating a user with two teams", async () => {
		let user = new User(yuci)

		try {
			let val = await user.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}
	})
})
