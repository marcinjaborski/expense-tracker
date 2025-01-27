import { useTranslation } from "react-i18next";
import routes, { Route } from "@src/utils/routes.ts";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import LogoutIcon from "@mui/icons-material/Logout";
import { ReactNode } from "react";

type ItemData = {
  label: string;
  icon: ReactNode;
  link: Route;
};

function More() {
  const { t } = useTranslation("Other");
  const navigate = useNavigate();

  const items: ItemData[] = [
    {
      label: t("accounts"),
      icon: <AccountBalanceWalletIcon />,
      link: routes.accounts,
    },
    {
      label: t("categories"),
      icon: <FolderCopyIcon />,
      link: routes.categories,
    },
    {
      label: t("debts"),
      icon: <AttachMoneyIcon />,
      link: routes.debts,
    },
    {
      label: t("import"),
      icon: <UploadIcon />,
      link: routes.import,
    },
    {
      label: t("export"),
      icon: <DownloadIcon />,
      link: routes.export,
    },
    {
      label: t("logout"),
      icon: <LogoutIcon />,
      link: routes.dashboard,
    },
  ];

  return (
    <Box>
      <List>
        {items.map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.link)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default More;
