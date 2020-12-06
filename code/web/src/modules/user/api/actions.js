// Imports
//axios seems to be a way to make network requests, similar to fetch
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  /*
    Question: I did some research on axios and couldn't find much
    documentation on the defaults object.. I'm interpreting this
    as ['Authorization'] is being typed with brackets to make this
    executable code dynamic, and that there are other key names within
    the common object that can be accessed here.  Assuming that
    `Bearer ${token}` is the value of .common.Authorization and allows
    the user to be identified by a mixture of special characters...
    I am wondering how this axios object works and where it comes from.
    if a token exists (not undefined or false) => authorize the login
    if token is false => delete authorization 
    
  */
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  /*in the end, return the action object with type SET_USER 
  and user key with value of user argument (ES6)
  */
  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    //removes user object from local storage and removes auth from cookie
    logoutUnsetUserLocalStorageAndCookie()
    //sends the action object via dispatch to the reducer => sets up store so there are no user details
    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}

/* the team is considering adding two more action creators:
  UPDATE_PROFILE => when user clicks Save in edit view for profile, send new info 
  UPDATE_AVAILABILITY => when user clicks Update Availability after selecting at least one date
*/
