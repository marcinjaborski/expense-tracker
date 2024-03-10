"use client";

import { CreateCategoryButton } from "@/components/create-expense/CreateCategoryButton";
import { useCategories } from "@/repository/useCategories";
import { ExpenseType } from "@/utils/types";

import { DynamicIcon } from "../shared";

type CategoryCarouselProps = {
  type: ExpenseType;
};

export function CategoryCarousel({ type }: CategoryCarouselProps) {
  const { data: categories } = useCategories(type);

  return (
    <div className="flex gap-2">
      <div className="flex max-w-[60vw] gap-2 overflow-x-auto">
        {categories?.map((category, index) => (
          <label key={category.id} className="btn has-[:checked]:btn-primary">
            <DynamicIcon icon={category.icon} />
            {category.name}
            <input type="radio" className=" hidden" name="category" defaultChecked={index === 0} value={category.id} />
          </label>
        ))}
      </div>
      <CreateCategoryButton />
    </div>
  );
}
