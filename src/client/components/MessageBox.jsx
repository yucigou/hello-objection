import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const MESSAGE_BOX = gql`
  {
    messageBox @client
  }
`;

const MessageBox = () => (
  <Query query={MESSAGE_BOX}>
    {({ loading, error, data, client }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
      	<div>
          <h2>Messages:</h2>
          {
            data.messageBox.map(message => <p key={message}>{message}</p>)
          }
        </div>
      );
    }}
  </Query>
);

export default MessageBox;