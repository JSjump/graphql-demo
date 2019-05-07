import React from 'react';
import BookList from './components/BookList';
import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';
// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
//   cache: new InMemoryCache(),
// })

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
