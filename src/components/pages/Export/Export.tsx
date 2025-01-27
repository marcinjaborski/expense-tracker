import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import useCounts from "@src/repository/useCounts.ts";
import { useTranslation } from "react-i18next";
import DownloadIcon from "@mui/icons-material/Download";
import { Table } from "@src/utils/types.ts";
import supabase from "@src/utils/supabase.ts";
import { downloadFile } from "@src/utils/functions.ts";

function Export() {
  const { t } = useTranslation("Import");
  const { data: counts } = useCounts();

  const exportTable = async (table: Table) => {
    const { data: csv } = await supabase.from(table).select().csv();
    if (!csv) return;
    downloadFile(csv, `${table}.csv`, "application/text");
  };

  return (
    <List>
      {counts?.map(({ table, count }) => (
        <ListItem
          key={table}
          secondaryAction={
            <IconButton onClick={() => exportTable(table)}>
              <DownloadIcon />
            </IconButton>
          }
        >
          <ListItemText>
            {t(table)} - {count}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default Export;
