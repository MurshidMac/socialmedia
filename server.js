const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MDB } = require('./config.js')

const typeDefs = gql`
    type Query {
        sayHig: String! 
    }
`


const resolvers = {
    Query: {
        sayHig: () => `Hello world${0}`
    }
}

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




