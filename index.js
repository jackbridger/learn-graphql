const { ApolloServer, PubSub } = require('apollo-server');
const { MONGODB } = require('./config')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const mongoose = require('mongoose')
const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
})

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb connected')
        return server.listen({ port: 5000 });
    }).then(res => {
        console.log(`server running at ${res.url}`)
    })