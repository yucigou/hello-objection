const { makeExecutableSchema } = require('graphql-tools')
const commonTypeDefs = require('../config/typeDefs')
const resolvers = require('./resolvers')

const typeDefs = [
  commonTypeDefs
]
console.log('typeDefs: ', typeDefs)

module.exports = makeExecutableSchema({ typeDefs, resolvers })
