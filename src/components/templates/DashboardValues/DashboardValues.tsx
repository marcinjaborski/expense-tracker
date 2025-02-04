import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useMonthExpenses from "@src/utils/hooks/useMonthExpenses.ts";
import Amount from "@src/components/atoms/Amount";
import useTotalMoney from "@src/utils/hooks/useTotalMoney.ts";
import useAverageExpenses from "@src/utils/hooks/useAverageExpenses.ts";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";

function DashboardValues() {
  const { t } = useTranslation("Dashboard");
  const { endDate } = useDashboardContext();
  const { monthExpenses, monthIncomes } = useMonthExpenses();
  const averageExpenses = useAverageExpenses();
  const totalMoney = useTotalMoney(endDate);

  const values = [
    {
      label: t("currentExpenses"),
      number: -monthExpenses,
    },
    {
      label: t("averageExpenses"),
      number: -averageExpenses,
    },
    {
      label: t("totalMoney"),
      number: totalMoney,
    },
    {
      label: t("currentNetProfit"),
      number: monthIncomes - monthExpenses,
    },
  ];

  return (
    <Box sx={{ m: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {values.map(({ label, number }) => (
        <Card key={label} elevation={2} sx={{ display: "grid", placeItems: "center" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {label}
            </Typography>
            {isNaN(number) ? <CircularProgress size={16} /> : <Amount number={number} useNumberSignToColor />}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default DashboardValues;
