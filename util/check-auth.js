const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // bearer... 
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            }
            catch (err) {
                throw new AuthenticationError('invalid/expired token');
            }
        }
        throw new Error('authentication token must be \'Bearer [token]')
    }
    throw new Error('Authorization header must be provided')
}