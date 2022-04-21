import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#00acc1",
      light: "#5ddef4",
      dark: "#007c91",
    },
  },
});

export default theme;
