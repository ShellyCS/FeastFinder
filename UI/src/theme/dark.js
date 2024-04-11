import { createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffc107",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default darkTheme;
