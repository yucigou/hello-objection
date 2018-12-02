const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('../config/typeDefs')
const resolvers = require('./resolvers')

module.exports = makeExecutableSchema({ typeDefs, resolvers })
