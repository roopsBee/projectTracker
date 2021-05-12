import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

let theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        wordBreak: "break-all",
      },
    },
  },
})
theme = responsiveFontSizes(theme)

export default theme
