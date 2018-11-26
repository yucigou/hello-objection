const { Model } = require('objection')
const BaseModel = require('./connector')

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        defaultIdentity: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Identity = require('./identity')

    return {
      identity: {
        relation: Model.HasManyRelation,
        modelClass: Identity,
        join: {
          from: 'users.id',
          to: 'identity.user_id',
        },
      },
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