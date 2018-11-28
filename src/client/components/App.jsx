import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Greeting from './Greeting.jsx';
// import defaults from '../graphql/defaults';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/typeDefs';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  clientState: {
    // defaults,
    resolvers,
    typeDefs
  },
  uri: "http://localhost:3300/graphql"
});

class App extends Component {
  render() {
    return (
    	<ApolloProvider client={client}>
	    	<Greeting />
	    </ApolloProvider>
   	);
  }
}

export default App;