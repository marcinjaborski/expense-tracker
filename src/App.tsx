import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { mainTheme } from "./utils/theme.ts";
import TopBar from "@src/components/organisms/TopBar";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/organisms/Navigation";
import routes from "./utils/routes";
import CreateExpense from "@src/components/pages/CreateExpense";
import Login from "@src/components/pages/Login";
import Register from "@src/components/pages/Register";
import ExpenseList from "@src/components/pages/ExpenseList";
import More from "@src/components/pages/More";
import Accounts from "@src/components/pages/Accounts";
import Categories from "@src/components/pages/Categories";
import Debts from "@src/components/pages/Debts";
import Export from "@src/components/pages/Export";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.dashboard} element={<></>} />
            <Route path={`${routes.createExpense}/:id?`} element={<CreateExpense />} />
            <Route path={routes.expenses} element={<ExpenseList />} />
            <Route path={routes.more} element={<More />} />
            <Route path={routes.accounts} element={<Accounts />} />
            <Route path={routes.categories} element={<Categories />} />
            <Route path={routes.debts} element={<Debts />} />
            <Route path={routes.export} element={<Export />} />
          </Routes>
        </Box>
        <Navigation />
      </Box>
    </ThemeProvider>
  );
}

export default App;
