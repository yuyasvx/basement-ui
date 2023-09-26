import { CSSProperties, FC, useCallback, useState } from 'react';
import { Window, WindowProps } from '../Window';
import { Overlay } from '../../overlay/Overlay';
import { CloseButton } from '../WindowControl';
import { Alert } from '../../alert/Alert';
import { Button } from '../../../form-items/button/Button';
import { AppearanceType } from '../../../domain/AppearanceType';
import { ProgressBar } from '../../../form-items/progress-bar/ProgressBar';
import { SegmentedSwitcher } from '../../../form-items/segmented-switcher/SegmentedSwitcher';
import { SegmentedSwitcherItem } from '../../../form-items/segmented-switcher/SegmentedSwitcherItem';

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
            footer={
              <>
                <Button appearance={AppearanceType.FLAT} style={{ width: '100px' }}>
                  Cancel
                </Button>
                <Button appearance={AppearanceType.TINT} style={{ width: '100px' }}>
                  OK
                </Button>
              </>
            }
          >
            <div>読み込み中...</div>
            <div>
              <SegmentedSwitcher>
                <SegmentedSwitcherItem>あ</SegmentedSwitcherItem>
                <SegmentedSwitcherItem>あかさ</SegmentedSwitcherItem>
                <SegmentedSwitcherItem>あかさたな</SegmentedSwitcherItem>
              </SegmentedSwitcher>
            </div>
            <div>
              <ProgressBar value={20} style={{ width: '100%' }} />
            </div>
          </Alert>
        </Window>
      </Overlay>
      <Button onClick={showWindow}>ウィンドウを再表示</Button>
    </>
  );
};
