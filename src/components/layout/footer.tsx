import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  footer: {
    marginTop: "auto",
  },
})

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      © {new Date().getFullYear()} My site
    </footer>
  )
}

export default Footer
