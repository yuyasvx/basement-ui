import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, FC, useCallback, useState } from 'react';
import { Alert } from '../alert/Alert';
import { Button } from '../../form-items/button/Button';
import { AppearanceType } from '../../domain/AppearanceType';
import { List } from '../../element/list/List';
import { ListItem } from '../../element/list/ListItem';
import { RootStyle } from '../../domain/StyleClass';
import { Overlay } from '../overlay/Overlay';
import { Window, WindowAnimation, WindowProps } from './Window';

export default {
  title: 'Component/Window',
  argTypes: {
    shadow: {
      options: [0, 1, 2, 3, 4],
      control: { type: 'select' }
    },
    background: {
      options: [0, 1, 2, 3, 4],
      control: { type: 'select' }
    },
    blur: {
      options: [0, 1],
      control: { type: 'select' }
    },
    animated: {
      options: [undefined, ...Object.values(WindowAnimation)],
      control: { type: 'select' }
    }
  }
} as Meta;

const WindowShowHidePreview: FC<WindowProps> = args => {
  const [show, setShow] = useState(true);

  const showWindow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  return (
    <>
      <Overlay>
        <Window
          animated={args.animated}
          show={show}
          shadow={2}
          background={4}
          blur={0}
          style={
            {
              '--bm-card-radius': '10px',
              width: '500px',
              position: 'absolute',
              left: '500px',
              top: '100px'
            } as CSSProperties
          }
          controlStyle={{ padding: '5px', '--bm-card-radius': '50%' } as CSSProperties}
          control={
            <Button
              appearance={AppearanceType.SUPER_FLAT}
              style={
                {
                  width: '24px',
                  height: '24px',
                  '--bm-button-padding-tb': '0',
                  '--bm-button-padding-lr': '0'
                } as CSSProperties
              }
              onClick={() => setShow(false)}
              icon={'×'}
            />
          }
        >
          <Alert
            title={'ウィンドウのタイトル'}
            footer={
              <Button appearance={AppearanceType.TINT} style={{ width: '100px' }}>
                OK
              </Button>
            }
          >
            ウィンドウの本文
          </Alert>
        </Window>
      </Overlay>
      <Button onClick={showWindow}>ウィンドウを再表示</Button>
    </>
  );
};

export const Story: StoryObj<typeof Window> = {
  render: args => {
    return (
      <div style={{ position: 'relative' }}>
        <WindowShowHidePreview {...args} />
        <Window
          className={RootStyle.CONTENT_BASE}
          shadow={args.shadow}
          background={args.background}
          blur={args.blur}
          show={args.show}
          animated={args.animated}
          style={
            {
              '--bm-content-padding': '5px',
              '--bm-card-radius': '5px',
              marginTop: '20px',
              width: '300px'
            } as CSSProperties
          }
        >
          <List appearance="plain">
            <ListItem>ああああ</ListItem>
            <ListItem status="selected">ああああ</ListItem>
            <ListItem>ああああ</ListItem>
            <ListItem>ああああ</ListItem>
          </List>
        </Window>
      </div>
    );
  },
  args: {
    shadow: 1,
    background: 0,
    blur: 0,
    animated: undefined,
    show: true
  }
};

Story.storyName = '単体';
