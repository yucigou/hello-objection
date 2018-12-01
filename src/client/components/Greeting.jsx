import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const SAY_HELLO = gql`
  {
    sayHello
  }
`;

const addExclamation = (client, sayHello) => () => client.writeData({ data: { sayHello: sayHello + '!' }});

const Greeting = () => (
  <Query query={SAY_HELLO} fetchPolicy={'network-only'}>
    {({ loading, error, data, client }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const addExclamationHandler = addExclamation(client, data.sayHello)
      return (
      	<div>
          <p>Reply: {data.sayHello}</p>
          <button onClick={addExclamationHandler}>Add '!'</button>
        </div>
      );
    }}
  </Query>
);

export default Greeting;