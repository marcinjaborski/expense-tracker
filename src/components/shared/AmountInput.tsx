"use client";

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

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <CurrencyInput
          className="grow"
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          decimalsLimit={2}
          intlConfig={{ locale, currency: defaultCurrency }}
        />
        <LuCoins />
      </label>
      {errorMessage ? <span className="label-text-alt pl-2 pt-2 text-error">{errorMessage}</span> : null}
    </>
  );
}
