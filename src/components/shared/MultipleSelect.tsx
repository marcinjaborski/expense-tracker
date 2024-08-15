"use client";

import Select, { GroupBase, Props } from "react-select";

type MultipleSelectProps = {
  title: string;
};

export function MultipleSelect<Option, Group extends GroupBase<Option> = GroupBase<Option>>({
  title,
  ...selectProps
}: MultipleSelectProps & Props<Option, true, Group>) {
  return (
    <label className="form-control w-full">
      <div className="label">{title}</div>
      <Select
        isMulti
        unstyled
        className="input input-bordered h-fit grow py-1"
        classNames={{
          menu: () => "bg-neutral rounded py-1",
          option: () => "p-1 bg-base-200",
          multiValue: () => "bg-neutral rounded p-1",
          valueContainer: () => "gap-2",
        }}
        {...selectProps}
      />
    </label>
  );
}
