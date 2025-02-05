import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { TablesUpdate } from "@src/utils/database.types.ts";
import queryKey from "@src/utils/queryKey.ts";
import { useAppDispatch } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";
import { useTranslation } from "react-i18next";

function useDeleteAccount() {
  const { t } = useTranslation("Feedback");
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("accounts").delete().eq("id", id).throwOnError(),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKey.accounts.all });
      const previousAccounts = queryClient.getQueryData(queryKey.accounts.all) as TablesUpdate<"accounts">[];
      const nextAccounts = previousAccounts.filter((account) => account.id !== id);
      queryClient.setQueryData(queryKey.accounts.all, nextAccounts);
      return { previousAccounts, nextAccounts };
    },
    onError: (_, __, context) => {
      dispatch(showFeedback({ message: t("usedAccount"), type: "error" }));
      if (context) queryClient.setQueryData(queryKey.accounts.all, context.previousAccounts);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey.accounts.all }),
  });
}

export default useDeleteAccount;
