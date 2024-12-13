export type SearchParamType = string | string[] | undefined;

export const SORT = {
  name: "sort",
  date: "date",
  amount: "amount",
} as const;

export type SortOption = typeof SORT.date | typeof SORT.amount;

export function parseSortOption(searchParam: SearchParamType | null): SortOption {
  return searchParam === SORT.date || searchParam === SORT.amount ? searchParam : SORT.date;
}

export const DIR = {
  name: "dir",
  asc: "asc",
  desc: "desc",
} as const;

export type DirOption = typeof DIR.asc | typeof DIR.desc;

export function parseDirOption(searchParam: SearchParamType | null): DirOption {
  return searchParam === DIR.asc || searchParam === DIR.desc ? searchParam : DIR.desc;
}

export const QUERY = "q";

export function parseQuery(searchParam: SearchParamType | null): string {
  return typeof searchParam === "string" ? searchParam : "";
}

export type ExpenseListSearchParams = {
  searchParams: Record<typeof QUERY | typeof SORT.name | typeof DIR.name, SearchParamType>;
};

export const UPDATE_ID = "updateId";

export type UpdateSearchParams = {
  searchParams: {
    [UPDATE_ID]: SearchParamType;
  };
};
