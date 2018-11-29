export default `
    type User {
      id: ID!
    }

    type Message {
      id: ID!
      message: String!
    }

    type Query {
      me: User
      sayHello: String!
      messageBox: [Message]
    }

    type Mutation {
      signup (username: String!, email: String!, password: String!): String
      login (username: String!, password: String!): String
      signin (username: String!, password: String!): String
      postMessage (message: String!): [Message]
    }
`;
