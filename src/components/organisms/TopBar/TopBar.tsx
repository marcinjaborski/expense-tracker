import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function TopBar() {
  const { t } = useTranslation("TopBar");
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{t("title.dashboard")}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
