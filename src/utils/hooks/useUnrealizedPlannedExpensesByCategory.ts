import useUnrealizedPlannedExpenses from "@src/utils/hooks/useUnrealizedPlannedExpenses.ts";
import useCategories from "@src/repository/useCategories.ts";

function useUnrealizedPlannedExpensesByCategory() {
  const plannedExpenses = useUnrealizedPlannedExpenses("category");
  const { data: categories } = useCategories();

  return Object.fromEntries(
    Object.entries(plannedExpenses).map(([id, amount]) => [
      categories.find((cat) => String(cat.id) === id)?.name,
      amount,
    ]),
  );
}

export default useUnrealizedPlannedExpensesByCategory;
