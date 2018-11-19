const Person = require('../models/person');
const Animal = require('../models/animal');
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

describe('Objection operation on one-to-many: step by step', () => {
	const person1 = {
		id: uuidv4(),
		firstname: 'Adam',
		lastname: 'Smith'
	}

	const animal1 = {
		id: uuidv4(),
		name: 'Salt',
		ownerid: person1.id
	}

	const animal2 = {
		id: uuidv4(),
		name: 'Fibre',
		ownerid: person1.id
	}


	afterAll(() => {
		Person.destroy()
	})

	test("Creating a person without animals", async () => {
		let person = new Person(person1)
		let val = await person.save()
		console.log("Objects inserted: ", val)
	})

	test("Creating animals", async () => {
		let animal = new Animal(animal1)
		let val = await animal.save()
		console.log("Objects inserted: ", val)

		animal = new Animal(animal2)
		val = await animal.save()
		console.log("Objects inserted: ", val)
	})
})