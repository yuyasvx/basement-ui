import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { Window } from '../../layout/window/Window';
import { Alert } from '../../component/alert/Alert';
import { Button } from '../../form-items/button/Button';
import { AppearanceType } from '../../domain/AppearanceType';
import { List } from '../list/List';
import { ListItem } from '../list/ListItem';
import { RootStyle } from '../../domain/StyleClass';

export default {
  title: 'Element/Window Base',
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
    }
  }
} as Meta;

export const Story: StoryObj<typeof Window> = {
  render: args => {
    return (
      <div style={{ position: 'relative' }}>
        <Window
          shadow={args.shadow}
          background={args.background}
          blur={args.blur}
          style={{ '--bm-card-radius': '10px', width: '500px' } as CSSProperties}
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
        <Window
          className={RootStyle.CONTENT_BASE}
          shadow={args.shadow}
          background={args.background}
          blur={args.blur}
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
    blur: 0
  }
};

Story.storyName = '単体';
