// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'

// User routes
/*exporting a nameless/anonymous object, 
  identified by other files as userRoutes
*/
export default {
  login: {
    path: '/user/login',
    component: Login
  },

  signup: {
    path: '/user/signup',
    component: Signup
  },
  /*profile.path route will be used to show profile
   in both edit and published views
  */
  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }

  //add property for history, looks like this:
  /*
    history: {
      path: '/user/history',
      component: History
      auth: true
    }
  */
}
