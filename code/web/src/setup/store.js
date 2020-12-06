// Imports
import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
//what does thunk do?
/*according to documentation
  redux-thunk is middleware that 
  allows the dev to call action creators
  that return a function instad of an action object
  - wondering where this is being used in the file
*/
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// App Imports
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// App Reducer
/*
 using the combineReducers() method with 
 an implicit return of an object
*/
const appReducer = combineReducers({
  //each of these below are pieces of state that make up the store
  //our focus will be on user
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
export const rootReducer = (state, action) => {
  //if user wishes to reset the app, state will be undefined
  //not sure exactly where an action object with type of RESET exists
  if (action.type === 'RESET') {
    state = undefined
  }
  /*
  in the end, return appReducer from line 19
  appReducer seems to be a variable with a function definition
  since appReducer evaluates to a function, is that why it can
  be written as a function invocation directly on line 40?
  */
 return appReducer(state, action)
}

// Load initial state from server side
let initialState
/*
  if window has a value,
  assign initialState to _INITIAL_STATE_ property on window object
  after assignment, delete what is now the value of initialState
  - assuming the deletion allows the value of initialState to persist 
*/
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  /*
    createStore creates the global Redux store that holds all state of the app
    first argument is rootReducer => ultimately returns the store
    second argument is initialState, which is 
    an object used to set the state prior to user interactions
  */
  rootReducer,
  initialState,
  //composeWithDevTools() allows dev to see Redux data flow / store in Chrome browser
  composeWithDevTools(
    applyMiddleware(thunk),
  )
)