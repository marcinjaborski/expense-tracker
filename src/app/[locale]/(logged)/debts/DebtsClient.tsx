"use client";

import { groupBy } from "lodash";
import { useTranslations } from "next-intl";
import { Fragment, useRef, useState } from "react";

import { ConfirmModal, CreateButton } from "@/components";
import { CreateDebtModal, DebtCard } from "@/components/debts";
import { FormWrap } from "@/components/shared/FormWrap";
import { useDebts } from "@/repository/useDebts";
import { useDeleteDebt } from "@/repository/useDeleteDebt";
import { ModalContext } from "@/utils/context/ModalContext";
import { notNull } from "@/utils/functions";
import { useMutateModals } from "@/utils/hooks";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";
import { useObserver } from "@/utils/hooks/useObserver";
import { CREATE_DEBT_MODAL } from "@/utils/ids";

export function DebtsClient() {
  const t = useTranslations("Debts");
  const [showSettled, setShowSettled] = useState(false);
  const { data, fetchNextPage } = useDebts(showSettled);
  const { mutate: deleteDebt } = useDeleteDebt();
  const debts = data?.pages.flat().filter(notNull) ?? [];
  const formatCurrency = useFormatCurrency();
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const { contextValue, deleteId, updateId } = useMutateModals(CREATE_DEBT_MODAL);

  const debtToUpdate = debts?.find(({ id }) => id === updateId);
  const groupedDebts = groupBy(debts, "person");

  return (
    <ModalContext.Provider value={contextValue}>
      <div className="flex w-full flex-col gap-2">
        <div className="form-control self-start">
          <label className="label flex cursor-pointer gap-1">
            <span className="label-text text-lg">{t("showSettled")}</span>
            <input
              type="checkbox"
              checked={showSettled}
              className="checkbox"
              onChange={(e) => setShowSettled(e.target.checked)}
            />
          </label>
        </div>
        {Object.entries(groupedDebts).map(([person, personDebts]) => (
          <Fragment key={person}>
            <div className="mt-2 text-xl font-bold">
              {person} -{" "}
              {formatCurrency(personDebts.reduce((sum, { amount, settled }) => (settled ? sum : sum + amount), 0))}
            </div>
            {personDebts.map((debt) => (
              <DebtCard key={debt.id} debt={debt} />
            ))}
          </Fragment>
        ))}
        <div ref={observerTarget} />
      </div>
      <CreateButton label={t("createDebt")} createFn={contextValue.showCreateModal} />
      <FormWrap<typeof CreateDebtModal> Form={CreateDebtModal} debt={debtToUpdate} />
      <ConfirmModal title={t("confirmDelete")} onConfirm={() => deleteId && deleteDebt(deleteId)} />
    </ModalContext.Provider>
  );
}
