import { CSSProperties, FC, useCallback, useState } from 'react';
import { Window, WindowProps } from '../Window';
import { Overlay } from '../../overlay/Overlay';
import { CloseButton } from '../WindowControl';
import { Alert } from '../../alert/Alert';
import { Button } from '../../../form-items/button/Button';
import { ProgressBar } from '../../../form-items/progress-bar/ProgressBar';

export const WindowShowAndHide: FC<WindowProps> = args => {
  const [show, setShow] = useState(true);

  const showWindow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  return (
    <>
      <Overlay>
        <Window
          nativeProps={{ role: 'dialog' }}
          animated={args.animated}
          show={show}
          shadow={2}
          background={1}
          blur={1}
          style={
            {
              width: '500px',
              top: '150px',
              left: '50px'
            } as CSSProperties
          }
          control={<CloseButton onClick={() => setShow(false)} />}
          controlPosition={args.controlPosition}
          absolutePosition
        >
          <Alert
            icon={<span style={{ fontSize: '32px' }}>ℹ️</span>}
            footer={
              <>
                <Button disabled>アップデートを中止</Button>
              </>
            }
          >
            <div>アップデート中...</div>
            <div>
              <ProgressBar value={98} style={{ width: '100%' }} />
            </div>
          </Alert>
        </Window>
      </Overlay>
      <Button onClick={showWindow}>閉じたウィンドウを再表示</Button>
    </>
  );
};
