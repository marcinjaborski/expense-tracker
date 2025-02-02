import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CreateExpenseFormData } from "./types.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import useCategories from "@src/repository/useCategories.ts";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ExpenseType } from "@src/utils/types.ts";
import AmountTextField from "@src/components/atoms/AmountTextField";
import ExpenseTypeSelect from "@src/components/molecules/ExpenseTypeSelect";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import { useAppDispatch } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";

function CreateExpenseForm() {
  const { t } = useTranslation("CreateExpense");
  const { id } = useParams();
  const [selectedType, setSelectedType] = useState<ExpenseType>("expense");
  const dispatch = useAppDispatch();

  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  const filteredCategories = categories.filter(({ type }) => type === selectedType);
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
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

  const { mutate: upsertExpenses, status, reset: resetUpsert } = useOptimisticUpsert("expenses");

  const onSubmit = (data: CreateExpenseFormData) => {
    upsertExpenses(id ? [{ ...data, id: Number(id) }] : [data]);
  };

  useEffect(() => {
    if (status === "success") {
      resetForm();
      resetUpsert();
      dispatch(showFeedback({ message: t("success"), type: "success" }));
    } else if (status === "error") {
      dispatch(showFeedback({ message: t("error"), type: "error" }));
    }
  }, [dispatch, status, resetForm, resetUpsert, t]);

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

      <Controller
        control={control}
        name="amount"
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AmountTextField
            fullWidth
            label={t("amount")}
            value={value}
            error={!!error}
            myCurrencyInputProps={{
              onValueChange: (value) => onChange(value || 0),
            }}
          />
        )}
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
