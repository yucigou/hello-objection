import gql from 'graphql-tag';
const uuid = require('uuid');

const query = gql`
{
  messageBox @client
}
`;

export default {
  Mutation: {
    postMessage: (_, variables, { cache }) => {
      const { messageBox } = cache.readQuery({ query });
      // const newMessage = {
        // id: uuid.v4(),
        // message: variables.text,
        // __typename: 'Message',
      // }
      const newMessage = variables.text
      messageBox.push(newMessage)
      
      const data = {
        messageBox
      };
      cache.writeData({ data });
      return messageBox;
    },
  },
};
