const uuid = require('uuid')

exports.seed = async (knex, Promise) => {
  await knex('organization').del()
  await knex('organization').insert([
    {
      id: uuid.v4(),
      created: new Date().toISOString(),
      name: 'Europe PMC Plus',
    },
  ])
}
