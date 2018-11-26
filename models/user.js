const { Model } = require('objection')
const bcrypt = require('bcrypt')
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
  
  static async findByUsername(username) {
    const user = await User.query().join('identity', 'users.id', 'identity.user_id').where("identity.username", username).eager('identity')
    console.log('user: ', user)
    return user && user.length > 0 ? user[0] : null
  }

  static async validateUser(username, password) {
    const user = await User.findByUsername(username)
    if (!user) {
      throw new Error('No user with that username')
    }

    const passwordHashed = user.identity
      .filter(id => id.username === username)
      .map(id => id.passwordHash)
      .reduce((a, b) => b, '')

    const valid = await bcrypt.compare(password, passwordHashed)
    if (!valid) {
      throw new Error('Incorrect password')
    }

    return user.id
  }

  static async findById(id) {
    const user = await User.query().where("id", id)
    console.log('user: ', user)
    return user && user.length > 0 ? user[0] : null
  }

  static async create({username, email, password}) {
    const user = new User()
    return await User.query().upsertGraph({email, password})
  }

  async addIdentity(username, email, password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10))

    this.updateProperties({
      identity: {
        username, 
        email, 
        passwordHash: await bcrypt.hash(password, salt),
        type: 'local'
      }
    })
  }
}

module.exports = User