import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Users, Quotes } from "./data/db.js";
const typeDefs = gql`
  type Query {
    users: [Users]  
    quotes:[Quotes]
    user(id:ID!):Users
    quotesByUserId(user_id:ID!):[Quotes]
  }
  type Users {
    id: ID
    name: String
    email: String
    password: String
    quotes:[Quotes]
  }
  type Quotes {
    quote_value: String
    user_id: ID
  }

`;

const resolvers = {
  Query: {
    users: () => Users,
    user: (root, { id }) => Users.find((user) => user.id === id),
    quotes: () => Quotes,
    quotesByUserId: (root, { user_id }) => Quotes.filter((quote) => quote.user_id === user_id),
  },
  Users:{
    quotes:(user)=> Quotes.filter(quote => quote.user_id===user.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`���  Server ready at ${url}`);
});
