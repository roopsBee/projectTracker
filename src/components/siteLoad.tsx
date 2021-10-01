import React, { useEffect } from "react"
import { useAppDispatch } from "../redux/reduxHooks"
import checkIsAuthenticated from "../redux/userSlice/checkIsAuthenticatedThunk"

const SiteLoad: React.FC = ({ children }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkIsAuthenticated())
  }, [])

  return <>{children}</>
}

export default SiteLoad
