import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, FC, useCallback, useState } from 'react';
import { Alert } from '../alert/Alert';
import { Button } from '../../form-items/button/Button';
import { AppearanceType } from '../../domain/AppearanceType';
import { List } from '../../element/list/List';
import { ListItem } from '../../element/list/ListItem';
import { RootStyle } from '../../domain/StyleClass';
import { Overlay } from '../overlay/Overlay';
import { useHeaderStyle } from '../../style-element/header/Header';
import { useFlexStackLayout } from '../../layout/flex-stack/FlexStack';
import { Window, WindowAnimation, WindowControlPosition, WindowProps } from './Window';
import { CloseButton } from './WindowControl';

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
    },
    showControl: {
      options: [undefined, 'auto', true, false],
      control: { type: 'inline-radio' }
    },
    controlPosition: {
      options: [undefined, ...Object.values(WindowControlPosition)],
      control: { type: 'inline-radio' }
    }
  }
} as Meta;

const WindowShowHidePreview: FC<WindowProps> = args => {
  const [show, setShow] = useState(true);

  const showWindow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const { props: headerProps } = useHeaderStyle({});
  const { className: flexStackClass } = useFlexStackLayout({});

  return (
    <>
      <Overlay>
        <Window
          nativeProps={{ role: 'dialog' }}
          animated={args.animated}
          show={show}
          shadow={2}
          background={4}
          blur={0}
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
          <header
            className={`${flexStackClass} ${headerProps.className}`}
            style={{ padding: '5px', boxSizing: 'border-box' }}
          >
            <Button appearance={AppearanceType.SUPER_FLAT}>ボタン1</Button>
            <Button appearance={AppearanceType.SUPER_FLAT}>送信</Button>
            <Button appearance={AppearanceType.SUPER_FLAT}>削除</Button>
          </header>
          <Alert
            title={'ウィンドウのタイトル'}
            footer={
              <>
                <Button appearance={AppearanceType.NORMAL} style={{ width: '100px' }}>
                  Cancel
                </Button>
                <Button appearance={AppearanceType.TINT} style={{ width: '100px' }}>
                  OK
                </Button>
              </>
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
          showControl={args.showControl}
          shadow={args.shadow}
          background={args.background}
          blur={args.blur}
          show={args.show}
          animated={args.animated}
          absolutePosition={args.absolutePosition}
          style={
            {
              '--bm-content-padding': '5px',
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
    show: true,
    showControl: 'auto',
    absolutePosition: false,
    controlPosition: undefined
  }
};

Story.storyName = '単体';
