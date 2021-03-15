import React from "react"

// @ts-ignore
import clsx from "clsx"
import MenuIcon from "@material-ui/icons/Menu"
import {
  Switch,
  IconButton,
  Toolbar,
  AppBar,
  makeStyles,
} from "@material-ui/core"
import { DRAWER_WIDTH } from "../../config"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(to right,  #663399, #5B72FF)",
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${DRAWER_WIDTH}px)`,
    //   marginLeft: DRAWER_WIDTH,
    // },
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
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
  siteTitle,
  handleDarkModeSwitch,
  isDarkMode,
}) => {
  const classes = useStyles()

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
    >
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
        {/* <Typography className={classes.title} variant="h6" color="inherit">
          {siteTitle}
        </Typography> */}
        <Switch
          className={classes.darkSwitch}
          checked={isDarkMode}
          onChange={handleDarkModeSwitch}
          name="dark mode"
          inputProps={{ "aria-label": "dark mode switch" }}
        />
        {isDarkMode ? (
          <Brightness4Icon color="secondary" />
        ) : (
          <Brightness7Icon />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar
