const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../../util/validator')

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, {
        expiresIn: '1h'
    });
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('error signing in', { errors })
            }
            const user = await User.findOne({ username })
            if (!user) {
                errors.general = 'user not found'
                throw new UserInputError('user not found', errors)
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = 'wrong credentialsß'
                throw new UserInputError('wrong credentialsß', errors)
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user.id,
                token
            }
        },
        async register(_, { registerInput: {
            username,
            email,
            password,
            confirmPassword
        } }, context, info) {
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

            if (!valid) {
                throw new UserInputError('error', { errors })
            }

            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('username is taken', {
                    errors: {
                        username: 'this username is taken'
                    }
                })
            }
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email, username, password, createdAt: new Date().toISOString()
            })

            const res = await newUser.save();
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res.id,
                token
            }
            // todo: validate user data,
            // todo: make sure user dosnt already exist
            // hash password and create auth token
        }
    }
}