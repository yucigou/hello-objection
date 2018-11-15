const { Model } = require('objection')
const BaseModel = require('./connector')

class Animal extends BaseModel {
  static get tableName() {
    return 'animals';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        name: { type : ['string'] },
        ownerid: { type: ['uuid'] },
      }
    }
  }

  static get relationMappings() {
    const Person = require('./person')

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: 'animals.ownerid',
          to: 'people.id'
        }
      }  
    }
  }
}

module.exports = Animal


