const { Model } = require('objection')
const BaseModel = require('./connector')
const Person = require('./person')

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

  // static get relationMappings() {
  //   return {
  //     ownerid: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Person,
  //       join: {
  //         from: 'animals.ownerid',
  //         to: 'people.id'
  //       }
  //     }  
  //   }
  // }
}

module.exports = Animal


