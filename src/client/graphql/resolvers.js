import gql from 'graphql-tag';
const uuid = require('uuid');

const query = gql`
{
  messageBox @client
}
`;

export default {
  Mutation: {
    postMessage: (_, { text }, { cache }) => {
      const { messageBox } = cache.readQuery({ query });
      const newMessage = {
        id: uuid.v4(),
        message: text
      }
      messageBox.push(newMessage)
      
      const data = {
        messageBox
      };
      cache.writeData({ data });
      return messageBox;
    },
  },
};
