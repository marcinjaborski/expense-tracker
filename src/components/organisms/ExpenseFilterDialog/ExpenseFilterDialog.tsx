import FilterListIcon from "@mui/icons-material/FilterList";
import { Dialog, DialogContent, DialogTitle, Fab, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import {
  closeDialog,
  openDialog,
  setAccounts,
  setCategories,
  toggleDir,
  setQ,
  setSort,
} from "@src/store/ExpenseFilterSlice.ts";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import useCategories from "@src/repository/useCategories.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import MultipleSelect from "@src/components/atoms/MultipleSelect";
import { Sort } from "@src/utils/types.ts";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function getMultipleSelectValue<T>(value: T) {
  return typeof value === "string" ? value.split(",").map(Number) : (value as number[]);
}

function ExpenseFilterDialog() {
  const { t } = useTranslation("ExpenseList");
  const {
    open,
    categories: selectedCategories,
    accounts: selectedAccounts,
    sort,
    dir,
  } = useAppSelector((state) => state.expenseFilter);
  const dispatch = useAppDispatch();
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();

  const debouncedSetQ = useDebouncedCallback((value: string) => dispatch(setQ(value)), 1000);

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        sx={{ position: "fixed", right: "1rem", bottom: "4.375rem" }}
        onClick={() => dispatch(openDialog())}
      >
        <FilterListIcon />
      </Fab>
      <Dialog open={open} onClose={() => dispatch(closeDialog())}>
        <DialogTitle>{t("filtersModal")}</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            <TextField label={t("search")} onChange={(event) => debouncedSetQ(event.target.value)} />
            <MultipleSelect
              label={t("categories")}
              value={selectedCategories}
              values={categories}
              onChange={(event) => dispatch(setCategories(getMultipleSelectValue(event.target.value)))}
            />
            <MultipleSelect
              label={t("accounts")}
              value={selectedAccounts}
              values={accounts}
              onChange={(event) => dispatch(setAccounts(getMultipleSelectValue(event.target.value)))}
            />
            <Stack direction="row" gap={1}>
              <TextField
                fullWidth
                select
                label={t("sort")}
                value={sort}
                onChange={(event) => dispatch(setSort(event.target.value as Sort))}
              >
                <MenuItem value="date">{t("byDate")}</MenuItem>
                <MenuItem value="amount">{t("byAmount")}</MenuItem>
              </TextField>
              <IconButton onClick={() => dispatch(toggleDir())}>
                <ArrowDownwardIcon
                  sx={{ transition: "rotate 0.3s ease-in-out", rotate: dir === "asc" ? "-180deg" : null }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExpenseFilterDialog;
