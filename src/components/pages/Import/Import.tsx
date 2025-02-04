import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import VisuallyHiddenInput from "@src/components/atoms/VisuallyHiddenInput";
import { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import { TableType } from "@src/utils/types.ts";
import { containsAll } from "@src/utils/functions.ts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import supabase from "@src/utils/supabase.ts";
import { useAppDispatch } from "@src/store/store.ts";
import { showFeedback } from "@src/store/FeedbackSlice.ts";
import CategoryIcon from "@src/components/atoms/CategoryIcon";

type ParseType = Record<string, string>;

function getTable(fields: string[]): TableType | null {
  if (containsAll(fields, ["type", "category", "date", "amount"])) return "expenses";
  if (containsAll(fields, ["name", "icon", "type"])) return "categories";
  if (containsAll(fields, ["name"])) return "accounts";
  if (containsAll(fields, ["person", "amount"])) return "debts";
  return null;
}

function Import() {
  const { t } = useTranslation("Import");
  const dispatch = useAppDispatch();
  const [parseResult, setParseResult] = useState<Papa.ParseResult<ParseType>>();
  const table = parseResult?.meta.fields ? getTable(parseResult.meta.fields) : null;

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;
    Papa.parse<ParseType>(uploadedFile, {
      header: true,
      dynamicTyping: (field) => field !== "description",
      complete: (results) => setParseResult(results),
    });
  };

  const getFields = (allFields?: string[]) => {
    if (!allFields) return [];
    return allFields.filter((field) => !["id", "user_id", "created_at"].includes(field));
  };

  const onImport = async () => {
    if (table === null || !parseResult?.data) return;
    const { error } = await supabase.from(table).upsert(parseResult?.data);
    if (error) dispatch(showFeedback({ message: "Import failed", type: "error" }));
    else dispatch(showFeedback({ message: "Import success", type: "success" }));
  };

  return (
    <Stack sx={{ p: 2, gap: 1 }}>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ alignSelf: "center" }}>
        {t("uploadButton")}
        <VisuallyHiddenInput type="file" onChange={onFileUpload} />
      </Button>
      {parseResult && table ? (
        <Button onClick={onImport}>{t("importButton", { amount: parseResult.data.length, table })}</Button>
      ) : null}
      {parseResult ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {getFields(parseResult.meta.fields).map((field) => (
                  <TableCell key={field}>{field}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {parseResult.data.map((item) => (
                <TableRow key={JSON.stringify(item)}>
                  {getFields(parseResult.meta.fields).map((field) => (
                    <TableCell key={`${JSON.stringify(item)}-${field}`}>
                      {field === "icon" ? <CategoryIcon icon={item[field]} /> : item[field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Stack>
  );
}

export default Import;
