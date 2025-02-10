import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CreateExpenseFormData } from "./types.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import useCategories from "@src/repository/useCategories.ts";
import { useEffect, useState } from "react";
import ExpenseTypeSelect from "@src/components/molecules/ExpenseTypeSelect";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";
import { setExpenseToEdit } from "@src/store/ExpenseSlice.ts";
import ControlledTextField from "@src/components/atoms/ControlledTextField";
import { DateTime } from "luxon";
import { Enums, Tables } from "@src/utils/database.types.ts";
import CategoryIcon from "@src/components/atoms/CategoryIcon";
import BottomFab from "@src/components/atoms/BottomFab";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ControlledAmountTextField from "@src/components/atoms/ControlledAmountTextField";
import { sumBy } from "lodash";
import { currencyFormat, isPlannedExpenseRealized, isValidCompound } from "@src/utils/functions.ts";
import usePlannedExpenses from "@src/repository/usePlannedExpenses.ts";
import supabase from "@src/utils/supabase.ts";

type CreateExpenseFormProps = {
  planned: boolean;
};

function CreateExpenseForm({ planned }: CreateExpenseFormProps) {
  const { t } = useTranslation("CreateExpense");
  const { expenseToEdit, plannedExpenseToEdit } = useAppSelector((state) => state.expense);
  const [selectedType, setSelectedType] = useState<Enums<"expense_type">>("expense");
  const [compoundDialogOpen, setCompoundDialogOpen] = useState(false);
  const [plannedExpensesDialogOpen, setPlannedExpensesDialogOpen] = useState(false);
  const [filledFromPlannedExpense, setFilledFromPlannedExpense] = useState<Tables<"planned_expenses"> | null>(null);
  const dispatch = useAppDispatch();

  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  const { data: plannedExpenses } = usePlannedExpenses();
  const filteredCategories = categories.filter(({ type }) => type === selectedType);
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset: resetForm,
  } = useForm<CreateExpenseFormData>({
    defaultValues: {
      type: "expense",
      category: filteredCategories.at(0)?.id,
      account: accounts.at(0)?.id,
      from_account: accounts.at(1)?.id,
      amount: 0,
      ...(!planned ? { date: DateTime.now().toSQLDate() } : {}),
      description: "",
      compound: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "compound" });

  const formType = watch("type");
  const compound = watch("compound");
  const date = watch("date");

  const isEdit = planned ? !!plannedExpenseToEdit : !!expenseToEdit;

  useEffect(() => {
    if (!expenseToEdit) return;
    setValue("account", expenseToEdit.account.id);
    setValue("amount", expenseToEdit.amount);
    setValue("category", expenseToEdit.category.id);
    setValue("date", expenseToEdit.date);
    setValue("description", expenseToEdit.description);
    if (expenseToEdit.from_account) setValue("from_account", expenseToEdit.from_account.id);
    setValue("type", expenseToEdit.type);
    if (isValidCompound(expenseToEdit.compound)) setValue("compound", expenseToEdit.compound);
  }, [expenseToEdit, setValue]);

  useEffect(() => {
    if (!plannedExpenseToEdit) return;
    setValue("account", plannedExpenseToEdit.account);
    setValue("amount", plannedExpenseToEdit.amount);
    setValue("category", plannedExpenseToEdit.category);
    setValue("description", plannedExpenseToEdit.description);
    if (plannedExpenseToEdit.from_account) setValue("from_account", plannedExpenseToEdit.from_account);
    setValue("type", plannedExpenseToEdit.type);
    if (isValidCompound(plannedExpenseToEdit.compound)) setValue("compound", plannedExpenseToEdit.compound);
  }, [plannedExpenseToEdit, setValue]);

  useEffect(() => {
    setSelectedType(formType);
    if (!expenseToEdit?.category && filteredCategories.at(0)) setValue("category", filteredCategories[0].id);
  }, [expenseToEdit, filteredCategories, formType, setValue]);

  const onCompoundDialogClose = () => {
    setCompoundDialogOpen(false);
    if (compound && compound.length > 0)
      setValue(
        "amount",
        sumBy(compound, ({ amount }) => Number(amount)),
      );
  };

  const fillFromPlanned = (plannedExpense: Tables<"planned_expenses">) => {
    setValue("account", plannedExpense.account);
    setValue("amount", plannedExpense.amount);
    setValue("category", plannedExpense.category);
    setValue("description", plannedExpense.description);
    if (plannedExpense.from_account) setValue("from_account", plannedExpense.from_account);
    setValue("type", plannedExpense.type);
    if (isValidCompound(plannedExpense.compound)) setValue("compound", plannedExpense.compound);
    setPlannedExpensesDialogOpen(false);
    setFilledFromPlannedExpense(plannedExpense);
  };

  const { mutate: upsertExpenses, reset: resetUpsert } = useOptimisticUpsert(
    planned ? "planned_expenses" : "expenses",
    {
      onSuccess: async () => {
        resetForm();
        resetUpsert();
        dispatch(setExpenseToEdit(null));
        dispatch(showFeedback({ message: t("success"), type: "success" }));
        if (filledFromPlannedExpense)
          await supabase.from("planned_expenses").update({ realized: date }).eq("id", filledFromPlannedExpense.id);
      },
      onError: () => {
        dispatch(showFeedback({ message: t("error"), type: "error" }));
      },
    },
  );

  const onSubmit = (data: CreateExpenseFormData) => {
    upsertExpenses(expenseToEdit ? [{ ...data, id: Number(expenseToEdit.id) }] : [data]);
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
            <Typography sx={{ display: "flex", gap: 2 }}>
              <CategoryIcon icon={category.icon} />
              {category.name}
            </Typography>
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
      <ControlledAmountTextField
        control={control}
        name="amount"
        rules={{
          min: 0.01,
          required: true,
        }}
        fullWidth
        label={t("amount")}
        disabled={compound && compound.length > 0}
      />
      {!planned ? (
        <ControlledTextField
          control={control}
          name="date"
          rules={{ required: true }}
          sx={{ colorScheme: "dark" }}
          type="date"
          fullWidth={false}
        />
      ) : null}
      <ControlledTextField control={control} name="description" multiline rows={3} label={t("description")} />

      <Button type="submit" variant="contained">
        {isEdit ? t("update") : t("create")}
      </Button>

      <BottomFab onClick={() => setCompoundDialogOpen(true)}>
        <ListIcon />
      </BottomFab>

      {!planned ? (
        <BottomFab sx={{ translate: "calc(-100% - 0.5rem) 0" }} onClick={() => setPlannedExpensesDialogOpen(true)}>
          <CalendarMonthIcon />
        </BottomFab>
      ) : null}

      <Dialog open={compoundDialogOpen} onClose={onCompoundDialogClose}>
        <DialogTitle>{t("compoundTitle")}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
          <List>
            {fields.map((field, index) => (
              <ListItem key={field.id} sx={{ gap: 1 }} disableGutters>
                <ControlledAmountTextField
                  control={control}
                  name={`compound.${index}.amount`}
                  rules={{
                    min: 0.01,
                    required: true,
                  }}
                  label={t("amount")}
                  hideMoneyIcon
                  sx={{ flex: 2 }}
                />
                <ControlledTextField
                  control={control}
                  rules={{ required: true }}
                  name={`compound.${index}.description`}
                  label={t("description")}
                  sx={{ flex: 3 }}
                />
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Fab color="primary" size="small" onClick={() => append({ amount: 0, description: "" })}>
            <AddIcon />
          </Fab>
        </DialogContent>
      </Dialog>

      <Dialog open={plannedExpensesDialogOpen} onClose={() => setPlannedExpensesDialogOpen(false)}>
        <DialogTitle>{t("plannedExpensesTitle")}</DialogTitle>
        <DialogContent>
          <List>
            {plannedExpenses?.map((plannedExpense) => (
              <ListItemButton
                key={plannedExpense.id}
                onClick={() => fillFromPlanned(plannedExpense)}
                disabled={isPlannedExpenseRealized(plannedExpense.realized)}
              >
                <ListItemText
                  primary={plannedExpense.description}
                  secondary={currencyFormat().format(plannedExpense.amount)}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export default CreateExpenseForm;
