// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
// This becomes the user object...?
// If so, this is where we will recieve the user object from back end
// Here, it will have new keys of availability (array), and img, email, address, description (strings)
export default (state = userInitialState, action) => {
  switch (action.type) {
    // do we add history, description, address, and image to details where email already is?
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        // details is set using setUser() from actions
        details: action.user,
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    // will need to set state for new keys (history, description, img)
    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    default:
      return state
  }
}