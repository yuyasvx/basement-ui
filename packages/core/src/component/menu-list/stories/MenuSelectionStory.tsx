import { FC, MouseEvent, createContext, useCallback, useContext, useRef, useState } from 'react';
import { ListItemSeparator } from '../../../element/list/ListItemSeparator';
import { MenuList } from '../MenuList';
import { MenuListContainer } from '../MenuListContainer';
import { MenuItem } from '../MenuListItem';

export const ContextMenuStoryContent: FC = () => {
  return (
    <contextMenuContext.Provider value={useContextMenuContext()}>
      <Inner />
    </contextMenuContext.Provider>
  );
};

const Inner: FC = () => {
  const [show, setShow] = useState(false);
  const { state } = useContext(contextMenuContext);

  const onContextMenu = useCallback(
    (evt: MouseEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      setShow(true);
      state.current.pos = { x: evt.clientX, y: evt.clientY };
    },
    [state]
  );

  const clickHandler = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <div style={{ width: '1000px', height: '1000px' }} onContextMenu={onContextMenu} onClick={clickHandler}>
      <ContextMenu show={show} />
    </div>
  );
};

const ContextMenu: FC<{ show: boolean }> = (props) => {
  const { state } = useContext(contextMenuContext);
  const { x, y } = state.current.pos;

  const clickHandler = useCallback((evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  }, []);

  return props.show ? (
    <MenuListContainer style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }} onClick={clickHandler}>
      <MenuList>
        <MenuItem>開く</MenuItem>
        <MenuItem
          submenu={
            <MenuList>
              <MenuItem>ExampleA.app</MenuItem>
              <MenuItem>ExampleB.app</MenuItem>
              <MenuItem>ExampleC.app</MenuItem>
              <MenuItem>ExampleD.app</MenuItem>
            </MenuList>
          }
        >
          このアプリケーションで開く
        </MenuItem>
        <ListItemSeparator />
        <MenuItem>ゴミ箱に捨てる</MenuItem>
        <ListItemSeparator />
        <MenuItem>情報を見る</MenuItem>
      </MenuList>
    </MenuListContainer>
  ) : (
    <></>
  );
};

const contextMenuContext = createContext({} as ReturnType<typeof useContextMenuContext>);
function useContextMenuContext() {
  return {
    state: useRef({
      pos: { x: 0, y: 0 }
    })
  };
}
