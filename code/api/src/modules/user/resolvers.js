// NOTE: 7.2 This is where user resolvers are defined
// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params' // QUESTION: ??? Not sure what this does
import models from '../../setup/models'

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } }) // QUESTION: how does findOne work

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

export async function login(parentValue, { email, password }) { // QUESTION: This should also take the ROLE argument as per the login query
  const user = await models.User.findOne({ where: { email } }) // NOTE: finds the user by email

  if (!user) { // NOTE: error handling if user is not found
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get() // QUESTION: ??? what does this do?

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)
    // NOTE: Checks that password is correct
    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`) // NOTE: error handling for incorrect password
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret) // NOTE: creates auth token
      }
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
} // QUESTION: What is async function, what is await
// QUESTION: Is there an example of where this gets called with the parrent value and the arguments?


// Get all
export async function getAll() {
  return await models.User.findAll()
  // NOTE: findAll is a Sequelize method (Sequelize is the ORM we are using, the equivalent of active record.)
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}
// NOTE: removes user from database

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
// QUESTION: Not really sure what this does. It is connected to the params which seems like a static payload of data. Genders seem to not be connected to actual user records. // TODO: connect genders to users?
