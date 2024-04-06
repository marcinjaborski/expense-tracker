"use client";

import { nanoid } from "nanoid";
import { ElementType, useState } from "react";

type FormWrapProps = {
  Form: ElementType;
};

export function FormWrap({ Form }: FormWrapProps) {
  const [formKey, setFormKey] = useState(nanoid());

  const updateFormKey = () => setFormKey(nanoid());

  return <Form key={formKey} onReset={updateFormKey} />;
}
