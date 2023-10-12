import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback
} from 'react';
import { MouseEvents } from '../../domain/EventProps';
import { BaseComponentProps } from '../../base/BaseComponent';
import { useListLogic } from '../../hook/ListHook';
import { ListItemContent } from './ListItemContent';

export interface ListItemDetailedProps {
  icon?: ReactNode;
  status?: 'normal' | 'active' | 'selected';
  focusable?: boolean;
  hoverable?: boolean;
  disabled?: boolean;
  showIndicator?: boolean;
  indicator?: ReactNode;
  secondary?: ReactNode;
}

export type ListItemProps<EL extends HTMLElement> = BaseComponentProps & ListItemDetailedProps & MouseEvents<EL>;

const NAME = 'bm-e-list-item';
export const ListItem: FC<PropsWithChildren<ListItemProps<HTMLLIElement>>> = props => {
  const { newProps } = useListLogic(props);

  return (
    <li {...newProps}>
      <ListItemContent
        showIndicator={props.showIndicator}
        indicator={props.indicator}
        icon={props.icon}
        secondary={props.secondary}
      >
        {props.children}
      </ListItemContent>
    </li>
  );
};

export const ListItemOuter: FC<PropsWithChildren> = props => {
  return <li className={`${NAME}__outer`}>{props.children}</li>;
};

export type ListItemLinkProps = BaseComponentProps &
  ListItemDetailedProps &
  MouseEvents<HTMLLIElement> &
  AnchorHTMLAttributes<unknown>;

export const ListItemLink: FC<PropsWithChildren<ListItemLinkProps>> = props => {
  const { newProps } = useListLogic(props);
  const getAnchorAttributes = useCallback((props: AnchorHTMLAttributes<unknown>): AnchorHTMLAttributes<unknown> => {
    return {
      download: props.download,
      href: props.href,
      hrefLang: props.hrefLang,
      media: props.media,
      ping: props.ping,
      target: props.target,
      type: props.type,
      referrerPolicy: props.referrerPolicy
    };
  }, []);

  return (
    <ListItemOuter {...props}>
      <a {...getAnchorAttributes(props)} {...newProps}>
        <ListItemContent
          showIndicator={props.showIndicator}
          indicator={props.indicator}
          icon={props.icon}
          secondary={props.secondary}
        >
          {props.children}
        </ListItemContent>
      </a>
    </ListItemOuter>
  );
};

export type ListItemButtonProps = BaseComponentProps &
  ListItemDetailedProps &
  MouseEvents<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

// TODO refがListItemButtonだけしか対応していない
export const ListItemButton = forwardRef(
  (props: PropsWithChildren<ListItemButtonProps>, ref: ForwardedRef<HTMLButtonElement>) => {
    const { disabled, form, formAction, formEncType, formMethod, formNoValidate, formTarget, name, type, value } =
      props;
    const attribute = {
      disabled,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      name,
      type,
      value
    };

    const { newProps } = useListLogic<HTMLButtonElement>(props);

    return (
      <ListItemOuter>
        {/* TODO ボタンのスタイリング優先度がなんか低くなるのでめんどいことになる */}
        <button {...attribute} {...newProps} ref={ref}>
          <ListItemContent
            showIndicator={props.showIndicator}
            indicator={props.indicator}
            icon={props.icon}
            secondary={props.secondary}
          >
            {props.children}
          </ListItemContent>
        </button>
      </ListItemOuter>
    );
  }
);

export const ListItemSeparator: FC<PropsWithChildren> = () => {
  // TODO 命名の仕方、よくない
  return <li className={`bm-e-list-separator`}></li>;
};
