import categoryIcon from "@src/utils/categoryIcon.ts";

type CategoryIconProps = {
  icon: string;
};

function CategoryIcon({ icon }: CategoryIconProps) {
  if (!(icon in categoryIcon)) return null;
  const Component = categoryIcon[icon as keyof typeof categoryIcon];
  return <Component />;
}

export default CategoryIcon;
