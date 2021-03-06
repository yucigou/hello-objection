const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

    // Define our schema using the GraphQL schema language
const typeDefs = `
    type User {
      id: ID!
      email: String!
    }

    type Query {
      me: User
    }

    type Mutation {
      signup (email: String!, password: String!): String
      login (email: String!, password: String!): String
      signin (email: String!, password: String!): String
    }
    `
module.exports = makeExecutableSchema({ typeDefs, resolvers })
