const { Model } = require('objection')
const BaseModel = require('./connector')

class UserTeamManuscript extends BaseModel {
  static get tableName() {
    return 'usersteammanuscript';
  }

  static get schema() {
    return {
      properties: {
        userid: { type: ['uuid'] },
        teamid: { type : ['uuid'] },
        manuscriptid: { type : ['uuid'] }
      }
    }
  }

  static get idColumn() {
    return ['userid', 'teamid', 'manuscriptid'];
  }

  static get relationMappings() {
    const Team = require('./team')
    const User = require('./user')
    const Manuscript = require('./manuscript')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'usersteammanuscript.userid',
          to: 'users.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: 'usersteammanuscript.teamid',
          to: 'team.id'
        }
      },
      manuscript: {
        relation: Model.BelongsToOneRelation,
        modelClass: Manuscript,
        join: {
          from: 'usersteammanuscript.manuscriptid',
          to: 'manuscript.id'
        }
      }
    }
  }

}

module.exports = UserTeamManuscript