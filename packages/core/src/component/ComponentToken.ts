export const ComponentToken = {
  MODAL_FRAME: 'bmui-modalframe',
  modalFrame: {
    BACKDROP: 'bmui-modalframe--backdrop',
    CONTAINER: 'bmui-modalframe--container',
    CONTENT: 'bmui-modalframe--content',
  },
  OVERLAY: 'bmui-overlay',
  CARD: 'bmui-card',
  ALIGNMENT: 'bmui-alignment',
  POPUP: 'bmui-popup',
  popup: {
    CONTENT: 'bmui-popup--content',
  },
  DROP_SHADOW: 'bmui-dropshadow',
  SCROLLABLE_VIEW: 'bmui-scrollableview',
  scrollableView: {
    CONTENT: 'bmui-scrollableview--content',
  },
  SCROLL_BAR: 'bmui-scrollbar',
  scrollBar: {
    background: 'bmui-scrollbar--background',
    knob: 'bmui-scrollbar--knob',
    innerKnob: 'bmui-scrollbar--inner-knob',
  },
} as const;
