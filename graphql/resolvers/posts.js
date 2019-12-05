const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth');
const { AuthenticationError } = require('apollo-server');
module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = Post.findById(postId)
                if (post) {
                    return post;
                }
                else {
                    throw new Error("post not found!")
                }
            }
            catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            const newPost = new Post({
                username: user.username,
                user: user.id,
                body,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save();
            context.pubsub.publish('NEW_POST', {
                newPost: post
            })
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'post deleted successfully'
                }
                else {
                    throw new AuthenticationError('Action not allowed')
                }
            }
            catch (err) {
                throw new Error(err)
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}
