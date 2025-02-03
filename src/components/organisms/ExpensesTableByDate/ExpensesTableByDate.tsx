import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Fragment } from "react";
import { useAppSelector } from "@src/store/store.ts";
import { groupBy } from "lodash";
import { ExpenseReturnType } from "@src/repository/useExpenses.ts";
import ExpenseRow from "@src/components/molecules/ExpenseRow";

type ExpenseTableByDateProps = {
  expenses: ExpenseReturnType[];
};

function ExpensesTableByDate({ expenses }: ExpenseTableByDateProps) {
  const { dir } = useAppSelector((state) => state.expenseFilter);

  const expensesByDate = groupBy(expenses, "date");

  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) =>
    dir === "desc" ? date2.localeCompare(date1) : date1.localeCompare(date2),
  );

  return (
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
                <ExpenseRow key={expense.id} expense={expense} />
              ))}
            </TableBody>
          </Fragment>
        ))}
      </Table>
    </TableContainer>
  );
}

export default ExpensesTableByDate;
