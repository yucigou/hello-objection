import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Greeting from './Greeting.jsx';
import Feed from './Feed.jsx';
import PostMessage from './PostMessage.jsx';
import MessageBox from './MessageBox.jsx';
import defaults from '../graphql/defaults';
import resolvers from '../graphql/resolvers';
import clientTypeDefs from '../graphql/typeDefs';
import commonTypeDefs from '../../../config/typeDefs';

const typeDefs = [
  commonTypeDefs,
  clientTypeDefs
]

console.log('typeDefs: ', typeDefs)

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  },
  uri: "http://localhost:3300/graphql"
});

class App extends Component {
  render() {
    return (
    	<ApolloProvider client={client}>
        <Feed />
	    	<Greeting />
	    	<PostMessage />
	    	<MessageBox />
	    </ApolloProvider>
   	);
  }
}

export default App;