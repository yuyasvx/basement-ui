import { useRef } from 'react';

/**
 * コンポーネントの初回読み込み時だけ実行するフック。useOnceが呼ばれた瞬間動き、
 * @param callback
 */
export function useOnce(callback: () => void) {
  const ran = useRef(false);
  if (ran.current) {
    return;
  }
  callback();
  ran.current = true;
}
