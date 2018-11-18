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
            from: 'users_team.user_id',
            to: 'users_team.team_id'
          },
          to: 'team.id'
        }
      }  
    }
  }
}

module.exports = User