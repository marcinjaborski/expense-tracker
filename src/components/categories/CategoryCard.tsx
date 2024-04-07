import { useTranslations } from "next-intl";
import { LuPencil, LuTrash } from "react-icons/lu";

import { DynamicIcon } from "@/components";
import { getModal } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { CONFIRM_MODAL, CREATE_CATEGORY_MODAL } from "@/utils/ids";
import { DELETE_ID, UPDATE_ID } from "@/utils/searchParams";
import { Tables } from "@/utils/supabase/database.types";

type CategoryCardProps = {
  category: Tables<"categories">;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations("Categories");
  const updateParams = useUpdateParams();

  const onEdit = () => {
    getModal(CREATE_CATEGORY_MODAL).showModal();
    updateParams(UPDATE_ID, String(category.id));
  };

  const onDelete = () => {
    getModal(CONFIRM_MODAL).showModal();
    updateParams(DELETE_ID, String(category.id));
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-row items-center p-5">
        <DynamicIcon icon={category.icon} className="text-xl" />
        <div className="flex-1">{category.name}</div>
        <div className="flex gap-2 [&_svg]:text-xl">
          <button className="btn" type="button" aria-label={t("edit")} onClick={onEdit}>
            <LuPencil />
          </button>
          <button className="btn" type="button" aria-label={t("delete")} onClick={onDelete}>
            <LuTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
