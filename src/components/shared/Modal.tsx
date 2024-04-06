import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren & {
  id: string;
  title: string;
  action?: (formData: FormData) => void;
};

export function Modal({ id, title, action = undefined, children }: ModalProps) {
  const t = useTranslations("Shared");

  const ContentTag = !action ? "div" : "form";

  return (
    <dialog id={id} className="modal">
      <ContentTag action={action} className="modal-box flex flex-col">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        {children}
      </ContentTag>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">{t("close")}</button>
      </form>
    </dialog>
  );
}
