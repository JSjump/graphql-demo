
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloProvider } from "react-apollo";
// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
//   cache: new InMemoryCache(),
// })

const link = createHttpLink({
    uri: "http://localhost:4000/graphql"
  });
  

const client =  new ApolloClient({
    link,
    cache: new InMemoryCache({
        addTypename: true
    })
})
export default client;