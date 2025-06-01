import { marked } from 'marked';
import TurndownService from 'turndown';

export const configureMarked = () => {
  marked.setOptions({
    gfm: true,
    breaks: true,
  });
};

export const createTurndownService = () => {
  const turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
    preformattedCode: true,
    br: '  \n',
  });

  // Add rule for highlights with colors
  turndownService.addRule('highlights', {
    filter: (node): boolean => {
      return (
        node.nodeName === 'MARK' &&
        node instanceof HTMLElement &&
        node.hasAttribute('style')
      );
    },
    replacement: (content: string, node: Node): string => {
      if (node instanceof HTMLElement) {
        const styleAttr = node.getAttribute('style') || '';
        const regex = /background-color: ([^;]+)/;
        const regexResult = regex.exec(styleAttr);
        const color = regexResult ? regexResult[1] : '';

        return `<mark style="background-color: ${color}">${content}</mark>`;
      }
      return content;
    },
  });
  turndownService.addRule('underline', {
    filter: (node): boolean => {
      return node.nodeName === 'U';
    },
    replacement: (content: string): string => {
      return `<u>${content}</u>`;
    },
  });

  return turndownService;
};

export const turndownService = createTurndownService();

configureMarked();
