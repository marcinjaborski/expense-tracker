"use client";

import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { LuCoins } from "react-icons/lu";

import { defaultCurrency, defaultLocale } from "@/utils/constants";
import { cn } from "@/utils/functions";

type AmountInputProps = {
  placeholder: string;
  name: string;
  defaultValue?: number;
  errorMessage?: string;
  className?: string;
};

export function AmountInput({
  placeholder,
  name,
  defaultValue = undefined,
  errorMessage = "",
  className = "",
}: AmountInputProps) {
  const [value, setValue] = useState<number | "">(defaultValue || "");

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <label className={cn("input input-bordered flex items-center gap-2", className)}>
        <CurrencyInput
          className="grow"
          placeholder={placeholder}
          defaultValue={defaultValue}
          decimalsLimit={2}
          intlConfig={{ locale: defaultLocale, currency: defaultCurrency }}
          onValueChange={(newValue) => newValue && setValue(Number(newValue.replace(",", ".")))}
        />
        <LuCoins />
      </label>
      {errorMessage ? <span className="label-text-alt pl-2 pt-2 text-error">{errorMessage}</span> : null}
    </>
  );
}
