import { useTranslations } from "next-intl";
import { LuPencil, LuTrash } from "react-icons/lu";

import { DynamicIcon } from "@/components";
import { useModalContext } from "@/utils/context/ModalContext";
import { Tables } from "@/utils/supabase/database.types";

type CategoryCardProps = {
  category: Tables<"categories">;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations("Categories");
  const { showUpdateModal, showDeleteModal } = useModalContext();

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-row items-center p-5">
        <DynamicIcon icon={category.icon} className="text-xl" />
        <div className="flex-1">{category.name}</div>
        <div className="flex gap-2 [&_svg]:text-xl">
          <button className="btn" type="button" aria-label={t("edit")} onClick={() => showUpdateModal(category.id)}>
            <LuPencil />
          </button>
          <button className="btn" type="button" aria-label={t("delete")} onClick={() => showDeleteModal(category.id)}>
            <LuTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
