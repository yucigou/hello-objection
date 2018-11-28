const User = require('../models/user');

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Objection_Ops_one-to-many_01', () => {
	test("Objection_Ops_one-to-many_01_querying_a_user", async () => {
		let users = await User.query().where('id', '6c1adf5b-b921-4c87-9d68-096c9cfca61c').eager('identity')
		console.log("Object returned: ", users[0].identity)
		await sleep(1000)
		expect(users[0].id).toBe('6c1adf5b-b921-4c87-9d68-096c9cfca61c')
	})

	test("Objection_Ops_one-to-many_01_querying_a_user_by_username", async () => {
		let users = await User.query().join('identity', 'identity.user_id', 'users.id').where('identity.username', 'ygou').eager('identity')
		console.log("Object returned: ", users[0].identity)
		await sleep(1000)
		expect(users[0].identity[0].username).toBe('ygou')
	})
})
