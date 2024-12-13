import { useTotalDebts } from "@/repository/useTotalDebts";

export function useDebtsByPerson() {
  const { data: totalDebts } = useTotalDebts();
  if (!totalDebts?.data) return null;
  return Object.fromEntries(totalDebts.data?.map(({ person, sum }) => [person, sum]));
}
