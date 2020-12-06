//Files of code that will need updates:
  // Most exist within code/web/src/modules/user
  // 1. ./api/actions.js - DONE
  // 2. ./api/state.js  - DONE
  // 3. Profile.js  - DONE
  // 4. store.js from ../setup/store.js  - DONE
  // 5. user.js from ../setup/routes/user.js  - DONE

  //Upcoming Tasks:
    //put these files into directories so that tests can be grouped with implementation file
    //create a History.js file for new functional component to display data from backend
    //create a ProfileForm.js file for component to be rendered in edit mode

// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
//Profile is currently a functional component - we should keep it this way
const Profile = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    {/* Wondering why there is inline CSS here, 
    are we meant to refactor this or run with it as we make updates to this file?*/}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        {/* The following two lines render the name and email from user.details */}
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>
        {/* Here is where we would want to render a new component for the edit view
         it could potentially be called < ProfileForm /> and will need to include
         an input with type of date so user can select availability*/}
        {/* The following link allows the user to view their subscriptions
            by accessing the userRoutes object from imports */}
        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>
        {/* props.logout originates from the actions.js file, 
          where user object is removed from local storage and 
          action.type === LOGOUT, triggering case LOGOUT in state.js,
          which resets the user object to have details === null */}
        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
/*
profileState() is acting as mapStateToProps to allow this component 
access to the user object from the global store.
user is referenced throughout this component.
*/
function profileState(state) {
  return {
    user: state.user
  }
}

/*
connect() links a React component (Profile) to the Redux store
profileState acts as mapStateToProps and allows the Profile component to read state.user
{ logout } acts as mapDispatchToProps, which allows the users reducer to return state
based on the changes specified in state.js
*/
export default connect(profileState, { logout })(Profile)
