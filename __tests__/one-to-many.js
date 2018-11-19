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

describe('Objection operation', () => {
	afterAll(() => {
		Person.destroy()
	})

	test("Creating person", async () => {
		let person = new Person(yuci)
		try {
			let val = await person.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}
	})
})