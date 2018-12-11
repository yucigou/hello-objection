const { Model } = require('objection')
const BaseModel = require('./connector')

class Manuscript extends BaseModel {
  static get tableName() {
    return 'manuscript'
  }

  static get schema() {
    return {
      properties: {
        id: { type: 'uuid' },
        organizationId: { type: 'uuid' },
        journalId: { type: 'uuid' },
        created: { type: 'timestamp' },
        updated: { type: 'timestamp' },
        deleted: { type: 'timestamp' },
        createdBy: { type: ['string', 'null'] },
        previousVersion: { type: 'uuid' },
        status: { type: ['string', 'null'] },
        formState: { type: [['string', 'null'], 'null'] },
        decision: { type: ['string', 'null'] },
        emsid: { type: 'int' },
        pdfDepositId: { type: 'uuid' },
        pdfDepositState: { type: ['string', 'null'] },
        'meta,title': { type: ['string', 'null'] },
        'meta,articleType': { type: ['string', 'null'] },
        'meta,articleIds': { type: ['string', 'null'] },
        'meta,abstract': { type: ['string', 'null'] },
        'meta,subjects': { type: ['string', 'null'] },
        'meta,publicationDates': { type: ['string', 'null'] },
        'meta,notes': { type: ['string', 'null'] },
        'meta,volume': { type: ['string', 'null'] },
        'meta,issue': { type: ['string', 'null'] },
        'meta,location': { type: ['string', 'null'] },
        'meta,fundingGroup': { type: ['string', 'null'] },
        'meta,releaseDelay': { type: ['string', 'null'] },
        'meta,unmatchedJournal': { type: ['string', 'null'] },
      },
    }
  }

  static get relationMappings() {
    const File = require('../file/data-access')
    const Journal = require('../journal/data-access')
    const Review = require('../review/data-access')
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'manuscript.id',
          to: 'review.manuscriptId',
        },
      },
      files: {
        relation: Model.HasManyRelation,
        modelClass: File,
        join: {
          from: 'manuscript.id',
          to: 'file.manuscriptId',
        },
      },
      journal: {
        relation: Model.BelongsToOneRelation,
        modelClass: Journal,
        join: {
          from: 'manuscript.journalId',
          to: 'journal.id',
        },
      },
    }
  }

  static async selectById(id) {
    const manuscripts = await Manuscript.query()
      .where('id', id)
      .eager()
    return manuscripts[0]
  }

  static async selectByIdAndUser(id, user) {
    const manuscripts = await Manuscript.query()
      .where('id', id)
      .andWhere('created_by', user)
    return manuscripts[0]
  }

  static async selectByStatus(status, user) {
    // const query = joinSelect
    //   .clone()
    //   .where({ 'manuscript.status': status, 'manuscript.created_by': user })
    // const rows = await runQuery(query)
    // return rows.map(rowToEntity)
  }

  static async selectByPdfDepositStatesNull() {
    // const query = joinSelect.clone().whereNull('manuscript.pdf_deposit_state')
    // const rows = await runQuery(query)
    // return rows.map(rowToEntity)
  }

  static async selectByPdfDepositStates(depositStates) {
    // const query = joinSelect
    //   .clone()
    //   .whereIn('manuscript.pdf_deposit_state', depositStates)
    // const rows = await runQuery(query)
    // return rows.map(rowToEntity)
  }

  static async selectAll(user) {
    const manuscripts = await Manuscript.query()
      .where('created_by', user)
      .eager()
    return manuscripts
  }

  static async insert(manuscript) {
    const { id } = await Manuscript.query().insertGraph(manuscript)
    const manuscriptInserted = await Manuscript.query()
      .where('id', id)
      .eager()
    return manuscriptInserted[0]
  }

  static update(manuscript) {
    // const row = entityToRow(manuscript, columnNames)
    // const query = buildQuery
    //   .update(row)
    //   .table('manuscript')
    //   .where('id', manuscript.id)
    // return runQuery(query)
  }

  static async delete(id, trx) {
    await Manuscript.query(trx).patchAndFetchById(id, {
      deleted: new Date().toISOString(),
    })
  }
}

module.exports = Manuscript
