const PREFIX = 'bmui' as const;

export const ComponentToken = {
  modalFrame: {
    INDEX: `${PREFIX}-modalframe`,
    BACKDROP: `${PREFIX}-modalframe--backdrop`,
    CONTAINER: `${PREFIX}-modalframe--container`,
    CONTENT: `${PREFIX}-modalframe--content`,
  },
  OVERLAY: `${PREFIX}-overlay`,
  CARD: `${PREFIX}-card`,
  ALIGNMENT: `${PREFIX}-alignment`,
  popup: {
    INDEX: `${PREFIX}-popup`,
    CONTENT: `${PREFIX}-popup--content`,
  },
  DROP_SHADOW: `${PREFIX}-dropshadow`,
  scrollableView: {
    INDEX: `${PREFIX}-scrollableview`,
    FRAME: `${PREFIX}-scrollableview--frame`,
    CONTENT: `${PREFIX}-scrollableview--content`,
  },
  scrollBar: {
    INDEX: `${PREFIX}-scrollbar`,
    background: `${PREFIX}-scrollbar--background`,
    knob: `${PREFIX}-scrollbar--knob`,
    innerKnob: `${PREFIX}-scrollbar--inner-knob`,
  },
} as const;
