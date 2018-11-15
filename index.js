const Person = require('./models/person');
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

// const query = async () => {
// 	console.log('Querying...')
// 	return await Person.query()
// }

// const who = query()
// console.log('Who: ', who)

// Person.query().save(person)

let person = new Person(yuci)
person.save()

// process.exit(0)