import { CSSProperties, FC, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { Window, WindowAnimation, WindowProps } from '../Window';
import { Overlay } from '../../overlay/Overlay';
import { CloseButton } from '../WindowControl';
import { Button } from '../../../form-items/button/Button';
import { List } from '../../../element/list/List';
import { ListItem } from '../../../element/list/ListItem';
import { ListContainer } from '../../../element/list/ListContainer';
import { useCardStyle } from '../../../hook/CardStyleHook';
import { Header } from '../../../style-element/header/Header';

export const WindowIntegrated: FC<WindowProps> = args => {
  const [show, setShow] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const showWindow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const { getBackgroundStyleClass, getBlurStyleClass } = useCardStyle();
  const windowRef = useRef<HTMLDivElement>(null);

  const optimizedClose = useCallback(() => {
    const wc = windowRef.current;
    if (wc == null) {
      return;
    }
    wc.classList.add('-closing');
    setTimeout(() => {
      setShow(false);
    }, 200);
  }, []);

  const onOpen = useCallback(() => {
    setDisabled(true);
  }, []);

  const onClose = useCallback(() => {
    console.log('closed');
    setDisabled(false);
  }, []);

  return (
    <>
      <Overlay>
        <div
          style={{
            position: 'absolute',
            left: '120px',
            top: '40px',
            width: '300px',
            height: '300px',
            backgroundImage: 'linear-gradient(90deg, #eeaaaa, #7777cc)'
          }}
        ></div>
        <Window
          nativeProps={{ role: 'dialog' }}
          animated={WindowAnimation.NONE}
          show={show}
          shadow={2}
          background={0}
          blur={0}
          style={
            {
              width: '800px',
              top: '80px',
              left: '50px'
            } as CSSProperties
          }
          control={<CloseButton onClick={() => setShow(false)} />}
          controlPosition={args.controlPosition}
          absolutePosition
          ref={windowRef}
          onOpen={onOpen}
          onClose={onClose}
        >
          <div
            style={
              {
                display: 'flex',
                '--bm-list-item-padding-tb': '5px',
                '--bm-list-item-padding-lr': '10px',
                '--bm-list-padding-lr': '5px',
                '--bm-list-padding-tb': '0',
                '--bm-list-header-padding-top': '15px',
                '--bm-list-header-padding-right': '15px',
                '--bm-list-header-padding-bottom': '5px',
                '--bm-list-header-padding-left': '15px',
                '--bm-list-item-gap': '5px'
              } as CSSProperties
            }
          >
            <aside
              style={{ flexShrink: 0, flexGrow: 0, width: '200px' }}
              className={clsx(getBackgroundStyleClass(2), getBlurStyleClass(1))}
            >
              <ListContainer header={'Music'}>
                <List>
                  <ListItem status="active" icon={'▶️'}>
                    今すぐ聞く
                  </ListItem>
                  <ListItem icon={'🗄️'}>見つける</ListItem>
                  <ListItem icon={'📻'}>ラジオ</ListItem>
                </List>
              </ListContainer>
              <ListContainer header={'ライブラリ'}>
                <List>
                  <ListItem>最近追加した項目</ListItem>
                  <ListItem>アーティスト</ListItem>
                  <ListItem>アルバム</ListItem>
                </List>
              </ListContainer>
            </aside>
            <main style={{ flexShrink: 1, flexGrow: 1 }} className={getBackgroundStyleClass(4)}>
              <Header>ここにヘッダー</Header>
            </main>
          </div>
        </Window>
      </Overlay>
      <Button onClick={showWindow} disabled={disabled}>
        ウィンドウを再表示
      </Button>
      <Button onClick={optimizedClose} disabled={!disabled}>
        違う方法で閉じる
      </Button>
    </>
  );
};
