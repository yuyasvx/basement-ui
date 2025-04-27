import type { Meta, StoryObj } from '@storybook/react';
import { memo } from 'react';
import { Alignment } from '../alignment/Alignment';
import { Card, CardVariant } from '../card/Card';
import { Popup, type PopupDetailedProps } from './Popup';
import { PopupAlignmentType } from './PopupAlignmentType';

export const Story: StoryObj<Omit<PopupDetailedProps, 'content'>> = {
  render(args) {
    return (
      <Alignment style={{ width: '170vw', height: '170vh' }} horizontalAlign="center" verticalAlign="center">
        <div>
          <Popup content={<MemoCard />} className={'popup-test'} style={{ display: 'block', margin: '50px' }} {...args}>
            ここがポップアップの親要素
          </Popup>
          <Popup
            content={<Card style={{ padding: '10px' }}>ポップアップの内容</Card>}
            className={'popup-test'}
            style={{ display: 'block', margin: '50px' }}
            {...args}
          >
            <div style={{ background: '#C0C0C0', height: '90px' }}>親要素</div>
          </Popup>
        </div>
      </Alignment>
    );
  },
  name: 'Props',
  args: {
    horizontalAlign: undefined,
    verticalAlign: undefined,
    show: true,
    zIndex: undefined,
    autoAlign: false,
  },
};

const MemoCard = memo(() => (
  <Card style={{ padding: '10px' }}>
    内容
    <Card variant={CardVariant.BORDER} style={{ padding: '5px' }}>
      内容その2
    </Card>
  </Card>
));

export default {
  title: 'Component/Popup',
  argTypes: {
    horizontalAlign: {
      control: { type: 'select' },
      options: Object.values(PopupAlignmentType),
    },
    verticalAlign: {
      control: { type: 'select' },
      options: Object.values(PopupAlignmentType),
    },
    zIndex: {
      control: { type: 'number' },
    },
  },
} satisfies Meta;
