import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fd8a2c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#282c34",
    },
    text: {
      primary: "#000",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default lightTheme;
