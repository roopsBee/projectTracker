import "firebase/auth"
import React from "react"
import { Provider } from "react-redux"
import store from "./src/redux/store"
import SiteLoad from "./src/components/siteLoad"
import { SnackbarProvider } from "notistack"

export const wrapRootElement = ({ element }) => {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <SiteLoad>{element}</SiteLoad>
      </Provider>
    </SnackbarProvider>
  )
}
