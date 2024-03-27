import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (name: string, value: string | null) => {
    const otherParams = Object.fromEntries(searchParams.entries());
    delete otherParams[name];
    const newParam = value !== null ? { [name]: value } : {};
    router.push(
      `?${new URLSearchParams({
        ...otherParams,
        ...newParam,
      })}`,
      {
        scroll: false,
      },
    );
  };
}
