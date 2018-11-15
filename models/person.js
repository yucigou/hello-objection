const { Model } = require('objection')
const BaseModel = require('./connector')
const Animal = require('./animal')

class Person extends BaseModel {
  static get tableName() {
    return 'people';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        firstname: { type : ['string'] },
        lastname: { type : ['string'] }
      }
    }
  }

  static get relationMappings() {
    return {
      animals: {
        relation: Model.HasManyRelation,
        modelClass: Animal,
        join: {
          from: 'people.id',
          to: 'animals.ownerid'
        }
      }  
    }
  }
}

module.exports = Person