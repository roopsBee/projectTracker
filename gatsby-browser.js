import "firebase/auth"
import React from "react"
import { Provider } from "react-redux"
import store from "./src/redux/store"
import SiteLoad from "./src/components/siteLoad"

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <SiteLoad>{element}</SiteLoad>
    </Provider>
  )
}
