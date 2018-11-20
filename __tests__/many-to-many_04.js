const User = require('../models/user');
const Team = require('../models/team');
const Manuscript = require('../models/manuscript');
const Organization = require('../models/organization');
const Omtu = require('../models/omtu');
const uuidv4 = require('uuid/v4');

describe('Objection many-to-many_04 operation: update quadruple-join table', () => {
	const user1 = {
		id: uuidv4(),
		email: 'user1@example04.com'
	}

	const user2 = {
		id: uuidv4(),
		email: 'user2@example04.com'
	}

	const team1 = {
		id: uuidv4(),
		role: 'Reviewer'
	}

	const team2 = {
		id: uuidv4(),
		role: 'Submitter'
	}

	const manuscript1 = {
		id: uuidv4(),
		title: 'TCP/IP Networking'
	}

	const manuscript2 = {
		id: uuidv4(),
		title: 'Literature Services'
	}

	const organization1 = {
		id: uuidv4(),
		name: 'Europe PMC'
	}

	const organization2 = {
		id: uuidv4(),
		name: 'PPR'
	}

	const omtu1 = {
		userid: user1.id,
		teamid: team2.id,
		manuscriptid: manuscript1.id,
		organizationid: organization1.id
	}

	const omtu2 = {
		userid: user2.id,
		teamid: team1.id,
		organizationid: organization2.id
	}

	test("Creating two users", async () => {
		let user = new User(user1)
		try {
			let val = await user.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}

		user = new User(user2)
		try {
			let val = await user.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}
	})

	test("Creating two teams", async () => {
		let team = new Team(team1)
		try {
			let val = await team.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}

		team = new Team(team2)
		try {
			let val = await team.save()
			console.log("Objects inserted: ", val)
		} catch (err) {
			console.log('Handle rejected promise ('+err+') here.');
		}
	})

	test("Creating two manuscripts", async () => {
		let manuscript = new Manuscript(manuscript1)
		let val = await manuscript.save()
		console.log("Objects inserted: ", val)

		manuscript = new Manuscript(manuscript2)
		val = await manuscript.save()
		console.log("Objects inserted: ", val)
	})

	test("Creating two organizations", async () => {
		let organization = new Organization(organization1)
		let val = await organization.save()
		console.log("Organization inserted: ", val)

		organization = new Organization(organization2)
		val = await organization.save()
		console.log("Organization inserted: ", val)
	})

	test("Adding two join relations", async () => {
		let omtu = new Omtu(omtu1)
		let val = await omtu.save()
		console.log("OMTU upserted: ", val)

		omtu = new Omtu(omtu2)
		val = await omtu.save()
		console.log("OMTU upserted: ", val)
	})

})
