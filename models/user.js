const { Model } = require('objection')
const BaseModel = require('./connector')
const Team = require('./team')

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        email: { type : ['string'] },
        password: { type : ['string'] }
      }
    }
  }

  static get relationMappings() {
    return {
      team: {
        relation: Model.ManyToManyRelation,
        modelClass: Team,
        join: {
          from: 'users.id',
          through: {
            from: 'usersteam.userid',
            to: 'usersteam.teamid'
          },
          to: 'team.id'
        }
      }  
    }
  }

  static async findOne(email) {
    const user = await User.query().where("email", email)
    console.log('user: ', user)
    return user && user.length > 0 ? user[0] : null
  }

  static async findById(id) {
    const user = await User.query().where("id", id)
    console.log('user: ', user)
    return user && user.length > 0 ? user[0] : null
  }

  static async create({email, password}) {
    return await User.query().upsertGraph({email, password})
  }
}

module.exports = User