import { createMuiTheme } from "@material-ui/core/styles"

// create theme with our standard tab overrides
const MuiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#a3bae9",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
  },
})

export default MuiTheme
