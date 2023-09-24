import { Meta, StoryObj } from '@storybook/react';
import { AppearanceType } from '../../domain/AppearanceType';
import { Button } from './Button';

export default {
  title: 'Form Item/Button',
  argTypes: {
    appearance: {
      options: Object.values(AppearanceType),
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<typeof Button> = {
  render: args => {
    const { children, ...restArgs } = args;
    const { children: _, ...restArgs2 } = args;
    const style = { '--bm-button-padding-tb': '5px', '--bm-button-padding-lr': '5px' } as React.CSSProperties;

    return (
      <>
        <div style={{ display: 'flex', columnGap: '10px' }}>
          <div>
            <Button {...restArgs} onClick={() => alert('クリックしました')}>
              {children}
            </Button>
            <Button
              {...restArgs}
              onClick={() => alert('クリックしました')}
              nativeProps={{ 'data-bm-default-key': true }}
            >
              ボタン（Data属性つき）
            </Button>
          </div>
          <div>
            <Button
              {...restArgs}
              onClick={() => alert('クリックしました')}
              icon={<img src="/home-icon.svg" alt="home" style={{ width: 'auto', height: '15px' }} />}
            >
              {children}
            </Button>
          </div>
          <div style={style}>
            <Button
              {...restArgs2}
              onClick={() => alert('クリックしました')}
              icon={<img src="/home-icon.svg" alt="home" style={{ width: 'auto', height: '24px' }} />}
            ></Button>
          </div>
          <div>
            <Button
              {...restArgs}
              onClick={() => alert('クリックしました')}
              style={{ width: '160px' }}
              icon={<img src="/home-icon.svg" alt="home" style={{ width: 'auto', height: '15px' }} />}
            >
              {children}
            </Button>
          </div>
        </div>
      </>
    );
  },
  args: {
    children: 'OK',
    disabled: false,
    appearance: AppearanceType.NORMAL
  }
};

Story.storyName = '単体';
