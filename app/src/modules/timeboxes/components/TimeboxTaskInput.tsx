import type { ComboBoxProps } from "@react-types/combobox";
import * as React from "react";
import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";

import { ListBox } from "@/components/ListBox";
import { Popover } from "@/components/Popover";

export { Item, Section } from "react-stately";

export function TimeboxTaskInput<T extends object>(props: ComboBoxProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const popoverRef = React.useRef(null);

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
      <label {...labelProps} className="font-medium block text-sm text-gray-700 text-left">
        {props.label}
      </label>
      <div className={`relative flex inline-flex flex-row rounded-md overflow-hidden`}>
        <input {...inputProps} ref={inputRef} className="outline-none py-1 w-full" placeholder="Task / Title" />
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
