import useTotalDebts from "@src/repository/useTotalDebts.ts";

function useDebtsByPerson() {
  const { data: totalDebts } = useTotalDebts();
  if (!totalDebts?.data) return null;
  return Object.fromEntries(totalDebts.data.map(({ person, sum }) => [person, sum]));
}

export default useDebtsByPerson;
