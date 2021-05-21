import React, { useMemo, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  makeStyles,
  ThemeProvider,
  Box,
  CssBaseline,
  useMediaQuery,
} from "@material-ui/core"
import { Toolbar } from "@material-ui/core"
import Header from "./header"
import Footer from "./footer"
import theme from "./theme"
import "./layout.css"

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    width: "100%",
  },
})

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [isDarkMode, setDarkMode] = React.useState(false)
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme:dark)")

  // check for local isDark value
  useEffect(() => {
    const storedTheme = localStorage.getItem("isDark")
    if (storedTheme !== null) {
      setDarkMode(storedTheme === "true" ? true : false)
    } else if (prefersDarkTheme) {
      setDarkMode(true)
    }
  }, [prefersDarkTheme])

  const myTheme = useMemo(() => theme(isDarkMode), [isDarkMode])

  const handleDarkModeSwitch = () => {
    setDarkMode(!isDarkMode)
    localStorage.setItem("isDark", JSON.stringify(!isDarkMode))
  }

  return (
    <Box display="flex" minHeight="100vh">
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Header
          siteTitle={data.site.siteMetadata.title}
          handleDarkModeSwitch={handleDarkModeSwitch}
          isDarkMode={isDarkMode}
        />
        <main className={classes.content}>
          <Toolbar />
          {children}
          <Footer />
        </main>
      </ThemeProvider>
    </Box>
  )
}

export default Layout
