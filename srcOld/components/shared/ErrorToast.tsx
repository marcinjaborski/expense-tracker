"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/functions";

type ErrorToastProps = {
  message: string;
  show: boolean;
};

export function ErrorToast({ message, show }: ErrorToastProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    setVisible(show);
    if (show) {
      timeout = setTimeout(() => setVisible(false), 3000);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <div className={cn("toast toast-center toast-top", { hidden: !visible })}>
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
}
