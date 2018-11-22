require('dotenv').config()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')

const resolvers = {
  Query: {
    // fetch the profile of currently authenticated user
    async me (_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      // user is authenticated
      return await User.findById(user.id)
    }
  },

  Mutation: {
    // Handle user signup
    async signup (_, { email, password }) {
      console.log('process.env.BCRYPT_SALT_ROUNDS: ', process.env.BCRYPT_SALT_ROUNDS)
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10))
      const user = await User.create({
        email,
        password: await bcrypt.hash(password, salt)
      })

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },

    // Handles user login
    async login (_, { email, password }) {
      const user = await User.findOne(email)

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
    }
  }
}

module.exports = resolvers