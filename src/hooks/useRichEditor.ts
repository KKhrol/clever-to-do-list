import Code from '@tiptap/extension-code';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

import CustomParagraph from '@components/RichMarkdownEditor/extensions/CustomParagraph';

import { turndownService } from '../utils/configure-markdown';

interface UseRichEditorProps {
  value?: string;
  onChange: (markdown: string) => void;
  maxHeight?: string;
}

export const useRichEditor = ({
  value,
  onChange,
  maxHeight,
}: UseRichEditorProps) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        code: false,
        history: {
          depth: 100,
        },
      }),
      CustomParagraph,
      Underline,
      Code,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'highlight-mark',
        },
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      if (isInitialLoad) return;

      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);

      onChange(markdown);
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });
  useEffect(() => {
    if (!editor || value === undefined) return;

    const isFirstLoad = isInitialLoad;
    const html = marked.parse(value || '');

    if (isFirstLoad || editor.isEmpty) {
      editor.commands.setContent(html, false);
      setIsInitialLoad(false);
    }
  }, [value, editor, isInitialLoad]);

  useEffect(() => {
    if (!document) return;

    const styleId = 'rich-editor-styles';

    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = `
          .ProseMirror {
            min-height: 100px;
             ${maxHeight ? `max-height: ${maxHeight};` : ''}
            ${maxHeight ? 'overflow-y: auto;' : ''}
            outline: none;
          }
          .ProseMirror p {
            margin: 0 0 0.5em 0;
            min-height: 1em;
          }
          /* Make empty paragraphs visible */
          .ProseMirror p:empty::before {
            content: "\\200B"; /* Zero-width space */
            pointer-events: none;
          }
          /* Ensure paragraphs are properly displayed */
          .ProseMirror p {
            display: block;
          }
          /* Style for highlights */
          .ProseMirror mark[style*='background-color'] {
            padding: 0 2px;
            border-radius: 2px;
          }
          .highlight-mark {
            padding: 0 2px;
            border-radius: 2px;
          }`;
    document.head.appendChild(styleElement);

    return () => {
      styleElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return editor;
};
