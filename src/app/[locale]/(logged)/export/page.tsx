import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LuDownload } from "react-icons/lu";

import { PageHeader } from "@/components";
import { LocaleParams } from "@/utils/params";
import { getCounts } from "@/utils/serverActions";

export default async function Export({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: "Import" });
  const counts = await getCounts();

  return (
    <div className="relative flex w-full flex-col items-center gap-2 self-stretch">
      <PageHeader title={t("exportTitle")} />
      {counts.map(({ table, count }) => (
        <div key={table} className="card w-full bg-base-100 shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <span>
              {t(table)} - {count || 0}
            </span>
            <Link
              href={{
                pathname: `/api/export`,
                query: {
                  table,
                },
              }}
              type="button"
              className="btn btn-square text-xl"
              aria-label={t("download")}
            >
              <LuDownload />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
