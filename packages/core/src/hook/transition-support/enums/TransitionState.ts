/**
 * @internal
 */
export const TransitionState = {
  /*表示途中*/
  OPENING: 'opening',
  /*表示済み*/
  OPEN: 'open',
  /*非表示途中*/
  CLOSING: 'closing',
  /*非表示*/
  CLOSED: 'closed',
} as const;
