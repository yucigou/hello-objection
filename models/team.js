const BaseModel = require('./connector')

class Team extends BaseModel {
  static get tableName() {
    return 'team'
  }

  static get schema() {
    return {
      properties: {
        role: { type: 'string' },
        created: { type: 'timestamp' },
        updated: { type: 'timestamp' },
      },
    }
  }

  static get relationMappings() {
    return {}
  }

  static async selectByRole(role) {
    const teams = Team.query().where('role', role)
    console.log('teams: ', teams)
    return teams && teams.length > 0 ? teams[0] : null
  }

  static async selectAll() {
    const teams = Team.query()
    console.log('teams: ', teams)
    return teams
  }

  static delete(role) {
    const numberOfDeletedRows = Team.query().delete().where('role', role)
    console.log('numberOfDeletedRows: ', numberOfDeletedRows)
    return numberOfDeletedRows
  }
}
module.exports = Team
