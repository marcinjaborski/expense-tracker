import { useTranslations } from "next-intl";

import { CONFIRM_MODAL } from "@/utils/ids";

import { Portal } from "./Portal";

type ConfirmModalProps = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ title, onConfirm, onCancel }: ConfirmModalProps) {
  const t = useTranslations("Shared");

  return (
    <Portal>
      <dialog id={CONFIRM_MODAL} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title}</h3>
          <form method="dialog">
            <div className="modal-action">
              <button className="btn" type="submit" onClick={onCancel}>
                {t("cancel")}
              </button>
              <button className="btn" type="submit" onClick={onConfirm}>
                {t("confirm")}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit" onClick={onCancel}>
            {t("cancel")}
          </button>
        </form>
      </dialog>
    </Portal>
  );
}
