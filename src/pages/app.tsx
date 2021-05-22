import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/clientRoutes/privateRoute"
import projectPage from "../components/clientRoutes/projectPage"
import useIsMounted from "../utils/useIsMounted"
import ProjectSettingsPage from "../components/clientRoutes/projectSettingsPage"
import appHomePage from "../components/clientRoutes/appHomePage"

const App = () => {
  const isMounted = useIsMounted()

  if (!isMounted) {
    return null
  }

  return (
    <Router>
      <PrivateRoute path="/app" component={appHomePage} />
      <PrivateRoute path="/app/project/:projectId" component={projectPage} />
      <PrivateRoute
        path="/app/project/:projectId/settings"
        component={ProjectSettingsPage}
      />
    </Router>
  )
}

export default App
