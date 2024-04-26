import { MenuListItemId } from './value/MenuListItemId';

export const submenuEventHub = () => {
  const subscriptionMap = new Map<MenuListItemId, (menuItemId: MenuListItemId) => void>();

  return {
    subscribe(menuItemId: MenuListItemId, callback: (menuItemId: MenuListItemId) => void) {
      subscriptionMap.set(menuItemId, callback);
    },
    unsubscribe(menuItemId: MenuListItemId) {
      subscriptionMap.delete(menuItemId);
    },
    notify(menuItemId: MenuListItemId) {
      Array.from(subscriptionMap.values()).forEach((fn) => {
        fn(menuItemId);
      });
    }
    // _subscriptionMap: subscriptionMap,
  };
};
