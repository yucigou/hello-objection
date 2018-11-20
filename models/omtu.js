const { Model } = require('objection')
const BaseModel = require('./connector')

class Omtu extends BaseModel {
  static get tableName() {
    return 'omtu';
  }

  static get schema() {
    return {
      properties: {
        userid: { type: ['uuid'] },
        teamid: { type : ['uuid'] },
        manuscriptid: { type : ['uuid'] },
        organizationid: { type : ['uuid'] }
      }
    }
  }

  static get relationMappings() {
    const Team = require('./team')
    const User = require('./user')
    const Manuscript = require('./manuscript')
    const Organization = require('./organization')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'omtu.userid',
          to: 'users.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: 'omtu.teamid',
          to: 'team.id'
        }
      },
      manuscript: {
        relation: Model.BelongsToOneRelation,
        modelClass: Manuscript,
        join: {
          from: 'omtu.manuscriptid',
          to: 'manuscript.id'
        }
      },
      organization: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organization,
        join: {
          from: 'omtu.organizationid',
          to: 'organization.id'
        }
      }
    }
  }

}

module.exports = Omtu