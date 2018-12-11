const { Model } = require('objection')
const uuid = require('uuid')
const BaseModel = require('./connector')

class ManuscriptTeamUser extends BaseModel {
  static get tableName() {
    return 'manuscript_team_users'
  }

  static get schema() {
    return {
      properties: {
        id: { type: 'uuid' },
        created: { type: 'timestamp' },
        updated: { type: 'timestamp' },
        manuscriptId: { type: 'uuid' },
        userId: { type: 'uuid' },
        teamRole: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Manuscript = require('./manuscript')
    const Team = require('./team')
    const User = require('./user')
    
    return {
      manuscript: {
        relation: Model.BelongsToOneRelation,
        modelClass: Manuscript,
        join: {
          from: 'manuscript_team_users.manuscriptId',
          to: 'manuscript.id',
        },
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: 'manuscript_team_users.teamRole',
          to: 'team.role',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'manuscript_team_users.userId',
          to: 'users.id',
        },
      },
    }
  }

  static async selectById(id) {
    const mappings = ManuscriptTeamUser.query().where('id', id)
    console.log('mappings: ', mappings)
    return mappings && mappings.length > 0 ? mappings[0] : null
  }

  static async selectByManuscriptId(manId) {
    const mappings = ManuscriptTeamUser.query().where('manuscript_id', id)
    console.log('mappings: ', mappings)
    return mappings
  }

  static async selectByUserIdAndManuscriptId(userId, manId) {
    const mappings = ManuscriptTeamUser.query()
      .where('manuscript_id', manId)
      .andWhere('userId', userId)
    console.log('mappings: ', mappings)
    return mappings
  }

  static async selectByUserId(userId) {
    const mappings = ManuscriptTeamUser.query().where('userId', userId)
    console.log('mappings: ', mappings)
    return mappings
  }

  static async selectAll() {
    const mappings = ManuscriptTeamUser.query()
    console.log('mappings: ', mappings)
    return mappings
  }

  static delete(id) {
    const numberOfDeletedRows = ManuscriptTeamUser.query().delete().where('id', id)
    console.log('numberOfDeletedRows: ', numberOfDeletedRows)
    return numberOfDeletedRows
  }
}
module.exports = ManuscriptTeamUser
