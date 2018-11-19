const Person = require('../models/person');
const uuidv4 = require('uuid/v4');

const yuciId = uuidv4()

const yuci = {
	id: yuciId,
	firstname: 'Yuci',
	lastname: 'Gou',
	animals: [
		{
			id: uuidv4(),
			name: 'Book',
			ownerid: yuciId
		},
		{
			id: uuidv4(),
			name: 'Tiger',
			ownerid: yuciId
		}
	]
}

describe('Objection operation on one-to-many', () => {
	afterAll(() => {
		Person.destroy()
	})

	test("Creating a person", async () => {
		let person = new Person(yuci)
		try {
			let val = await person.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}
	})

	test("Querying a person", async () => {
		let val = await Person.query().where('id', yuciId)
		console.log("Object returned: ", val)
		expect(val).not.toBe(undefined)
		expect(val.length).not.toBe(0)
		expect(val[0].firstname).toBe(yuci.firstname)
	})
})