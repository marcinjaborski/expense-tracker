import { LuPlus } from "react-icons/lu";

type CreateButtonProps = {
  label: string;
  createFn: () => void;
};

export function CreateButton({ label, createFn }: CreateButtonProps) {
  return (
    <button
      className="btn btn-circle btn-primary fixed bottom-20 [&_svg]:text-xl"
      type="button"
      onClick={createFn}
      aria-label={label}
    >
      <LuPlus />
    </button>
  );
}
