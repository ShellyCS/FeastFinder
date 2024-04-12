import AllRoutes from "./routes/routes";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./theme/light";
import darkTheme from "./theme/dark";
import { SnackbarProvider } from "notistack";

import "./App.css";

const App = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const theme = currentTheme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <div className="App">
          <AllRoutes />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
