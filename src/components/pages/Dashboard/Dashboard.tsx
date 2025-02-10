import DashboardValues from "@src/components/templates/DashboardValues";
import ExpenseTypeLineChart from "@src/components/organisms/ExpenseTypeLineChart";
import TotalMoneyOverTimeChart from "@src/components/organisms/TotalMoneyOverTimeChart";
import CategoriesPieChart from "@src/components/organisms/CategoriesPieChart";
import { DashboardContext } from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import TotalMoneyPerAccountPieChart from "@src/components/organisms/TotalMoneyPerAccountPieChart";
import CategoriesLineChart from "@src/components/organisms/CategoriesLineChart";
import { Divider, Stack, Switch, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MONTH_FIELD_FORMAT } from "@src/utils/constants.ts";

function Dashboard() {
  const { t } = useTranslation("Dashboard");
  const [startDate, setStartDate] = useState(DateTime.now().minus({ month: 5 }).toFormat(MONTH_FIELD_FORMAT));
  const [endDate, setEndDate] = useState(DateTime.now().toFormat(MONTH_FIELD_FORMAT));
  const [planned, setPlanned] = useState(true);

  const contextValue = useMemo(
    () => ({
      startDate: DateTime.fromFormat(startDate, MONTH_FIELD_FORMAT),
      endDate: DateTime.fromFormat(endDate, MONTH_FIELD_FORMAT).endOf("month"),
      planned,
    }),
    [startDate, endDate, planned],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      <Stack gap={1} divider={<Divider />}>
        <Stack direction="row" sx={{ m: 2, gap: 1, mb: 1 }}>
          <TextField
            type="month"
            label={t("from")}
            fullWidth
            sx={{ colorScheme: "dark" }}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: {
                max: DateTime.now().toFormat(MONTH_FIELD_FORMAT),
              },
            }}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <TextField
            type="month"
            label={t("to")}
            fullWidth
            sx={{ colorScheme: "dark" }}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: {
                max: DateTime.now().toFormat(MONTH_FIELD_FORMAT),
              },
            }}
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </Stack>
        {DateTime.fromFormat(endDate, MONTH_FIELD_FORMAT).hasSame(DateTime.now(), "month") ? (
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
            <Typography>{t("real")}</Typography>
            <Switch checked={planned} onChange={(_, checked) => setPlanned(checked)} />
            <Typography>{t("planned")}</Typography>
          </Stack>
        ) : null}
        <DashboardValues />
        <ExpenseTypeLineChart />
        <TotalMoneyOverTimeChart />
        <CategoriesLineChart type="expense" />
        <CategoriesPieChart type="expense" />
        <TotalMoneyPerAccountPieChart />
      </Stack>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
