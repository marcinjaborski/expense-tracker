"use client";
import { getModal } from "@/utils/functions";
import { LuPlus } from "react-icons/lu";

export function CreateCategoryButton() {
  return (
    <button type="button" className="btn btn-square" onClick={() => getModal("create_category_modal").showModal()}>
      <LuPlus className="text-xl" />
    </button>
  );
}
