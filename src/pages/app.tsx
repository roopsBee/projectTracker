import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/clientRoutes/privateRoute"
import projectPage from "../components/clientRoutes/projectPage"
import useIsMounted from "../utils/useIsMounted"

const App = () => {
  const isMounted = useIsMounted()

  if (!isMounted) {
    return null
  }

  return (
    <Router>
      <PrivateRoute path="/app/project/:projectId" component={projectPage} />
    </Router>
  )
}

export default App
