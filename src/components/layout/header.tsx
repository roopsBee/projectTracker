import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import { useMediaQuery, Button } from "@material-ui/core"
import { Link } from "gatsby"
import { DRAWER_WIDTH } from "../../config"
import MyAppBar from "./myAppBar"
import DrawerButtons from "./DrawerButtons"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...theme.mixins.toolbar,
  },
  materialStylesButton: {
    height: "100%",
  },
  popoverPaper: {
    "& .MuiPopover-paper": {
      overflowY: "hidden",
    },
  },
}))

const Header = ({ siteTitle, handleDarkModeSwitch, isDarkMode }) => {
  const classes = useStyles()

  const [openContactForm, setOpenContactForm] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    setInitialRender(false)
  }, [])

  const isScreenBig = useMediaQuery(theme => theme.breakpoints.up("md"))

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar
        handleDrawerOpen={handleDrawerOpen}
        drawerOpen={openDrawer}
        siteTitle={siteTitle}
        handleDarkModeSwitch={handleDarkModeSwitch}
        isDarkMode={isDarkMode}
      />
      <Drawer
        className={classes.drawer}
        variant={
          initialRender ? "permanent" : isScreenBig ? "permanent" : "temporary"
        }
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Button
            className={classes.materialStylesButton}
            fullWidth
            component={Link}
            to="/"
          >
            MATERIAL-STYLES
          </Button>
        </div>
        <Divider />
        <DrawerButtons handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </div>
  )
}

export default Header
