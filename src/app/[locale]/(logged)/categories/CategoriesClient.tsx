"use client";

import { useTranslations } from "next-intl";

import { ConfirmModal, CreateButton } from "@/components";
import { CategorySection, CreateCategoryModal } from "@/components/categories";
import { FormWrap } from "@/components/shared/FormWrap";
import { useCategories } from "@/repository/useCategories";
import { useDeleteCategory } from "@/repository/useDeleteCategory";
import { ModalContext } from "@/utils/context/ModalContext";
import { useMutateModals } from "@/utils/hooks";
import { CREATE_CATEGORY_MODAL } from "@/utils/ids";
import { ExpenseTypes, isExpenseType } from "@/utils/types";

export function CategoriesClient() {
  const t = useTranslations("Categories");
  const { data: categories } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { contextValue, deleteId, updateId } = useMutateModals(CREATE_CATEGORY_MODAL);

  const expenseCategories = categories?.filter((category) => category.type === ExpenseTypes.enum.expense);
  const incomeCategories = categories?.filter((category) => category.type === ExpenseTypes.enum.income);
  const transfersCategories = categories?.filter((category) => category.type === ExpenseTypes.enum.transfer);

  const categoryToUpdate = categories?.find((category) => category.id === updateId);

  return (
    <ModalContext.Provider value={contextValue}>
      <CategorySection title={t("expenses")} categories={expenseCategories} />
      <CategorySection title={t("incomes")} categories={incomeCategories} />
      <CategorySection title={t("transfers")} categories={transfersCategories} />
      <CreateButton label={t("createCategory")} createFn={contextValue.showCreateModal} />
      <FormWrap<typeof CreateCategoryModal>
        Form={CreateCategoryModal}
        category={categoryToUpdate}
        initialType={categoryToUpdate?.type && isExpenseType(categoryToUpdate.type) ? categoryToUpdate.type : undefined}
      />
      <ConfirmModal title={t("confirmDelete")} onConfirm={() => deleteId && deleteCategory(deleteId)} />
    </ModalContext.Provider>
  );
}
