import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { TooltipRenderer } from '../component/tooltip/Tooltip';
import { useScrollLockContextInitializer } from './ScriollLockContext';
import { useTooltipContextInitializer } from './TooltipContext';

function useContextInitializer() {
  return {
    tooltip: useTooltipContextInitializer(),
    scrollLock: useScrollLockContextInitializer()
  };
}

const context = createContext({} as ReturnType<typeof useContextInitializer>);

export const BasementUIProvider: FC<PropsWithChildren> = (props) => {
  const defaults = useContextInitializer();
  return (
    <context.Provider value={defaults}>
      {props.children}
      <TooltipRenderer />
    </context.Provider>
  );
};

export function useBasementUIContext() {
  return useContext(context);
}
export type BasementUIContext = ReturnType<typeof useBasementUIContext>;
