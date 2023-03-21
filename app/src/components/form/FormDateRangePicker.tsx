import { Control, FieldValues, Path, useController } from "react-hook-form";

import { DateRangePicker } from "@/components/DateRangePicker";

export interface FormDateRangePickerProps<TFV extends FieldValues> {
  name: Path<TFV>;
  control: Control<TFV>;
}

export function FormDateRangePicker<T extends FieldValues>({ name, control }: FormDateRangePickerProps<T>) {
  const { field } = useController({
    control,
    name,
  });

  return <DateRangePicker {...field} />;
}
