export const expensesRoutes = ["expenses", "incomes", "transfers"] as const;
export type ExpensesRoute = (typeof expensesRoutes)[number];

export function isExpenseRoute(route: string): route is ExpensesRoute {
  return expensesRoutes.includes(route as ExpensesRoute);
}
