import { Inquiry } from './@types';

export function formatCommit({ emoji, scope, title, description }: Inquiry) {
  return `${emoji}(${scope}) ${title}${description ? `\n\n${description}` : ''}`;
}
