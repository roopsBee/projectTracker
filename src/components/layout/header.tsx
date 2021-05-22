import React, { useEffect, useState } from "react"
import {
  useMediaQuery,
  Button,
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
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"

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

    borderWidth: "0px 1px 0px 0px",
    borderStyle: "solid",
    borderColor: theme.palette.type === "dark" ? "#01596B" : "#00639F",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    ...theme.mixins.toolbar,
  },
  materialStylesButton: {
    height: "100%",
    backgroundColor: theme.palette.type === "dark" ? "#2F4858" : "#00639F",
    borderRadius: 0,
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? "#0055B4" : "#00639F",
    },
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
  const [inProject, setInProject] = useState(false)
  const isMounted = useIsMounted()
  const projectId = getProjectIdFromUrl()

  useEffect(() => {
    if (projectId) {
      setInProject(true)
    } else {
      setInProject(false)
    }
  }, [projectId])

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
      {inProject && (
        <Drawer
          ModalProps={{ keepMounted: true }}
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
              PROJECT-TRACKER
            </Button>
          </div>

          <DrawerButtons handleDrawerClose={handleDrawerClose} />
        </Drawer>
      )}
    </header>
  )
}

export default Header
