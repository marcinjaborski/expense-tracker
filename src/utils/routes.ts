import { invert } from "lodash";

import { ExpenseOption, ExpenseType } from "@/utils/types";

export const expensesRoutes = ["/all", "/expenses", "/incomes", "/transfers"] as const;
export type ExpensesRoute = (typeof expensesRoutes)[number];

export function isExpenseRoute(route: string): route is ExpensesRoute {
  return expensesRoutes.includes(route as ExpensesRoute);
}

export const mapRouteToType: Record<ExpensesRoute, ExpenseOption> = {
  "/all": "all",
  "/expenses": "expense",
  "/incomes": "income",
  "/transfers": "transfer",
};

export const mapExpenseTypeToRoute = invert(mapRouteToType) as Record<ExpenseType, ExpensesRoute>;
