const { ApolloServer } = require('apollo-server');
const { MONGODB } = require('./config')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const mongoose = require('mongoose')


const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb connected')
        return server.listen({ port: 5000 });
    }).then(res => {
        console.log(`server running at ${res.url}`)
    })