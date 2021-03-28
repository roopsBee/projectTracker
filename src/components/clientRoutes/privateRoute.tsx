import React, { useContext } from "react"
import { WindowLocation } from "@reach/router"
import { RouteComponentProps } from "@reach/router"
import { useAppSelector } from "../../redux/reduxHooks"

interface Props extends RouteComponentProps {
  component: React.FC
  location?: WindowLocation
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  location,
  ...rest
}) => {
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
  return isLoggedIn ? <Component {...rest} /> : <>You are not logged in</>
}
export default PrivateRoute
