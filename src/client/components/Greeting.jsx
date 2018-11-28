import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const Greeting = () => (
  <Query
    query={gql`
      {
        sayHello
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
      	<div>
          <p>{data.sayHello}</p>
        </div>
      );
    }}
  </Query>
);

export default Greeting;