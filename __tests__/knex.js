require('dotenv').config();
const Knex = require('knex');
const uuidv4 = require('uuid/v4');

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {min: 2, max: 10}
});

describe('Test with Knex', () => {
	afterAll(() => {
		knex.destroy()
	})

	test('Query PG version', async () => {
		let version = knex.raw("SELECT VERSION()");
		// console.log('PG version: ', version)
		expect(version.client.config.client).toBe('pg')
	})

	test('Add a person', async () => {
		const people = [{
			id: uuidv4(),
			firstname: 'Y',
			lastname: 'G'
		},{
			id: uuidv4(),
			firstname: 'H',
			lastname: 'G'
		}]
		let res = await knex('people').insert(people)
		expect(res.rowCount).toBe(2)
	})
})