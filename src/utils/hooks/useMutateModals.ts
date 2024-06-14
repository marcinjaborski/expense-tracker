import { useMemo, useState } from "react";

import { useModalContext } from "@/utils/context/ModalContext";
import { getModal } from "@/utils/functions";
import { CONFIRM_MODAL } from "@/utils/ids";

export function useMutateModals(modalId: string) {
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const contextValue = useMemo<ReturnType<typeof useModalContext>>(
    () => ({
      showCreateModal: () => {
        setUpdateId(null);
        getModal(modalId).showModal();
      },
      showUpdateModal: (id) => {
        setUpdateId(id);
        getModal(modalId).showModal();
      },
      showDeleteModal: (id) => {
        setDeleteId(id);
        getModal(CONFIRM_MODAL).showModal();
      },
    }),
    [modalId],
  );

  return { contextValue, updateId, deleteId };
}
