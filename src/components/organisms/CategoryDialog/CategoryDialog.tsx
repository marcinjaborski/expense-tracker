import AddIcon from "@mui/icons-material/Add";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ActionDialog from "@src/components/molecules/ActionDialog";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { Enums, Tables } from "@src/utils/database.types.ts";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import { setCategoryDialogOpen } from "@src/store/DialogSlice.ts";
import { useEffect } from "react";
import ExpenseTypeSelect from "@src/components/molecules/ExpenseTypeSelect";
import categoryIcon from "@src/utils/categoryIcon.ts";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import ControlledTextField from "@src/components/atoms/ControlledTextField";

type FormData = {
  name: string;
  type: Enums<"expense_type">;
  icon: string;
};

type Props = {
  category: Tables<"categories"> | null;
  resetCategory: () => void;
};

function CategoryDialog({ category, resetCategory }: Props) {
  const { t } = useTranslation("Categories");
  const dispatch = useAppDispatch();
  const { categoryDialogOpen } = useAppSelector((state) => state.dialog);
  const { control, handleSubmit, reset } = useForm<FormData>();
  const { mutate: upsertCategories } = useOptimisticUpsert("categories");

  useEffect(() => {
    if (category) reset({ name: category.name, type: category.type, icon: category.icon });
    else reset({ name: "", type: "expense", icon: "" });
  }, [reset, category]);

  const onSubmit = (data: FormData) => {
    upsertCategories(category?.id ? [{ ...data, id: category.id }] : [data]);
    dispatch(setCategoryDialogOpen(false));
  };

  return (
    <ActionDialog
      open={categoryDialogOpen}
      setOpen={(open) => {
        if (open) resetCategory();
        dispatch(setCategoryDialogOpen(open));
      }}
      fabProps={{
        children: <AddIcon />,
      }}
      title={t("createCategoryTitle")}
      content={
        <>
          <ControlledTextField control={control} name="name" rules={{ required: true }} label={t("name")} />
          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => <ExpenseTypeSelect value={value} onChange={onChange} />}
          />
          <Controller
            control={control}
            name="icon"
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl>
                <InputLabel>{t("icon")}</InputLabel>
                <Select
                  label={t("icon")}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  MenuProps={{
                    slotProps: {
                      paper: {
                        sx: {
                          "&>.MuiList-root": { display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" },
                        },
                      },
                    },
                  }}
                >
                  {Object.entries(categoryIcon).map(([name, Icon]) => (
                    <MenuItem key={name} value={name}>
                      <Icon />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </>
      }
      submitText={t("createCategory")}
      dialogProps={{
        PaperProps: {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        },
      }}
    />
  );
}

export default CategoryDialog;
