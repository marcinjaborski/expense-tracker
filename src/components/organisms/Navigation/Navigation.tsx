import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../../utils/routes";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === routes.login || pathname === routes.register) return null;

  return (
    <BottomNavigation value={pathname} onChange={(_, route) => navigate(route)}>
      <BottomNavigationAction icon={<DashboardIcon />} value={routes.dashboard} />
      <BottomNavigationAction icon={<AddIcon />} value={routes.createExpense} />
      <BottomNavigationAction icon={<ListIcon />} value={routes.expenses} />
      <BottomNavigationAction icon={<MoreHorizIcon />} value={routes.more} />
    </BottomNavigation>
  );
}

export default Navigation;
