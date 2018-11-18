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

let person = new Person(yuci)
person.save().then((val) => {
	console.log("Objects inserted: ", val)
}).catch((reason) => {
    console.log('Handle rejected promise ('+reason+') here.');
}).then(() =>{
	person.destroy()
})
