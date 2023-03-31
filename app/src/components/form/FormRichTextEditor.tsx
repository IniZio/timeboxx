import { Control, FieldValues, Path, useController } from "react-hook-form";

import { RichTextEditor } from "@/components/RichTextEditor";

export interface FormRichTextEditorProps<TFV extends FieldValues> {
  name: Path<TFV>;
  control: Control<TFV>;
}

export function FormRichTextEditor<T extends FieldValues>({ name, control }: FormRichTextEditorProps<T>) {
  const { field } = useController({
    control,
    name,
    shouldUnregister: true,
  });

  return <RichTextEditor initialValue={field.value} onChange={field.onChange} />;
}
