import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  headers: {
    Authorization: `Apikey ${process.env.REACT_APP_STEPZEN_API_KEY}`,
  },
  uri: process.env.REACT_APP_STEPZEN_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
