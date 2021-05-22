import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

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
          paper: isDarkMode ? "#6C6852" : "#007DBD",
          // default: isDarkMode ? "#221E24" : "#F0F0F2",
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
          },
          root: {
            "& .MuiListItem-root": {
              backgroundColor: isDarkMode ? "#3D4A3D" : "#0088AF",
              "& .MuiListItemIcon-root": {
                color: "white",
              },
              "&:hover": {
                backgroundColor: isDarkMode ? "#6C6F4C" : "#00639F",
              },
            },
          },
        },
        MuiIconButton: {
          root: {
            color: "white",
          },
        },
        MuiSwitch: {
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
              backgroundColor: isDarkMode ? "#2F4858" : "#007DBD",
              "&:hover": {
                backgroundColor: isDarkMode ? "#01596B" : "#00639F",
              },
            },
          },
        },
        MuiPaper: {
          root: {
            "&.MuiPaper-rounded": {
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: isDarkMode ? "#6C6F4C" : "#00639F",
            },
          },
        },
      },
    })
  )
