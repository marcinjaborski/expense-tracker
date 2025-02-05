import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import ExpenseRow from "@src/components/molecules/ExpenseRow";
import useExpenses, { ExpenseReturnType } from "@src/repository/useExpenses.ts";
import useTableFetchNext from "@src/utils/hooks/useTableFetchNext.ts";

type ExpensesTableProps = {
  expenses: ExpenseReturnType[];
  fetchNextPage: ReturnType<typeof useExpenses>["fetchNextPage"];
  isLoading: boolean;
};

function ExpensesTable({ expenses, fetchNextPage, isLoading }: ExpensesTableProps) {
  const tableRef = useTableFetchNext(fetchNextPage, isLoading);

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }} ref={tableRef}>
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
