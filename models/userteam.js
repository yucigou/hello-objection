const { Model } = require('objection')
const BaseModel = require('./connector')

class UserTeam extends BaseModel {
  static get tableName() {
    return 'usersteam';
  }

  static get schema() {
    return {
      properties: {
        userid: { type: ['uuid'] },
        teamid: { type : ['uuid'] }
      }
    }
  }

  static get idColumn() {
    return ['userid', 'teamid'];
  }

  static get relationMappings() {
    const Team = require('./team')
    const User = require('./user')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'usersteam.userid',
          to: 'users.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: 'usersteam.teamid',
          to: 'team.id'
        }
      }  
    }
  }

}

module.exports = UserTeam