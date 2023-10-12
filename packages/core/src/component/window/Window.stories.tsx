import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { Button } from '../../form-items/button/Button';
import { Alert } from '../alert/Alert';
import { AppearanceType } from '../../domain/AppearanceType';
import { WindowShowAndHide } from './stories/WindowShowAndHideStory';
import { Window, WindowAnimation, WindowControlPosition } from './Window';

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

export const Story: StoryObj<typeof Window> = {
  render: args => {
    return (
      <div style={{ position: 'relative' }}>
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
        <WindowShowAndHide {...args} />
        <Window
          showControl={args.showControl}
          shadow={args.shadow}
          background={args.background}
          blur={args.blur}
          show={args.show}
          animated={args.animated}
          absolutePosition={args.absolutePosition}
          style={
            {
              marginTop: '20px',
              width: '300px'
            } as CSSProperties
          }
        >
          <Alert
            title={'ウィンドウ表示サンプル'}
            footer={<Button appearance={AppearanceType.FLAT}>フッターに表示するボタン</Button>}
          >
            <div>サンプルです</div>
          </Alert>
        </Window>
      </div>
    );
  },
  args: {
    shadow: 1,
    background: 1,
    blur: 1,
    animated: undefined,
    show: true,
    showControl: 'auto',
    absolutePosition: false,
    controlPosition: undefined
  }
};

Story.storyName = '単体';
