import React, { useEffect } from "react"
import { useAppDispatch } from "../redux/reduxHooks"
import siteLoadAuthThunk from "../redux/userSlice/siteLoadAuthThunk"

const SiteLoad: React.FC = ({ children }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(siteLoadAuthThunk())
  }, [])

  return <>{children}</>
}

export default SiteLoad
