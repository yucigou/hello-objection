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
        email: { type : ['string'] }
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
}

module.exports = User