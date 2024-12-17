import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { mainTheme } from "./utils/theme.ts";
import TopBar from "@src/components/organisms/TopBar";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/organisms/Navigation";
import routes from "./utils/routes";
import CreateExpense from "@src/components/pages/CreateExpense";
import Login from "@src/components/pages/Login";
import Register from "@src/components/pages/Register";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.dashboard} element={<></>} />
            <Route path={routes.createExpense} element={<CreateExpense />} />
            <Route path={routes.expenses} element={<></>} />
            <Route path={routes.more} element={<></>} />
          </Routes>
        </Box>
        <Navigation />
      </Box>
    </ThemeProvider>
  );
}

export default App;
