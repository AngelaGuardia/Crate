// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import Layout from '../../modules/common/Layout'
import NotFound from '../../modules/common/NotFound'
import RoutePrivate from '../../modules/auth/RoutePrivate'


/* 
 Imports all routes from the routes folder
 each route is an object containing
 {
 auth: boolean to determine if needs to be logged in to access,
 path: utilized by the switch to determine if that is the correct path (is either function or string),
 role: this may or may not exist, is either ADMIN or non-existant from what I have seen
 }
  */

/*
 routes === {
 dashboard: {auth:true, path:/admin/dashboard, component:Dashboard, role:ADMIN},
 profile: {auth: true, path: /user/profile component:Profile}
 }
*/

console.log(routes)
const App = () => (
  <Layout>
    <Switch>
      {Object.values(routes).map((route, index) => (
        route.auth // If route.auth is true, render the private component, else render the regular route component   
          ? <RoutePrivate {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
          : <Route {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
      ))}

      <Route component={NotFound}/>
    </Switch>
  </Layout>
)

export default App
