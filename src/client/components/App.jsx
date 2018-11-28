import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import Greeting from './Greeting.jsx';

const client = new ApolloClient({
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