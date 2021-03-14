import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  footer: {
    marginTop: 'auto',
  },
})

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      © {new Date().getFullYear()} Material-Styles
    </footer>
  )
}

export default Footer
