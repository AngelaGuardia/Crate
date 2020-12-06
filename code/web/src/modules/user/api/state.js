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
export default (state = userInitialState, action) => {
  switch (action.type) {
    /*for case SET_USER, must add new properties that feature depends on.
      for instance, after details: actions.user, the next line should have
      history with the product history retrieved from the API
      perhaps we should add history, description, shippingAddress, etc
      to details key so that these details exist where email already does 
    */  
    case SET_USER:
      return {
        //spread operator to return whatever currently exists in state
        ...state,
        /*line  below will set the value for isAuthenticated
          - to true if isEmpty() from helpers.js returns false, 
          given the user object from action creater
          - to false if isEmpty() returns true
        */
        isAuthenticated: !isEmpty(action.user),
        //details key is assigned a value of the user property in the action object
        //comes from the action creator of setUser()
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

    /*For case LOGOUT, new properties such as 
      availability, history, description, shippingAddress, and image
      will need to be set to null or empty arrays depending on the data type
    */
    case LOGOUT:
      //this case will reset the user state with this updated properties
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }
    //default case will return state as it exists without any modifications
    //this is set up to avoid returning undefined upon initial load and
    //to return state when action.type is not specified
    default:
      return state
  }
}