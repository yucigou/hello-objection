exports.seed = async (knex, Promise) => {
  await knex('team').del()
  await knex('team').insert([
    {
      role: 'Submitter',
      created: new Date().toISOString(),
    },
    {
      role: 'Reviewer',
      created: new Date().toISOString(),
    },
    {
      role: 'Admin',
      created: new Date().toISOString(),
    },
  ])
}
