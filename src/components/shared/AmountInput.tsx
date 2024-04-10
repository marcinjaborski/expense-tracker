import { LuCoins } from "react-icons/lu";

type AmountInputProps = {
  placeholder: string;
  name: string;
  defaultValue?: number;
  errorMessage?: string;
};

export function AmountInput({ placeholder, name, defaultValue = undefined, errorMessage = "" }: AmountInputProps) {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <input type="number" className="grow" placeholder={placeholder} name={name} defaultValue={defaultValue} />
        <LuCoins />
      </label>
      {errorMessage ? <span className="label-text-alt pl-2 pt-2 text-error">{errorMessage}</span> : null}
    </>
  );
}
