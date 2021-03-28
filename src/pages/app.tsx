import React from "react"
import { Router } from "@reach/router"
import Route from "../components/clientRoutes/Route"
import PrivateRoute from "../components/clientRoutes/PrivateRoute"
import Dashboard from "../components/clientRoutes/dashboard"

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app" component={Dashboard} />
    </Router>
  )
}

export default App
