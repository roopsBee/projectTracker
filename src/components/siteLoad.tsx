import React, { useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { useAppDispatch } from "../redux/reduxHooks"
import { siteLoadAuth } from "../redux/userSlice"

const SiteLoad: React.FC = ({ children }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(siteLoadAuth())
  }, [])

  return <>{children}</>
}

export default SiteLoad
