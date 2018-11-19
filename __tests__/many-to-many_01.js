const User = require('../models/user');

const yuci = {
	email: 'yuci@example.com',
	team: [
		{
			role: 'Reviewer'
		},
		{
			role: 'Submitter'
		},
	]
}

describe('Objection many-to-many_01 operation: insertGraph', () => {
	afterAll(() => {
		User.destroy()
	})

	test("Creating a user with two teams", async () => {
		let user = new User(yuci)

		let val = await user.save()
		expect(val.email).toBe(yuci.email)
	})
})
