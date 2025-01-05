import { useTranslation } from "react-i18next";
import useCategories from "@src/repository/useCategories.ts";
import { Fragment, useState } from "react";
import { Tables } from "@src/utils/database.types.ts";
import ConfirmDialog from "@src/components/organisms/ConfirmDialog";
import useDeleteCategory from "@src/repository/useDeleteCategory.ts";
import CategoryDialog from "@src/components/organisms/CategoryDialog";
import CategoryDraggableList from "@src/components/templates/CategoryDraggableList";
import { Typography } from "@mui/material";
import { ExpenseType } from "@src/utils/types.ts";

function Categories() {
  const { t } = useTranslation("Categories");
  const { data: categories } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();
  const [categoryToEdit, setCategoryToEdit] = useState<Tables<"categories"> | null>(null);
  const [categoryDeleteId, setCategoryDeleteId] = useState<number | null>(null);

  const onConfirmDelete = () => {
    if (categoryDeleteId) deleteCategory(categoryDeleteId);
    setCategoryDeleteId(null);
  };

  return (
    <>
      {(["income", "expense", "transfer"] satisfies ExpenseType[]).map((type) => (
        <Fragment key={type}>
          <Typography variant="subtitle2" sx={{ p: 2 }}>
            {t(`${type}s`)}
          </Typography>
          <CategoryDraggableList
            categories={categories.filter((category) => category.type === type)}
            setCategoryToEdit={setCategoryToEdit}
            setCategoryDeleteId={setCategoryDeleteId}
          />
        </Fragment>
      ))}
      <CategoryDialog category={categoryToEdit} resetCategory={() => setCategoryToEdit(null)} />
      <ConfirmDialog
        title={t("confirmDelete")}
        open={categoryDeleteId !== null}
        onCancel={() => setCategoryDeleteId(null)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}

export default Categories;
