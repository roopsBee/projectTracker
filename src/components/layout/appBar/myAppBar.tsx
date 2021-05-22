import React, { useEffect, useState } from "react"
import clsx from "clsx"
import MenuIcon from "@material-ui/icons/Menu"
import {
  Switch,
  IconButton,
  Toolbar,
  AppBar,
  makeStyles,
  Typography,
} from "@material-ui/core"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import AppBarLoginOutButton from "./appBarLoginOutButton"
import AppBarSignUpButton from "./appBarSignUpButton"
import { useAppSelector } from "../../../redux/reduxHooks"
import useIsMounted from "../../../utils/useIsMounted"
import getProjectIdFromUrl from "../../../utils/getProjectIdFromUrl"
import { DRAWER_WIDTH } from "../../../config"

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  darkSwitch: { marginLeft: "auto" },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
}))

interface Props {
  drawerOpen: boolean
  handleDrawerOpen: () => void
  siteTitle: string
  handleDarkModeSwitch: () => void
  isDarkMode: boolean
}

const MyAppBar: React.FC<Props> = ({
  drawerOpen,
  handleDrawerOpen,
  handleDarkModeSwitch,
  isDarkMode,
}) => {
  const [projectName, setProjectName] = useState<string | undefined>("")
  const classes = useStyles()
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
  const projects = useAppSelector(state => state.projectState.projects)
  const isMounted = useIsMounted()
  const projectId = getProjectIdFromUrl()

  useEffect(() => {
    if (projectId) {
      const project = projects?.find(project => project.projectId === projectId)
      setProjectName(project?.projectName)
    } else {
      setProjectName("")
    }
  }, [projectId])

  return (
    <AppBar className={classes.appBar} position="fixed" elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, drawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography>{projectName}</Typography>
        <Switch
          color="default"
          className={classes.darkSwitch}
          checked={isDarkMode}
          onChange={handleDarkModeSwitch}
          name="dark mode"
          inputProps={{ "aria-label": "dark mode switch" }}
        />
        {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        <AppBarLoginOutButton />
        {isMounted && !isLoggedIn && <AppBarSignUpButton />}
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar
