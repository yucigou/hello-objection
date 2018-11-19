const { Model } = require('objection')
const BaseModel = require('./connector')

class Manuscript extends BaseModel {
  static get tableName() {
    return 'manuscript';
  }

  static get schema() {
    return {
      properties: {
        id: { type: ['uuid'] },
        title: { type : ['string'] }
      }
    }
  }
}

module.exports = Manuscript