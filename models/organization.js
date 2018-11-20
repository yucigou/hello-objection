const { Model } = require('objection')
const BaseModel = require('./connector')

class Organization extends BaseModel {
  static get tableName() {
    return 'organization';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        name: { type : ['string'] }
      }
    }
  }
}

module.exports = Organization