import { ComboBox, SpectrumComboBoxProps } from "@adobe/react-spectrum";
import { Key, useCallback } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormComboBoxProps<TFV extends FieldValues, TC> extends SpectrumComboBoxProps<TC> {
  name: Path<TFV>;
  control: Control<TFV>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormComboBox<TFV extends FieldValues, TC>({ name, control, ...rest }: FormComboBoxProps<TFV, TC>) {
  const { field } = useController({
    control,
    name,
  });

  rest.children;

  const handleInputChange = useCallback(
    (input: string) => {
      field.onChange({ ...field.value, input });
    },
    [field],
  );

  const handlSelectionChange = useCallback(
    (key: Key) => {
      field.onChange({ ...field.value, key });
    },
    [field],
  );

  return (
    <ComboBox
      ref={field.ref}
      inputValue={field.value.input}
      selectedKey={field.value.key}
      onInputChange={handleInputChange}
      onSelectionChange={handlSelectionChange}
      {...rest}
    />
  );
}
