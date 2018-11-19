const User = require('../models/user');
const Team = require('../models/team');
const Manuscript = require('../models/manuscript');
const UserTeamManuscript = require('../models/userteammanuscript');
const uuidv4 = require('uuid/v4');

describe('Objection many-to-many operation: update triple-join table', () => {
	const user1 = {
		id: uuidv4(),
		email: 'user1@example1.com'
	}

	const user2 = {
		id: uuidv4(),
		email: 'user2@example1.com'
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

	const userTeamManuscript1 = {
		userid: user1.id,
		teamid: team2.id,
		manuscriptid: manuscript1.id
	}

	const userTeamManuscript2 = {
		userid: user2.id,
		teamid: team1.id,
		manuscriptid: manuscript2.id
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

	test("Adding two join relations", async () => {
		let userTeamManuscript = new UserTeamManuscript(userTeamManuscript1)
		let val = await userTeamManuscript.save()
		console.log("Objects upserted: ", val)

		userTeamManuscript = new UserTeamManuscript(userTeamManuscript2)
		val = await userTeamManuscript.save()
		console.log("Objects upserted: ", val)
	})

})
