import { ExpenseType } from "@/utils/types";
import _ from "lodash";

export const expensesRoutes = ["expenses", "incomes", "transfers"] as const;
export type ExpensesRoute = (typeof expensesRoutes)[number];

export function isExpenseRoute(route: string): route is ExpensesRoute {
  return expensesRoutes.includes(route as ExpensesRoute);
}

export const mapRouteToType: Record<ExpensesRoute, ExpenseType> = {
  expenses: "expense",
  incomes: "income",
  transfers: "transfer",
};

export const mapExpenseTypeToRoute = _.invert(mapRouteToType) as Record<ExpenseType, ExpensesRoute>;
