require('dotenv').config();
const uuid = require('uuid')
const { Model, ValidationError, transaction, snakeCaseMappers } = require('objection');
const Knex = require('knex');
const pg = require('pg');
const { merge } = require('lodash')
const config = require('config')

const validationError = (prop, className) =>
  new ValidationError({
    type: 'ModelValidation',
    message: `${prop} is not a property in ${className}'s schema`,
  })

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {min: 2, max: 10}
});

// Give the knex object to objection.
Model.knex(knex);

class BaseModel extends Model {
  constructor(properties) {
    super(properties)

    if (properties) {
      this.updateProperties(properties)
    }

    const handler = {
      set: (obj, prop, value) => {
        if (this.isSettable(prop)) {
          obj[prop] = value
          return true
        }

        throw validationError(prop, obj.constructor.name)
      }
    }

    return new Proxy(this, handler)
  }

  static get columnNameMappers() {
    // If your columns are UPPER_SNAKE_CASE you can
    // use snakeCaseMappers({ upperCase: true })
    return snakeCaseMappers();
  }

  updateProperties(properties) {
    Object.keys(properties).forEach(prop => {
      if (this.isSettable(prop)) {
        this[prop] = properties[prop]
      } else {
        console.log('prop: ', prop)
        debugger
        throw validationError(prop, this.constructor.name)
      }
    })
  }

  isSettable(prop) {
    const special = ['#id', '#ref']
    return (
      special.includes(prop) ||
      this.constructor.jsonSchema.properties[prop] ||
      (this.constructor.relationMappings &&
        this.constructor.relationMappings[prop])
    )
  }

  $beforeInsert() {
    this.id = this.id || uuid.v4()
    this.created = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated = new Date().toISOString()
  }

  static get jsonSchema() {
    let schema

    const mergeSchema = additionalSchema => {
      if (additionalSchema) {
        schema = merge(schema, additionalSchema)
      }
    }

    // Crawls up the prototype chain to collect schema
    // information from models and extended models
    const getSchemasRecursively = object => {
      mergeSchema(object.schema)
      mergeSchema(config.schema[object.name])

      const proto = Object.getPrototypeOf(object)

      if (proto.name !== 'BaseModel') {
        getSchemasRecursively(proto)
      }
    }

    getSchemasRecursively(this)

    const baseSchema = {
      type: 'object',
      properties: {
        type: { type: 'string' },
        id: { type: 'string', format: 'uuid' },
        created: { type: ['string', 'object'], format: 'date-time' },
        updated: {
          anyOf: [
            { type: ['string', 'object'], format: 'date-time' },
            { type: 'null' },
          ],
        },
      },
      additionalProperties: false,
    }

    if (schema) {
      return merge(baseSchema, schema)
    }
    return baseSchema
  }

  async save() {
    let trx
    let saved
    try {
      trx = await transaction.start(knex)
      console.log('Objects to insert is ', this.toJSON())
      saved = await this.constructor.query(trx).upsertGraph(this.toJSON())
      console.log(`Saved ${this.constructor.name} with UUID ${saved.id}`)
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      console.log('Nothing was inserted')
      console.log(error)
      throw error
    }

    return saved
  }

  static destroy() {
    knex.destroy().then(() => {
      console.log('knex destroyed')
    }).catch((err) => {
      console.log('error knex destroyed: ', err)
    })
  }
}

module.exports = BaseModel;