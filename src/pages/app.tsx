import React from "react"
import { Router } from "@reach/router"
import Route from "../components/clientRoutes/Route"
import PrivateRoute from "../components/clientRoutes/PrivateRoute"
import projectPage from "../components/clientRoutes/projectPage"

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/app/project/:projectId" component={projectPage} />
    </Router>
  )
}

export default App
