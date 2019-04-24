import React from 'react';
import BookList from './components/BookList';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
    <div className="App">
    <h3>Reading List</h3> 
      <BookList></BookList>    
    </div>
    </ApolloProvider>
  );
}

export default App;
