// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { split, HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';

// const wsLink = new GraphQLWsLink(createClient({
//   url: `ws://${process.env.NODE_ENV==='development'? 'localhost:3301' : window.location.host}/graphql`,
//     options: {
//         reconnect: true,
//     },
// }));

// const httpLink = new HttpLink(
//     {
//         uri: 'http://localhost:3301/graphql',
//         credentials: 'include'
//      })

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

// const client = new ApolloClient({
//   link: splitLink,
//     cache: new InMemoryCache(),
// })

// export {client}

import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


// ✅ Dynamically switch between ws:// and wss://
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const wsHost =
  process.env.NODE_ENV === 'development'
  // window.location.protocol === 'http:'
    ? 'localhost:3301'
    : window.location.host;

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${wsProtocol}://${wsHost}/graphql`,
    options: {
      reconnect: true,
    },
  })
);

// ✅ HTTP link (for queries & mutations)
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
    // window.location.protocol === 'http:'
      ? 'http://localhost:3301/graphql'
      : `${window.location.origin}/graphql`,
  credentials: 'include',
});

// ✅ Split links: route subscription traffic to wsLink, others to httpLink
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// ✅ Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

