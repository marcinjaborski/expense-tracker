import { Tables } from "@/utils/supabase/database.types";

import { CategoryCard } from "./CategoryCard";

type CategorySectionProps = {
  title: string;
  categories?: Tables<"categories">[];
};

export function CategorySection({ title, categories = [] }: CategorySectionProps) {
  return (
    <>
      <div className="card sticky top-0 z-10 mt-6 w-[50%] bg-base-100 p-3 text-center text-xl shadow-xl">
        <h3>{title}</h3>
      </div>
      <div className="mt-6 flex h-full w-full flex-col gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}
