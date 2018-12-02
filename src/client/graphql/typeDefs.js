export default `
    type Message {
      id: ID!
      text: String!
    }

    type Query {
      messages: [Message]
    }

    type Mutation {
      postMessage (text: String!): Message
    }
`;
