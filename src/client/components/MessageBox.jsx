import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const MESSAGE_BOX = gql`
  {
    messages @client {
      id
      text
    }
  }
`;

const MessageBox = () => (
  <Query query={MESSAGE_BOX}>
    {({ loading, error, data, client }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (!data) return <p>No data</p>;
      if (!data.messages) return <p>No messages</p>;
      if (data.messages.length === 0) return <p>No message</p>;

      return (
      	<div>
          <h2>Messages:</h2>
          {
            data.messages.map(message => <p key={message.id}>{message.text}</p>)
          }
        </div>
      );
    }}
  </Query>
);

export default MessageBox;