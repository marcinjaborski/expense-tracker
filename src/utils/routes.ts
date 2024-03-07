import { invert } from "lodash";

import { ExpenseType } from "@/utils/types";

export const expensesRoutes = ["/expenses", "/incomes", "/transfers"] as const;
export type ExpensesRoute = (typeof expensesRoutes)[number];

export function isExpenseRoute(route: string): route is ExpensesRoute {
  return expensesRoutes.includes(route as ExpensesRoute);
}

export const mapRouteToType: Record<ExpensesRoute, ExpenseType> = {
  "/expenses": "expense",
  "/incomes": "income",
  "/transfers": "transfer",
};

export const mapExpenseTypeToRoute = invert(mapRouteToType) as Record<ExpenseType, ExpensesRoute>;
