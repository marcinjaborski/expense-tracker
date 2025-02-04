import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CreateExpenseFormData } from "./types.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import useCategories from "@src/repository/useCategories.ts";
import { useEffect, useState } from "react";
import AmountTextField from "@src/components/atoms/AmountTextField";
import ExpenseTypeSelect from "@src/components/molecules/ExpenseTypeSelect";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";
import { setExpenseToEdit } from "@src/store/ExpenseSlice.ts";
import ControlledTextField from "@src/components/atoms/ControlledTextField";
import { DateTime } from "luxon";
import { Enums } from "@src/utils/database.types.ts";

function CreateExpenseForm() {
  const { t } = useTranslation("CreateExpense");
  const { expenseToEdit } = useAppSelector((state) => state.expense);
  const [selectedType, setSelectedType] = useState<Enums<"expense_type">>("expense");
  const dispatch = useAppDispatch();

  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  const filteredCategories = categories.filter(({ type }) => type === selectedType);
  const {
    control,
    watch,
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateExpenseFormData>({
    defaultValues: {
      type: "expense",
      category: filteredCategories.at(0)?.id,
      account: accounts.at(0)?.id,
      from_account: accounts.at(1)?.id,
      amount: 0,
      date: DateTime.now().toSQLDate(),
      description: "",
    },
  });

  const formType = watch("type");

  useEffect(() => {
    if (expenseToEdit)
      resetForm({
        account: expenseToEdit.account.id,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category.id,
        date: expenseToEdit.date,
        description: expenseToEdit.description,
        from_account: expenseToEdit.from_account ?? undefined,
        type: expenseToEdit.type,
      });
  }, [expenseToEdit, resetForm]);

  useEffect(() => {
    setSelectedType(formType);
  }, [formType]);

  const { mutate: upsertExpenses, status, reset: resetUpsert } = useOptimisticUpsert("expenses");

  const onSubmit = (data: CreateExpenseFormData) => {
    upsertExpenses(expenseToEdit ? [{ ...data, id: Number(expenseToEdit.id) }] : [data]);
    dispatch(setExpenseToEdit(null));
    resetForm();
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
      <ControlledTextField
        control={control}
        name="category"
        rules={{
          required: true,
          validate: (value) => !!filteredCategories.find((category) => category.id === value),
        }}
        select
        label={t("category")}
      >
        {filteredCategories.map((category) => (
          <MenuItem value={category.id} key={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </ControlledTextField>
      {selectedType === "transfer" ? (
        <ControlledTextField
          control={control}
          name="from_account"
          rules={{ required: true, validate: (value, formData) => value !== formData.account }}
          select
          label={t("fromAccount")}
        >
          {accounts.map((account) => (
            <MenuItem value={account.id} key={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </ControlledTextField>
      ) : null}
      <ControlledTextField
        control={control}
        name="account"
        rules={{ required: true }}
        select
        label={t(selectedType === "transfer" ? "toAccount" : "account")}
      >
        {accounts.map((account) => (
          <MenuItem value={account.id} key={account.id}>
            {account.name}
          </MenuItem>
        ))}
      </ControlledTextField>
      <Controller
        control={control}
        name="amount"
        rules={{
          required: true,
          min: 0.01,
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
      <ControlledTextField
        control={control}
        name="date"
        rules={{ required: true }}
        sx={{ colorScheme: "dark" }}
        type="date"
        fullWidth={false}
      />
      <ControlledTextField control={control} name="description" multiline rows={3} label={t("description")} />

      <Button type="submit" variant="contained">
        {expenseToEdit ? t("update") : t("create")}
      </Button>
    </Stack>
  );
}

export default CreateExpenseForm;
