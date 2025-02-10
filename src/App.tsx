import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { mainTheme } from "./utils/theme.ts";
import TopBar from "@src/components/organisms/TopBar";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Feedback from "@src/components/atoms/Feedback";
import Import from "@src/components/pages/Import";
import Dashboard from "@src/components/pages/Dashboard";
import useUser from "@src/repository/useUser.ts";
import { useEffect } from "react";
import { useAppDispatch } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";
import { useTranslation } from "react-i18next";
import PlannedExpenses from "@src/components/pages/PlannedExpenses";

function App() {
  const { t } = useTranslation("Login");
  const { isError } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      navigate(routes.login);
      dispatch(showFeedback({ message: t("pleaseLogIn"), type: "error" }));
    }
  }, [navigate, isError, dispatch, t]);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.createExpense} element={<CreateExpense planned={false} />} />
            <Route path={routes.createPlannedExpense} element={<CreateExpense planned />} />
            <Route path={routes.expenses} element={<ExpenseList />} />
            <Route path={routes.more} element={<More />} />
            <Route path={routes.accounts} element={<Accounts />} />
            <Route path={routes.categories} element={<Categories />} />
            <Route path={routes.plannedExpenses} element={<PlannedExpenses />} />
            <Route path={routes.debts} element={<Debts />} />
            <Route path={routes.import} element={<Import />} />
            <Route path={routes.export} element={<Export />} />
          </Routes>
        </Box>
        <Navigation />
        <Feedback />
      </Box>
    </ThemeProvider>
  );
}

export default App;
