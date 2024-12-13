import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (name: string, value: string | string[] | null) => {
    const otherParams = Array.from(searchParams.entries()).filter(([n]) => n !== name);
    const values = typeof value === "string" ? [value] : value;
    const newParams = values === null ? [] : values.map((v) => [name, v]);
    router.push(`?${new URLSearchParams([...otherParams, ...newParams])}`, {
      scroll: false,
    });
  };
}
