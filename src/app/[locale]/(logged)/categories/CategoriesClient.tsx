"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { ConfirmModal, CreateButton, CreateCategoryModal } from "@/components";
import { CategorySection } from "@/components/categories";
import { FormWrap } from "@/components/shared/FormWrap";
import { useRouter } from "@/navigation";
import { useCategories } from "@/repository/useCategories";
import { useDeleteCategory } from "@/repository/useDeleteCategory";
import { useUpdateParams } from "@/utils/hooks";
import { CREATE_CATEGORY_MODAL } from "@/utils/ids";
import { DELETE_ID, UPDATE_ID } from "@/utils/searchParams";
import { ExpenseTypes, isExpenseType } from "@/utils/types";

export function CategoriesClient() {
  const t = useTranslations("Categories");
  const searchParams = useSearchParams();
  const updateParams = useUpdateParams();
  const router = useRouter();
  const { data: categories } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();
  const categoryToUpdate = categories?.find((category) => category.id === Number(searchParams.get(UPDATE_ID)));

  const expenseCategories = categories?.filter((category) => category.type === ExpenseTypes.enum.expense);
  const incomeCategories = categories?.filter((category) => category.type === ExpenseTypes.enum.income);
  const transfersCategories = categories?.filter((category) => category.type === ExpenseTypes.enum.transfer);

  const onConfirmDelete = () => {
    if (!searchParams.has(DELETE_ID)) return;
    deleteCategory(Number(searchParams.get(DELETE_ID)));
    router.refresh();
    updateParams(DELETE_ID, null);
  };

  return (
    <>
      <CategorySection title={t("expenses")} categories={expenseCategories} />
      <CategorySection title={t("incomes")} categories={incomeCategories} />
      <CategorySection title={t("transfers")} categories={transfersCategories} />
      <CreateButton label={t("createCategory")} modal={CREATE_CATEGORY_MODAL} />
      <FormWrap<typeof CreateCategoryModal>
        Form={CreateCategoryModal}
        category={categoryToUpdate}
        initialType={categoryToUpdate?.type && isExpenseType(categoryToUpdate.type) ? categoryToUpdate.type : undefined}
      />
      <ConfirmModal
        title={t("confirmDelete")}
        onConfirm={onConfirmDelete}
        onCancel={() => updateParams(DELETE_ID, null)}
      />
    </>
  );
}
