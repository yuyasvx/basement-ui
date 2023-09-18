import { Dispatch, ReactNode, RefObject, SetStateAction, useCallback, useRef } from 'react';
import { Tooltip2InnerProps } from '../component/tooltip/Tooltip';

export function useTooltipContextInitializer() {
  const contents = useRef(
    {} as Record<number, (Tooltip2InnerProps & { content: ReactNode; ref: RefObject<HTMLDivElement> }) | undefined>
  );
  const dispatchers = useRef({} as Record<string, Dispatch<SetStateAction<unknown>>>);
  const add = useCallback((props: Tooltip2InnerProps & { content: ReactNode; ref: RefObject<HTMLDivElement> }) => {
    const keys = Object.keys(contents.current);
    const maxNum = keys.length === 0 ? 0 : Math.max(...Object.keys(contents.current).map(k => Number(k)));
    // TODO 強制上書きにしている
    contents.current = { [maxNum + 1]: props };
    Object.values(dispatchers.current).forEach(d => {
      d(contents.current);
    });
    return maxNum + 1;
  }, []);

  const remove = useCallback((id: number) => {
    if (contents.current[id] == null) {
      return false;
    }
    contents.current[id] = undefined;
    contents.current = { ...contents.current };
    Object.values(dispatchers.current).forEach(d => {
      d(contents.current);
    });
    return true;
  }, []);

  return {
    contents,
    dispatchers,
    add,
    remove
  };
}
