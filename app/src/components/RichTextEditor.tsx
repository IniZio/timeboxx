import "@blocknote/core/style.css";
import "./RichTextEditor.css";

import type { Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEffect, useRef } from "react";

export type RichTextValue = Block[] | undefined;

export interface RichTextEditorProps {
  initialValue?: RichTextValue;
  onChange?: (content: RichTextValue) => void;
}

export function RichTextEditor({ initialValue = [], onChange }: RichTextEditorProps) {
  const isInitialized = useRef(false);

  const editor = useBlockNote({
    onEditorContentChange: async (editor) => {
      if (!isInitialized.current) return;

      onChange?.(editor.topLevelBlocks);
    },
  });

  useEffect(() => {
    if (!editor || isInitialized.current) return;

    setTimeout(() => {
      editor.replaceBlocks(editor.topLevelBlocks, initialValue);
      isInitialized.current = true;
    });
  }, [editor, initialValue]);

  return <BlockNoteView editor={editor} />;
}
