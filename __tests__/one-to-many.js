const Person = require('../models/person');
const Animal = require('../models/animal');

describe('Objection_Ops_one-to-many_01', () => {
	const yuci = {
		firstname: 'Yuci',
		lastname: 'Gou',
		animals: [
			{
				name: 'Book'
			},
			{
				name: 'Tiger'
			}
		]
	}

	let inserted

	test("Objection_Ops_one-to-many_01_creating_a_person", async () => {
		let person = new Person(yuci)
		inserted = await person.save()
		console.log("Objects inserted: ", inserted)
	})

	test("Objection_Ops_one-to-many_01_querying_a_person", async () => {
		let val = await Person.query().where('id', inserted.id).eager('animals')
		console.log("Object returned: ", val)
		
		expect(val).not.toBe(undefined)
		expect(val.length).not.toBe(0)
		expect(val[0].firstname).toBe(yuci.firstname)

		let animals = val[0].animals
		expect(animals).not.toBe(undefined)
		expect(animals.length).toBe(2)
		expect([yuci.animals[0].name, yuci.animals[1].name]).toContain(animals[0].name)
	})
})

describe('Objection_Ops_one-to-many_02', () => {
	const person1 = {
		firstname: 'Adam',
		lastname: 'Smith'
	}

	const animal1 = {
		name: 'Salt'
	}

	const animal2 = {
		name: 'Fibre'
	}


	afterAll(() => {
		Person.destroy()
	})

	let inserted
	test("Objection_Ops_one-to-many_02_creating_a_person_without_animals", async () => {
		let person = new Person(person1)
		inserted = await person.save()
		console.log("Objects inserted: ", inserted)
	})

	test("Objection_Ops_one-to-many_02_creating_animals", async () => {
		animal1.ownerid = inserted.id
		let animal = new Animal(animal1)
		let val = await animal.save()
		console.log("Objects inserted: ", val)

		animal2.ownerid = inserted.id
		animal = new Animal(animal2)
		val = await animal.save()
		console.log("Objects inserted: ", val)
	})
})