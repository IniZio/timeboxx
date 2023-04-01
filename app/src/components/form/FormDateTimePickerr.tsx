import { Control, FieldValues, Path, useController } from "react-hook-form";

import { DateTimePicker, DateTimePickerProps } from "@/components/DateTimePicker";

export interface FormDateTimePickerProps<TFV extends FieldValues> extends DateTimePickerProps {
  name: Path<TFV>;
  control: Control<TFV>;
}

export function FormDateTimePicker<T extends FieldValues>({ name, control, ...props }: FormDateTimePickerProps<T>) {
  const { field } = useController({
    control,
    name,
  });

  return <DateTimePicker {...field} {...props} />;
}
