const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

    // Define our schema using the GraphQL schema language
const typeDefs = `
    type User {
      id: ID!
    }

    type Query {
      me: User
      sayHello: String!
    }

    type Mutation {
      signup (username: String!, email: String!, password: String!): String
      login (username: String!, password: String!): String
      signin (username: String!, password: String!): String
    }
    `
module.exports = makeExecutableSchema({ typeDefs, resolvers })
