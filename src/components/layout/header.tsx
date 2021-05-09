import React, { useState } from "react"
import {
  useMediaQuery,
  Button,
  Divider,
  CssBaseline,
  Drawer,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { Link } from "gatsby"
import { DRAWER_WIDTH } from "../../config"
import MyAppBar from "./appBar/myAppBar"
import DrawerButtons from "./drawer/DrawerButtons"
import useIsMounted from "../../utils/useIsMounted"

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

interface Props {
  siteTitle: string
  handleDarkModeSwitch: () => void
  isDarkMode: boolean
}

const Header: React.FC<Props> = ({
  siteTitle,
  handleDarkModeSwitch,
  isDarkMode,
}) => {
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = useState(false)
  const isMounted = useIsMounted()

  const isScreenBig = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  )

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  return (
    <header className={classes.root}>
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
          !isMounted ? "temporary" : isScreenBig ? "permanent" : "temporary"
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
            MY-SITE
          </Button>
        </div>
        <Divider />
        <DrawerButtons handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </header>
  )
}

export default Header
