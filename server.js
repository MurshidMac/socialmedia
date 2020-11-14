const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MDB } = require('./config.js')


const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongo db server connected')
    return server.listen({ port: 5000 })
}).then((res) => {
    console.log(`Server running at ${res.url}`);
})




