import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  footer: {
    marginTop: "auto",
  },
})

const Footer = () => {
  const classes = useStyles()
  return <footer className={classes.footer}></footer>
}

export default Footer
