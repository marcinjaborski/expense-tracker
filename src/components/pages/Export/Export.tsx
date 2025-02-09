import { Button, IconButton, List, ListItem, ListItemText, Stack } from "@mui/material";
import useCounts from "@src/repository/useCounts.ts";
import { useTranslation } from "react-i18next";
import DownloadIcon from "@mui/icons-material/Download";
import { TableType } from "@src/utils/types.ts";
import supabase from "@src/utils/supabase.ts";
import { downloadFile } from "@src/utils/functions.ts";
import { useAppDispatch } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";
import { DateTime } from "luxon";
import { EXPORT_LIMIT } from "@src/utils/constants.ts";

function Export() {
  const { t } = useTranslation("Import");
  const { data: counts } = useCounts();
  const dispatch = useAppDispatch();

  const exportTable = async (table: TableType) => {
    if (!counts) return;
    const totalCount = counts.find((count) => count.table === table)?.count;
    if (!totalCount) return;
    for (let offset = 0; offset < totalCount; offset += EXPORT_LIMIT) {
      const { data: csv } = await supabase
        .from(table)
        .select()
        .range(offset, offset + EXPORT_LIMIT)
        .csv();
      if (!csv) {
        dispatch(showFeedback({ message: t("exportError"), type: "error" }));
        return;
      }
      const fileCounter = offset === 0 ? "" : `_${String(offset / EXPORT_LIMIT + 1)}`;
      downloadFile(csv, `${table}${fileCounter}_${DateTime.now().toFormat("dd_MM_yyyy")}.csv`, "application/text");
    }
  };

  const exportAllTables = async () => {
    counts?.forEach(({ table }) => exportTable(table));
  };

  return (
    <Stack sx={{ gap: 2 }}>
      <List>
        {counts?.map(({ table, count }) => (
          <ListItem
            key={table}
            secondaryAction={
              count ? (
                <IconButton onClick={() => exportTable(table)}>
                  <DownloadIcon />
                </IconButton>
              ) : null
            }
          >
            <ListItemText>
              {t(table)} - {count}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" sx={{ alignSelf: "center" }} startIcon={<DownloadIcon />} onClick={exportAllTables}>
        {t("exportAll")}
      </Button>
    </Stack>
  );
}

export default Export;
