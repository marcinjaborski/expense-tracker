import { useCallback, useLayoutEffect, useRef } from "react";
import { throttle } from "lodash";
import { TABLE_FETCH_NEXT_THRESHOLD, TABLE_FETCH_NEXT_TIMEOUT } from "@src/utils/constants.ts";
import useExpenses from "@src/repository/useExpenses.ts";

function useTableFetchNext(fetchNextPage: ReturnType<typeof useExpenses>["fetchNextPage"], isLoading: boolean) {
  const throttledFetchNextPage = useRef(throttle(fetchNextPage, TABLE_FETCH_NEXT_TIMEOUT, { trailing: false }));
  const tableRef = useRef<HTMLTableElement>(null);

  const scrollListener = useCallback(() => {
    if (!tableRef.current) return;

    const bottom = tableRef.current.scrollHeight - tableRef.current.clientHeight;
    if (tableRef.current.scrollTop > bottom * TABLE_FETCH_NEXT_THRESHOLD && !isLoading) {
      throttledFetchNextPage.current();
    }
  }, [throttledFetchNextPage, isLoading]);

  useLayoutEffect(() => {
    const { current } = tableRef;
    current?.addEventListener("scroll", scrollListener);
    return () => current?.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return tableRef;
}

export default useTableFetchNext;
