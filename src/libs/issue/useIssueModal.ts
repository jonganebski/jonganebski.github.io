import type { IssueModalOptions } from './@types';

export function useIssueModal() {
  const openIssueModal = inject<(options: IssueModalOptions) => void>('OPEN_ISSUE_MODAL');
  if (!openIssueModal) throw Error('Did you wrap you parent component with IssueModalProvider?');
  return { openIssueModal };
}
