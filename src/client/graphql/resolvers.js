import gql from 'graphql-tag';
const uuid = require('uuid');

const query = gql`
  query GetMessages {
    messages @client {
      id
      text
    }
  }
`;

export default {
  Mutation: {
    postMessage: (_, { text }, { cache }) => {
      const previous = cache.readQuery({ query });
      const newMessage = {
        id: uuid.v4(),
        text,
        __typename: 'MessageItem',
      }
      
      const data = {
        messages: previous.messages.concat([newMessage]),
      };
      try {
        cache.writeData({ data });
      } catch (err) {
        console.log('err: ', err)
      }
      return newMessage;
    },
  },
};
