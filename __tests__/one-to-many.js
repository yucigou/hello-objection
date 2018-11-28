const User = require('../models/user');

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Objection_Ops_one-to-many_01', () => {
	test("Objection_Ops_one-to-many_01_querying_a_user", async () => {
		let users = await User.query().where('id', '6e9ae3eb-809e-4dac-bac8-0b06fe835a58').eager('identities')
		console.log("users: ", users)
		console.log("user one: ", users[0])
		console.log("user one's identities: ", users[0].identities)
		expect(users[0].id).toBe('6e9ae3eb-809e-4dac-bac8-0b06fe835a58')
	})
})
