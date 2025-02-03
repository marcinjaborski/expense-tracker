import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import ExpenseRow from "@src/components/molecules/ExpenseRow";
import { ExpenseReturnType } from "@src/repository/useExpenses.ts";

type ExpensesTableProps = {
  expenses: ExpenseReturnType[];
};

function ExpensesTable({ expenses }: ExpensesTableProps) {
  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Table size="small">
        <TableBody>
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpensesTable;
