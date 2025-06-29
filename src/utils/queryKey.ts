import { Dir, ExpenseOption, Sort } from "@src/utils/types.ts";

export type ExpenseFilters = {
  type: ExpenseOption;
  q?: string;
  sort?: Sort;
  dir?: Dir;
  accounts?: number[];
  categories?: number[];
  dateFrom?: string;
  dateTo?: string;
  amountFrom?: number;
  amountTo?: number;
};

export type AmountByCategoryAndDateFilters = {
  startDate: string;
  endDate: string;
  upToCurrentDay?: boolean;
};

export type OutgoingTransfersByAccountsFilters = {
  endDate?: string;
};

export type DebtFilters = {
  person: string;
  showSettled: boolean;
};

const queryKey = {
  users: {
    all: ["users"] as const,
    get: () => [...queryKey.users.all, "current"],
  },
  expenses: {
    all: ["expenses"] as const,
    list: (filters: ExpenseFilters) => [...queryKey.expenses.all, { filters }],
    total: (endDate?: string) => [...queryKey.expenses.all, "totalExpenses", endDate],
    amountByCategoryAndDate: (filters: AmountByCategoryAndDateFilters) => [
      ...queryKey.expenses.all,
      "amountByCategoryAndDate",
      { filters },
    ],
    countsByCategoryAndDate: (filters: AmountByCategoryAndDateFilters) => [
      ...queryKey.expenses.all,
      "countByCategoryAndDate",
      { filters },
    ],
    outgoingTransfersByAccounts: (filters: OutgoingTransfersByAccountsFilters) => [
      ...queryKey.expenses.all,
      "outgoingTransfersByAccounts",
      { filters },
    ],
  },
  accounts: {
    all: ["accounts"] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  planned_expenses: {
    all: ["plannedExpenses"] as const,
  },
  debts: {
    all: ["debts"] as const,
    list: (filters: DebtFilters) => [...queryKey.debts.all, { filters }],
    total: () => [...queryKey.debts.all, "totalDebts"],
  },
  counts: {
    all: ["counts"] as const,
  },
};

export default queryKey;
