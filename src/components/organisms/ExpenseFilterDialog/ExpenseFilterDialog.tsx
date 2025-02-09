import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import {
  closeDialog,
  openDialog,
  setAccounts,
  setCategories,
  toggleDir,
  setQ,
  setSort,
  setDateFrom,
  setDateTo,
  setAmountFrom,
  setAmountTo,
  resetFilters,
} from "@src/store/ExpenseFilterSlice.ts";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import useCategories from "@src/repository/useCategories.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import MultipleSelect from "@src/components/atoms/MultipleSelect";
import { Sort } from "@src/utils/types.ts";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CategoryIcon from "@src/components/atoms/CategoryIcon";
import AmountTextField from "@src/components/atoms/AmountTextField";
import BottomFab from "@src/components/atoms/BottomFab";

function getMultipleSelectValue<T>(value: T) {
  return typeof value === "string" ? value.split(",").map(Number) : (value as number[]);
}

function ExpenseFilterDialog() {
  const { t } = useTranslation("ExpenseList");
  const {
    open,
    q,
    categories: selectedCategories,
    accounts: selectedAccounts,
    sort,
    dir,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
  } = useAppSelector((state) => state.expenseFilter);
  const dispatch = useAppDispatch();
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();

  const debouncedSetQ = useDebouncedCallback((value: string) => dispatch(setQ(value)), 1000);
  const debouncedSetAmountFrom = useDebouncedCallback((value: number) => dispatch(setAmountFrom(value)), 1000);
  const debouncedSetAmountTo = useDebouncedCallback((value: number) => dispatch(setAmountTo(value)), 1000);

  return (
    <>
      <BottomFab onClick={() => dispatch(openDialog())}>
        <FilterListIcon />
      </BottomFab>
      <Dialog open={open} onClose={() => dispatch(closeDialog())}>
        <DialogTitle>{t("filtersModal")}</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            <TextField label={t("search")} defaultValue={q} onChange={(event) => debouncedSetQ(event.target.value)} />
            <MultipleSelect
              label={t("categories")}
              value={selectedCategories}
              values={categories.map((category) => ({
                id: category.id,
                name: (
                  <Typography sx={{ display: "flex", gap: 2 }}>
                    <CategoryIcon icon={category.icon} />
                    {category.name}
                  </Typography>
                ),
              }))}
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
            <Stack direction="row" gap={1}>
              <TextField
                type="date"
                fullWidth
                label={t("dateFrom")}
                sx={{ colorScheme: "dark" }}
                slotProps={{ inputLabel: { shrink: true } }}
                value={dateFrom}
                onChange={(event) => dispatch(setDateFrom(event.target.value))}
              />
              <TextField
                type="date"
                fullWidth
                label={t("dateTo")}
                sx={{ colorScheme: "dark" }}
                slotProps={{ inputLabel: { shrink: true } }}
                value={dateTo}
                onChange={(event) => dispatch(setDateTo(event.target.value))}
              />
            </Stack>
            <Stack direction="row" gap={1}>
              <AmountTextField
                label={t("amountFrom")}
                defaultValue={amountFrom}
                myCurrencyInputProps={{
                  onValueChange: (value) => debouncedSetAmountFrom(Number(value || 0)),
                }}
              />
              <AmountTextField
                label={t("amountTo")}
                defaultValue={amountTo}
                myCurrencyInputProps={{
                  onValueChange: (value) => debouncedSetAmountTo(Number(value || 0)),
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(resetFilters())}>{t("clear")}</Button>
          <Button variant="contained" onClick={() => dispatch(closeDialog())}>
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExpenseFilterDialog;
