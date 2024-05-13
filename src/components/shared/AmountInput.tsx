"use client";

import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { LuCoins } from "react-icons/lu";

import { defaultCurrency } from "@/utils/constants";
import { useLocale } from "@/utils/hooks";

type AmountInputProps = {
  placeholder: string;
  name: string;
  defaultValue?: number;
  errorMessage?: string;
};

export function AmountInput({ placeholder, name, defaultValue = undefined, errorMessage = "" }: AmountInputProps) {
  const locale = useLocale();
  const [value, setValue] = useState<number | "">(defaultValue || "");

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <label className="input input-bordered flex items-center gap-2">
        <CurrencyInput
          className="grow"
          placeholder={placeholder}
          defaultValue={defaultValue}
          decimalsLimit={2}
          intlConfig={{ locale, currency: defaultCurrency }}
          onValueChange={(newValue) => newValue && setValue(Number(newValue))}
        />
        <LuCoins />
      </label>
      {errorMessage ? <span className="label-text-alt pl-2 pt-2 text-error">{errorMessage}</span> : null}
    </>
  );
}
