import type { Case } from '../../lib/Case';
import { PopupAlignmentType } from './PopupAlignmentType';

export type PopupHorizontalStyle = {
  left: string;
  transform: string;
};

export type PopupVerticalStyle = {
  top: string | undefined;
  bottom: string | undefined;
  transform: string;
};

function calcHorizontalAlignment(align: Case<typeof PopupAlignmentType>): PopupHorizontalStyle {
  switch (align) {
    case PopupAlignmentType.OUTER_START:
      return {
        left: '0%',
        transform: 'translateX(-100%)',
      };
    case PopupAlignmentType.START:
      return {
        left: '0%',
        transform: 'translateX(0)',
      };
    case PopupAlignmentType.CENTER:
      return {
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case PopupAlignmentType.END:
      return {
        left: '100%',
        transform: 'translateX(-100%)',
      };
    case PopupAlignmentType.OUTER_END:
      return {
        left: '100%',
        transform: 'translateX(0)',
      };
  }
}

function calcVerticalAlignment(align: Case<typeof PopupAlignmentType>, parentDomRect: DOMRect): PopupVerticalStyle {
  switch (align) {
    case PopupAlignmentType.OUTER_START:
      return {
        top: undefined,
        bottom: `${parentDomRect.height}px`,
        transform: 'translateY(0)',
      };
    case PopupAlignmentType.START:
      return {
        top: '0',
        bottom: undefined,
        transform: 'translateY(0)',
      };
    case PopupAlignmentType.CENTER:
      return {
        top: '50%',
        bottom: undefined,
        transform: 'translateY(-50%)',
      };
    case PopupAlignmentType.END:
      return {
        top: undefined,
        bottom: '0',
        transform: 'translateY(0)',
      };
    case PopupAlignmentType.OUTER_END:
      return {
        top: `${parentDomRect.height}px`,
        bottom: undefined,
        transform: 'translateY(0)',
      };
  }
}

export function calcAlignment(horizontal: Case<typeof PopupAlignmentType>, vertical: Case<typeof PopupAlignmentType>, parentDomRect: DOMRect) {
  const horizontalStyle = calcHorizontalAlignment(horizontal);
  const verticalStyle = calcVerticalAlignment(vertical, parentDomRect);

  return {
    ...horizontalStyle,
    ...verticalStyle,
    transform: [horizontalStyle.transform, verticalStyle.transform].join(' '),
  };
}

export function autoAlignment(
  parentDomRect: DOMRect,
  popupContentDomRect: DOMRect,
  horizontalAlign: Case<typeof PopupAlignmentType>,
  verticalAlign: Case<typeof PopupAlignmentType>,
) {
  const newVerticalAlign = (() => {
    if (popupContentDomRect.top < 0) {
      return PopupAlignmentType.OUTER_END;
    }
    if (popupContentDomRect.top + popupContentDomRect.height > window.innerHeight) {
      return PopupAlignmentType.OUTER_START;
    }
    return verticalAlign;
  })();

  const newHorizontalAlign = (() => {
    if (popupContentDomRect.left < 0) {
      return PopupAlignmentType.OUTER_END;
    }
    if (popupContentDomRect.left + popupContentDomRect.width > window.innerWidth) {
      return PopupAlignmentType.OUTER_START;
    }
    return horizontalAlign;
  })();

  return calcAlignment(newHorizontalAlign, newVerticalAlign, parentDomRect);
}
