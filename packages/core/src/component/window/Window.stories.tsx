import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { List } from '../../element/list/List';
import { ListItem } from '../../element/list/ListItem';
import { RootStyle } from '../../domain/StyleClass';
import { Window, WindowAnimation, WindowControlPosition } from './Window';
import { WindowShowAndHide } from './stories/WindowShowAndHideStory';
import { WindowIntegrated } from './stories/WindowIntegratedStory';

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

export const WindowIntegratedStory: StoryObj = {
  render: args => {
    return <WindowIntegrated />;
  },
  args: {}
};

WindowIntegratedStory.storyName = '結合';
