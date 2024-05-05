"use client";

import { PostgrestError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

import { containsAll } from "@/utils/functions";
import { createClient } from "@/utils/supabase/client";
import { DatabaseTable } from "@/utils/types";

type ParseType = Record<string, string>;

function getTable(fields: string[]): DatabaseTable | null {
  if (containsAll(fields, ["type", "category", "date", "amount"])) return "expenses";
  if (containsAll(fields, ["name", "icon", "type"])) return "categories";
  if (containsAll(fields, ["name"])) return "accounts";
  if (containsAll(fields, ["person", "amount"])) return "debts";
  return null;
}

export function ImportClient() {
  const t = useTranslations("Import");
  const [parseResult, setParseResult] = useState<Papa.ParseResult<ParseType>>();
  const [importError, setImportError] = useState<PostgrestError | null>(null);
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

  const onImport = async () => {
    if (table === null || !parseResult?.data) return;
    const supabase = createClient();
    const { error } = await supabase.from(table).upsert(parseResult?.data);
    setImportError(error);
  };

  return (
    <>
      <input type="file" className="file-input w-full max-w-xs" onChange={onFileUpload} />
      {parseResult ? (
        <button type="button" className="btn btn-primary" onClick={onImport}>
          {t("importButton", { amount: parseResult.data.length, table })}
        </button>
      ) : null}
      {importError ? (
        <div role="alert" className="alert alert-error flex">
          <FaRegCircleXmark className="text-4xl" />
          <span>{t("importError")}</span>
        </div>
      ) : null}
      <div className="w-[calc(100vw-0.75rem)] overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>{parseResult?.meta.fields?.map((field) => <th key={field}>{field}</th>)}</tr>
          </thead>
          <tbody>
            {parseResult?.data.map((item) => (
              <tr key={JSON.stringify(item)}>
                {parseResult?.meta.fields?.map((field) => (
                  <td key={`${JSON.stringify(item)}-${field}`}>{item[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
