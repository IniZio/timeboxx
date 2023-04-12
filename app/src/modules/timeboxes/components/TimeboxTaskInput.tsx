import type { ComboBoxProps } from "@react-types/combobox";
import { Key, useCallback, useRef } from "react";
import { useComboBox, useFilter } from "react-aria";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useComboBoxState } from "react-stately";

import { ListBox } from "@/components/ListBox";
import { Popover } from "@/components/Popover";

export { Item, Section } from "react-stately";

export function TimeboxTaskInput(props: ComboBoxProps<{ id: Maybe<string>; title: Maybe<string> }>) {
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  return (
    <div className="flex-col inline-flex relative">
      <label {...labelProps} className="font-medium text-sm block text-gray-700 text-left">
        {props.label}
      </label>
      <div className={`relative flex inline-flex flex-row rounded-md overflow-hidden`}>
        <input
          {...inputProps}
          ref={inputRef}
          className="py-1 w-full outline-none bg-white"
          placeholder="Task / Title"
        />
      </div>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          isNonModal
          placement="bottom start"
          className="w-52"
        >
          <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
        </Popover>
      )}
    </div>
  );
}

export interface FormTimeboxTaskInputProps<TFV extends FieldValues>
  extends ComboBoxProps<{ id: Maybe<string>; title: Maybe<string> }> {
  name: Path<TFV>;
  control: Control<TFV>;
}

export function FormTimeboxTaskInput<TFV extends FieldValues>({
  control,
  name,
  ...props
}: FormTimeboxTaskInputProps<TFV>) {
  const { field } = useController({
    control,
    name,
  });

  const handleInputChange = useCallback(
    (title: string) => {
      field.onChange({ ...field.value, title });
    },
    [field],
  );

  const handlSelectionChange = useCallback(
    (id: Key) => {
      field.onChange({ ...field.value, id });
    },
    [field],
  );

  return (
    <TimeboxTaskInput
      inputValue={field.value.input}
      selectedKey={field.value.key}
      onInputChange={handleInputChange}
      onSelectionChange={handlSelectionChange}
      {...props}
    />
  );
}
