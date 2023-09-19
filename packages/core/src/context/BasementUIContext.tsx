import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext
} from 'react';
import { TooltipInnerProps, TooltipRenderer } from '../component/tooltip/Tooltip';
import { useTooltipContextInitializer } from './TooltipContext';

function useContextInitializer() {
  return {
    tooltip: useTooltipContextInitializer()
  };
}

const context = createContext({
  tooltip: {
    contents: {} as MutableRefObject<
      Record<number, (TooltipInnerProps & { content: ReactNode; ref: RefObject<HTMLDivElement> }) | undefined>
    >,
    dispatchers: {} as MutableRefObject<Record<string, Dispatch<SetStateAction<unknown>> | undefined>>,
    add: (content: TooltipInnerProps & { content: ReactNode; ref: RefObject<HTMLDivElement> }) => 0 as number,
    remove: (id: number) => false as boolean
  }
});

export const BasementUIProvider: FC<PropsWithChildren> = props => {
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
