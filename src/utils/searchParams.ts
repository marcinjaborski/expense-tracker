export const SORT = {
  name: "sort",
  date: "date",
  amount: "amount",
} as const;

export type SortOption = typeof SORT.date | typeof SORT.amount;

export function parseSortOption(searchParam: string | string[] | null | undefined): SortOption {
  return searchParam === SORT.date || searchParam === SORT.amount ? searchParam : SORT.date;
}

export const DIR = {
  name: "dir",
  asc: "asc",
  desc: "desc",
} as const;

export type DirOption = typeof DIR.asc | typeof DIR.desc;

export function parseDirOption(searchParam: string | string[] | null | undefined): DirOption {
  return searchParam === DIR.asc || searchParam === DIR.desc ? searchParam : DIR.desc;
}

export const QUERY = "q";

export function parseQuery(searchParam: string | string[] | null | undefined): string {
  return typeof searchParam === "string" ? searchParam : "";
}

export type ExpenseListSearchParams = Record<
  typeof QUERY | typeof SORT.name | typeof DIR.name,
  string | string[] | undefined
>;
