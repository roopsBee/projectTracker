// main color #2A953D https://mycolor.space/?hex=%232A953D&sub=1

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import lightAppBarBackground from "../../images/lightAppBarBackground.svg"
import darkAppBarBackground from "../../images/darkAppBarBackground.svg"

const darkModeTransition = "background-color 0.3s ease"

export default (isDarkMode: boolean) =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: {
          main: "#2A953D",
        },
        secondary: {
          main: "#1A6EB9",
        },
        background: {
          paper: isDarkMode ? "#2F4858" : "#007DBD",
          default: isDarkMode ? "#221E24" : "#0088AF",
        },
        text: { primary: "#F3EDF2", secondary: "#c8c6c7" },
        type: isDarkMode ? "dark" : "light",
      },
      overrides: {
        MuiTypography: {
          root: {
            wordBreak: "break-word",
          },
        },
        MuiInputLabel: {
          root: {
            color: "#F3EDF2",
            "&$focused": {
              color: "black",
            },
          },
        },
        MuiInput: {
          underline: {
            "&:after": {
              borderBottom: "2px black solid",
            },
          },
        },
        MuiDrawer: {
          paper: {
            backgroundColor: isDarkMode ? "#2F4858" : "#00639F",
            transition: darkModeTransition,
          },
          // root: {
          //   "& .MuiListItem-root": {
          //     "& .MuiListItemIcon-root": {
          //       color: "white",
          //     },
          //   },
          // },
        },
        MuiIconButton: {
          root: {
            color: "white",
            padding: "8px",
          },
        },
        MuiSwitch: {
          root: {},
          switchBase: {
            color: "white",
            // "&.Mui-checked": {
            //   color: "red",
            // },
          },
        },
        MuiListItem: {
          root: {
            "&.MuiListItem-button": {
              transition: darkModeTransition,

              backgroundColor: isDarkMode ? "#2F4858" : "#007DBD",
              "&:hover": {
                backgroundColor: isDarkMode ? "#01596B" : "#00639F",
              },
            },
            "& .MuiListItemIcon-root": {
              color: "white",
            },
          },
        },
        MuiListItemIcon: {
          root: {
            minWidth: "40px",
          },
        },
        MuiPaper: {
          root: {
            transition: darkModeTransition,
            "&.MuiPaper-rounded": {
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: isDarkMode ? "#01596B" : "#00639F",
            },
            "&.MuiAppBar-colorPrimary": {
              backgroundColor: isDarkMode ? "#005600" : "#2A953D",
              borderWidth: "0px 0px 2px 0px",
              borderStyle: "solid",
              borderColor: isDarkMode ? "#01596B" : "#00639F",
              backgroundImage: isDarkMode
                ? `url(${darkAppBarBackground})`
                : `url(${lightAppBarBackground})`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              transition: "background-image 0.3s ease",
            },
          },
        },
      },
    })
  )
