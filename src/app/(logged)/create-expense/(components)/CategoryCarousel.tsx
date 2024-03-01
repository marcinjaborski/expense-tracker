"use client";
import { CreateCategoryButton } from "@/app/(logged)/create-expense/(components)";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/utils/supabase/database.types";
import { ExpenseType } from "@/utils/types";
import { DynamicIcon } from "@/components";

type CategoryCarouselProps = {
  type: ExpenseType;
};

export function CategoryCarousel({ type }: CategoryCarouselProps) {
  const supabase = createClient();
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);

  useEffect(() => {
    supabase
      .from("categories")
      .select()
      .eq("type", type)
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }, [supabase, type]);

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
