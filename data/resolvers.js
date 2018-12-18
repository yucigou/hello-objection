require('dotenv').config()
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')
const { auth } = require('./helper')
const io = require('../server/socket')

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
    },

    sayHello (_, args, ctx) {
      io.getIO().emit('EMS80000', { from: 'Yuci', to: 'David', message: 'Review please.' })
      return 'Hello!'
    }
  },

  Mutation: {
    // Handle user signup
    async signup (_, { username, email, password }) {
      let savedUser
      if (!username || !email || !password) {
        return 'username, email or password must not be empty'
      }

      try {
        const user = new User()
        await user.addIdentity(username, email, password)
        savedUser = await user.save()
      } catch (error) {
        console.log('Forwarding error')
        return error
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: savedUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },

    // Handles user login
    async login (_, { username, password }) {
      let userId
      try {
        userId = await User.validateUser(username, password)
      } catch (error) {
        throw error
      }

      console.log('user ID: ', userId)

      // return json web token
      return jsonwebtoken.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
    },

    // Handles user login with Passport
    async signin (_, { username, password }, ctx) {
      const body = { username, password }
      ctx.req.body = body
      const user = await auth(ctx.req, ctx.res)
      console.log('Passport signed in user: ', user)
      return jsonwebtoken.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
        )
    }
  }
}

module.exports = resolvers