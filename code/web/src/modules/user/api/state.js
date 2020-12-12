// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT, CHANGE_EDIT_MODE, SAVE_PROFILE, GET_PRODUCTS_HISTORY } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: {
    img: '',
    description: '',
    address: '',
    email: ''
  },
  isEditMode: true
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
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

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }
    
    case CHANGE_EDIT_MODE:
      return {
        ...state,
        error: null,
        isLoading: false,
        isEditMode: !action.user.isEditMode
      }

    case SAVE_PROFILE:
      return {
        ...state,
        error: null,
        isLoading: false,
        details: {
          ...state.details,
          email: action.email,
          img: action.img,
          description: action.description,
          address: action.address
        }
      }

    case GET_PRODUCTS_HISTORY:
      return {
        ...state,
        deliveries: action.deliveries.data.data.deliveries,
        products: action.products.data.data.products
      }

    default:
      return state
  }
}
