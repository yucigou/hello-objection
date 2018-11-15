const { Model } = require('objection');
const Knex = require('knex');
const pg = require('pg');
const { merge } = require('lodash')
const config = require('config')

require('dotenv').config();

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
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
      },
    }

    return new Proxy(this, handler)
  }

  updateProperties(properties) {
    Object.keys(properties).forEach(prop => {
      if (this.isSettable(prop)) {
        this[prop] = properties[prop]
      } else {
        console.log('prop: ', prop)
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
    let saved
    if (this.id) {
      saved = await this.constructor
        .query()
        .patchAndFetchById(this.id, this.toJSON())
    }

    if (!saved) {
      // either model has no ID or the ID was not found in the database
      saved = await this.constructor.query().insert(this.toJSON())
    }
    console.log(`Saved ${this.constructor.name} with UUID ${saved.id}`)
    return saved
  }
}

module.exports = BaseModel;