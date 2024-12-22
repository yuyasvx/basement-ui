import { ComponentToken } from '../../component/ComponentToken';

const internalState = {
  initialized: false,
};

export function useOverlayInitializer() {
  const initialized = internalState.initialized;
  if (document.getElementById(ComponentToken.OVERLAY) != null) {
    internalState.initialized = true;
    return { initialized, overlayElementId: ComponentToken.OVERLAY };
  }

  const element = document.createElement('div');
  element.id = ComponentToken.OVERLAY;
  document.body.appendChild(element);
  internalState.initialized = true;

  return { initialized, overlayElementId: ComponentToken.OVERLAY };
}
