import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButtonGroup,
} from "@mui/material";
import ToggleButtonWithIcon from "@src/components/molecules/ToggleButtonWithIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CategoryIcon from "@mui/icons-material/Category";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTranslation } from "react-i18next";
import { Fragment, useRef, useState } from "react";
import { ExpenseOption } from "@src/utils/types.ts";
import useExpenses from "@src/repository/useExpenses.ts";
import { groupBy } from "lodash";
import Amount from "@src/components/atoms/Amount";
import useObserver from "@src/utils/hooks/useObserver.ts";

function ExpenseList() {
  const { t } = useTranslation("ExpenseList");
  const [type, setType] = useState<ExpenseOption>("expense");
  const dir = "desc";
  const { data: expenses, fetchNextPage } = useExpenses({ type, sort: "date", dir });
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const expensesByDate = groupBy(expenses, "date");
  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) =>
    dir === "desc" ? date2.localeCompare(date1) : date1.localeCompare(date2),
  );

  return (
    <Stack sx={{ height: "100%", p: 3 }}>
      <ToggleButtonGroup exclusive value={type} onChange={(_, newValue) => setType(newValue)}>
        <ToggleButtonWithIcon text={t("all")} icon={<CategoryIcon />} value="all" />
        <ToggleButtonWithIcon text={t("incomes")} icon={<AddIcon />} value="income" />
        <ToggleButtonWithIcon text={t("expenses")} icon={<RemoveIcon />} value="expense" />
        <ToggleButtonWithIcon text={t("transfers")} icon={<SwapHorizIcon />} value="transfer" />
      </ToggleButtonGroup>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Table stickyHeader size="small">
          {sortedDates.map((date) => (
            <Fragment key={date}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}>{date}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expensesByDate[date].map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>
                      <Amount
                        number={expense.amount}
                        red={expense.type === "expense"}
                        green={expense.type === "income"}
                      />
                    </TableCell>
                    <TableCell>{expense.category.name}</TableCell>
                    <TableCell>{expense.account.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Fragment>
          ))}
          <TableBody>
            <TableRow>
              <TableCell>
                <div ref={observerTarget} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default ExpenseList;
