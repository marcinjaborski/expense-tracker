"use client";

import { nanoid } from "nanoid";
import { ComponentProps, ElementType, JSXElementConstructor, useState } from "react";

type FormWrapProps = {
  Form: ElementType;
};

export function FormWrap<T extends JSXElementConstructor<any>>({
  Form,
  ...props
}: FormWrapProps & Omit<ComponentProps<T>, "onReset">) {
  const [formKey, setFormKey] = useState(nanoid());

  const updateFormKey = () => setFormKey(nanoid());

  return <Form key={formKey} onReset={updateFormKey} {...props} />;
}
