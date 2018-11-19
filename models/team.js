const { Model } = require('objection')
const BaseModel = require('./connector')

class Team extends BaseModel {
  static get tableName() {
    return 'team';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        role: { type : ['string'] }
      }
    }
  }

  static get relationMappings() {
    const User = require('./user')

    return {
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'team.id',
          through: {
            from: 'usersteam.teamid',
            to: 'usersteam.userid'
          },
          to: 'users.id'
        }
      }  
    }
  }
}

module.exports = Team