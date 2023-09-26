import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, FC, PropsWithChildren, useMemo } from 'react';
import { Window, WindowAnimation, WindowControlPosition } from '../window/Window';
import { useHeaderStyle } from '../../style-element/header/Header';
import { RootStyle } from '../../domain/StyleClass';
import { CloseButton } from '../window/WindowControl';
import { TitleBar, TitleBarProps } from './TitleBar';

const TrafficLights: FC = () => {
  const style = useMemo(() => ({ padding: '8px', display: 'flex', gap: '8px' } as CSSProperties), []);
  const lightStyle = useMemo(
    () => ({ width: '12px', height: '12px', background: '#C0C0C0', borderRadius: '50%' } as CSSProperties),
    []
  );
  return (
    <div style={style}>
      <div style={lightStyle}></div>
      <div style={lightStyle}></div>
      <div style={lightStyle}></div>
    </div>
  );
};

export default {
  title: 'Component/Title Bar',
  argTypes: {}
} as Meta;

const Preview: FC<PropsWithChildren<TitleBarProps>> = props => {
  const { props: headerProps } = useHeaderStyle({ blur: false });
  return (
    <Window style={{ width: '500px' }} shadow={2}>
      <header {...headerProps}>
        <TitleBar
          leftAccessory={props.leftAccessory}
          leftAccessoryProps={{ autoShrink: false }}
          rightAccessory={props.rightAccessory}
          rightAccessoryProps={{ autoShrink: false }}
          center={props.center}
        >
          {props.children}
        </TitleBar>
      </header>
      <div className={RootStyle.CONTENT_BASE}>ウィンドウの中身</div>
    </Window>
  );
};

export const Story: StoryObj<typeof TitleBar> = {
  render: args => {
    return <Preview {...args} />;
  },
  args: {
    children: 'タイトルです',
    leftAccessory: '🟩',
    rightAccessory: '',
    center: false
  }
};

Story.storyName = '単体';

export const StoryMacOSLike: StoryObj<typeof TitleBar> = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { props: headerProps } = useHeaderStyle({ blur: false });
    return (
      <Window
        style={{ width: '500px', '--bm-title-bar-padding-lr': 0, '--bm-title-bar-padding-tb': 0 } as CSSProperties}
        shadow={2}
        control={<TrafficLights />}
        controlPosition="top-left"
      >
        <header {...headerProps}>
          <TitleBar
            leftAccessoryProps={{ autoShrink: false, style: { width: '68px' } }}
            rightAccessoryProps={{ autoShrink: true, style: { width: '68px' } }}
            center
            style={{ height: '28px' }}
          >
            {args.children}
          </TitleBar>
        </header>
        <div className={RootStyle.CONTENT_BASE}>ウィンドウの中身</div>
      </Window>
    );
  },
  args: {
    children:
      'タイトルバーの文言は基本的に中央揃えで表示されますが、文字列が非常に長い場合は信号機を避けるように右に寄せた表示になります'
  }
};

StoryMacOSLike.storyName = 'macOSライクなタイトルバーの再現';
