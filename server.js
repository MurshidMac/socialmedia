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
    const port = process.env.PORT || 5000;
    return server.listen({ port: port })
}).then((res) => {
    console.log(`Server running at ${res.url}`);
})




