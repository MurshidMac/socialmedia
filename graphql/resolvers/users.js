const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');


function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
}


module.exports = {
    Mutation: {
        async login(_, { email, password}){
            const { errors, valid } = validateLoginInput(email, password);

            if(!valid){
                throw new UserInputError('Username or Email is not valid',{ errors });
            }

            const user = await User.findOne({email});
            if(!user){
                errors.general = 'Email not found';
                throw new UserInputError('Username or Email does not exist',{ errors });
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials',{ errors });    
            }

            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_,
            { 
                registerInput: { username, email, password, confirmpassword
            }
        }, context, info) {
            // Validate user data || Server validation
            const { valid, errors } = validateRegisterInput(username, email, password, confirmpassword)
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            // TODO MAKE sure user doesn't already exists
            const user = await User.findOne({ email });

            if (user) {
                throw new UserInputError('Email is already registered', {
                    errors: {
                        email: 'This email is already registered'
                    }
                })
            }

            // hash the password and create an auth token
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save()
            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}