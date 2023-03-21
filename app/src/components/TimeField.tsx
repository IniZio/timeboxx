import { TimeValue } from "@react-types/datepicker";
import { useRef } from "react";
import { AriaTimeFieldProps, useDateField, useDateSegment, useLocale } from "react-aria";
import { DateFieldState, DateSegment, useTimeFieldState } from "react-stately";

export type TimeFieldProps = AriaTimeFieldProps<TimeValue>;

export function TimeField(props: TimeFieldProps) {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div className="flex flex-col items-start">
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className="inline-flex px-0.5">
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && <span aria-hidden="true">🚫</span>}
      </div>
    </div>
  );
}

function DateSegment({ segment, state }: { segment: DateSegment; state: DateFieldState }) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div {...segmentProps} ref={ref} className={`segment ${segment.isPlaceholder ? "placeholder" : ""}`}>
      {segment.text}
    </div>
  );
}
