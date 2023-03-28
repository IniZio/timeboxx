import { useRef } from "react";
import type { AriaDialogProps } from "react-aria";
import { useDialog } from "react-aria";

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Dialog({ title, children, className, ...props }: DialogProps) {
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} className={className}>
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
