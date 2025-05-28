import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { split, HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';


const wsLink = new GraphQLWsLink(createClient({
  url: `ws://${process.env.NODE_ENV==='development'? 'localhost:3301' : window.location.host}/graphql`,
    options: {
        reconnect: true,
    },
}));

const httpLink = new HttpLink(
    {
        uri: 'http://localhost:3301/graphql',
        credentials: 'include'
     })

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
    cache: new InMemoryCache(),
})

export {client}

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://localhost:3301/graphql', // update if using env vars or reverse proxy
//     credentials: 'include',              // important for sessions and cookies!
//    }),
//   cache: new InMemoryCache(),
// });
