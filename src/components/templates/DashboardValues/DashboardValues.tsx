import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useMonthExpenses from "@src/utils/hooks/useMonthExpenses.ts";
import Amount from "@src/components/atoms/Amount";
import useTotalMoney from "@src/utils/hooks/useTotalMoney.ts";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { useMemo } from "react";
import { MONTHLY_LIMIT } from "@src/utils/constants.ts";
import { DateTime } from "luxon";

function DashboardValues() {
  const { t } = useTranslation("Dashboard");
  const { endDate, planned } = useDashboardContext();
  const { monthExpenses, monthIncomes } = useMonthExpenses();
  const totalMoney = useTotalMoney(endDate, planned);

  const monthPercentagePassed = useMemo(() => {
    const now = DateTime.local();
    const totalDays = now.daysInMonth;

    const startOfMonth = now.startOf("month");
    const hoursPassed = now.diff(startOfMonth, "hours").hours;
    const totalHours = totalDays * 24;

    return Math.round((hoursPassed / totalHours) * 100);
  }, []);

  const monthlyLimitSpent = Math.round((monthExpenses / MONTHLY_LIMIT) * 100);

  const values = [
    {
      label: t("currentExpenses"),
      number: -monthExpenses,
    },
    {
      label: t("percentage"),
      text: (
        <Typography
          sx={{ color: monthlyLimitSpent > monthPercentagePassed ? "error.main" : "success.main" }}
        >{`${monthlyLimitSpent}% / ${monthPercentagePassed}%`}</Typography>
      ),
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
      {values.map(({ label, number, text }) => (
        <Card key={label} elevation={2} sx={{ display: "grid", placeItems: "center" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {label}
            </Typography>
            {text ?? (isNaN(number) ? <CircularProgress size={16} /> : <Amount number={number} useNumberSignToColor />)}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default DashboardValues;
