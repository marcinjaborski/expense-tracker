import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CreateExpenseFormData } from "./types.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import useCategories from "@src/repository/useCategories.ts";
import useCreateExpense from "@src/repository/useCreateExpense.ts";
import useUpdateExpense from "@src/repository/useUpdateExpense.ts";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ExpenseType } from "@src/utils/types.ts";
import AmountTextField from "@src/components/atoms/AmountTextField";
import ExpenseTypeSelect from "@src/components/molecules/ExpenseTypeSelect";

function CreateExpenseForm() {
  const { t } = useTranslation("CreateExpense");
  const { id } = useParams();
  const [selectedType, setSelectedType] = useState<ExpenseType>("expense");

  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  const filteredCategories = categories.filter(({ type }) => type === selectedType);
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateExpenseFormData>({
    defaultValues: {
      type: "expense",
      account: accounts.at(0)?.id,
      category: filteredCategories.at(0)?.id,
    },
  });

  const formType = watch("type");

  useEffect(() => {
    setSelectedType(formType);
  }, [formType]);

  const { mutate: createExpense } = useCreateExpense();
  const { mutate: updateExpense } = useUpdateExpense();

  const onSubmit = (data: CreateExpenseFormData) => {
    console.log(data);
    // if (id) updateExpense(data);
    // else createExpense(data);
  };

  return (
    <Stack
      sx={{ p: 3, alignItems: "center", justifyContent: "center", height: "100%", gap: 2 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => <ExpenseTypeSelect value={value} onChange={onChange} />}
      />
      <Controller
        control={control}
        name="category"
        rules={{
          required: true,
          validate: (value) => !!filteredCategories.find((category) => category.id === value),
        }}
        render={({ field: { value, onChange } }) => (
          <TextField
            select
            fullWidth
            label={t("category")}
            value={value}
            error={!!errors?.category}
            onChange={(event) => onChange(event.target.value)}
          >
            {filteredCategories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="account"
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextField
            select
            fullWidth
            label={t("account")}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          >
            {accounts.map((account) => (
              <MenuItem value={account.id} key={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <AmountTextField
        fullWidth
        label={t("amount")}
        {...register("amount", { required: true, setValueAs: parseFloat })}
      />
      <TextField sx={{ colorScheme: "dark" }} type="date" {...register("date", { required: true })} />
      <TextField multiline rows={3} fullWidth label={t("description")} {...register("description")} />
      <Button type="submit" variant="contained">
        {t("create")}
      </Button>
    </Stack>
  );
}

export default CreateExpenseForm;
