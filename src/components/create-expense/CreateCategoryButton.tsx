"use client";

import { LuPlus } from "react-icons/lu";

import { getModal } from "@/utils/functions";

export function CreateCategoryButton() {
  return (
    <button
      type="button"
      className="btn btn-square"
      aria-label="Create category"
      onClick={() => getModal("create_category_modal").showModal()}
    >
      <LuPlus className="text-xl" />
    </button>
  );
}
