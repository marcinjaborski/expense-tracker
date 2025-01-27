import { Dir, ExpenseOption, Sort } from "@src/utils/types.ts";

export type ExpenseFilters = {
  type: ExpenseOption;
  q?: string;
  sort?: Sort;
  dir?: Dir;
  accounts?: number[];
  categories?: number[];
};

export type DebtFilters = {
  showSettled: boolean;
};

const queryKey = {
  expenses: {
    all: ["expenses"] as const,
    list: (filters: ExpenseFilters) => [...queryKey.expenses.all, { filters }],
  },
  accounts: {
    all: ["accounts"] as const,
  },
  categories: {
    all: ["categories"] as const,
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
