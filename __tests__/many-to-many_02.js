const User = require('../models/user');
const Team = require('../models/team');
const UserTeam = require('../models/userteam');
const uuidv4 = require('uuid/v4');

describe('Objection many-to-many operation: update join table', () => {
	const user1 = {
		id: uuidv4(),
		email: 'user1@example.com'
	}

	const user2 = {
		id: uuidv4(),
		email: 'user2@example.com'
	}

	const team1 = {
		id: uuidv4(),
		role: 'Reviewer'
	}

	const team2 = {
		id: uuidv4(),
		role: 'Submitter'
	}

	const userTeam1 = {
		userid: user2.id,
		teamid: team1.id
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

	test("Adding a user to a team", async () => {
		// Add user2 to team1
		let userTeam = new UserTeam(userTeam1)
		let val = await userTeam.insert()
		console.log("Objects upserted: ", val)
	})

})
