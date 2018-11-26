const { Model } = require('objection')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const config = require('config')
const BaseModel = require('./connector')
const User = require('./user')


const BCRYPT_COST = 12

class Identity extends BaseModel {
  static get tableName() {
    return 'identity'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'identity.user_id',
          to: 'users.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        id: { type: 'uuid' },
        email: { type: 'string' },
        passwordHash: { type: 'string' },
        displayName: { type: 'string' },
        username: { type: 'string' },
        userId: { type: 'uuid' },
        identifier: { type: 'string'},
        meta: {type: 'object'}
      },
    }
  }

  static hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_COST)
  }
}

module.exports = Identity
