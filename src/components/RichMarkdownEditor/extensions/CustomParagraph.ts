import Paragraph from '@tiptap/extension-paragraph';

const CustomParagraph = Paragraph.extend({
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Enter: ({ editor }) => {
        editor.commands.splitBlock();
        return true;
      },
    };
  },
});

export default CustomParagraph;
