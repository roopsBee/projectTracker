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
import { DRAWER_WIDTH } from "../../../config"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import AppBarLoginOutButton from "./appBarLoginOutButton"
import AppBarSignUpButton from "./appBarSignUpButton"
import AppBarLogOutButton from "./appBarLogOutButton"
import { useAppSelector } from "../../../redux/reduxHooks"

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
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

  return (
    <AppBar position="fixed" elevation={0}>
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
        {!isLoggedIn && (
          <>
            <AppBarLoginOutButton />
            <AppBarSignUpButton />
          </>
        )}
        {isLoggedIn && <AppBarLogOutButton />}
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar
