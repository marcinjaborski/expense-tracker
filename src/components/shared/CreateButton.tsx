"use client";

import { LuPlus } from "react-icons/lu";

import { createButtonStyles } from "@/utils/constants";
import { getModal } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { UPDATE_ID } from "@/utils/searchParams";

type CreateButtonProps = {
  label: string;
  modal: string;
};

export function CreateButton({ label, modal }: CreateButtonProps) {
  const updateParams = useUpdateParams();

  const onClick = () => {
    updateParams(UPDATE_ID, null);
    getModal(modal).showModal();
  };

  return (
    <button className={createButtonStyles} type="button" onClick={onClick} aria-label={label}>
      <LuPlus />
    </button>
  );
}
