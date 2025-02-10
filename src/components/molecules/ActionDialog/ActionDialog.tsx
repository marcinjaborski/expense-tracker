import { ComponentProps, ReactNode } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import BottomFab from "@src/components/atoms/BottomFab";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  fabProps: ComponentProps<typeof Fab>;
  title: string;
  content: ReactNode;
  cancelButton?: boolean;
  submitText: string;
  submitButton?: boolean;
  dialogProps?: Omit<ComponentProps<typeof Dialog>, "open">;
};

function ActionDialog({
  open,
  setOpen,
  fabProps,
  title,
  content,
  cancelButton = true,
  submitText,
  submitButton = true,
  dialogProps,
}: Props) {
  const { t } = useTranslation("Shared");

  return (
    <>
      <BottomFab {...fabProps} onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} {...dialogProps}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            {content}
          </Stack>
        </DialogContent>
        <DialogActions>
          {cancelButton ? <Button onClick={() => setOpen(false)}>{t("cancel")}</Button> : null}
          {submitButton ? (
            <Button variant="contained" type="submit">
              {submitText ?? t("confirm")}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ActionDialog;
