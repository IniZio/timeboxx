import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";

export type ButtonProps = AriaButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const innerRef = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => innerRef.current!);

  const { buttonProps } = useButton(props, innerRef);
  const { children } = props;

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
