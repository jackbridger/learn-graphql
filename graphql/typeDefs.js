const gql = require('graphql-tag');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts:[Post]
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`