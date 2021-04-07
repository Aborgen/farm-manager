import { useState } from 'react';

import TabList, { TabMember } from 'components/TabList';
import AssignmentPanel from './internal/AssignmentPanel';
import OpenedMenu from './internal/OpenedMenu';
import Shop from './internal/Shop';
import styles from './MenuTabs.module.css';

enum Menu {
  Assignment,
  Shop,
};

const members: TabMember<Menu>[] = [
  {
    identifier: Menu.Assignment,
    name: "Assign",
  },
  {
    identifier: Menu.Shop,
    name: "Shop",
  },
];

function MenuTabs() {
  const [ currentMenu, setCurrentMenu ] = useState<Menu | null>(null);

  function openMenu(menu: Menu | null) {
    setCurrentMenu(menu);
  }

  function getCurrentStyle() {
    switch (currentMenu) {
      case Menu.Assignment:
        return styles.assignment;
      case Menu.Shop:
        return styles.shop;
      default:
        return "";
    }
  }

  function getCurrentMenu() {
    switch (currentMenu) {
      case Menu.Assignment:
        return <AssignmentPanel />;
      case Menu.Shop:
        return <Shop />;
      default:
        return null;
    }
  }

  return (
    <div className={ styles["menu-tabs"] }>
      <TabList
        members={ members }
        selected={ currentMenu }
        setSelected={ openMenu }
        tabsAreToggleButtons={ true }
        style={ {buttonDefault: "orange_button", buttonSelected: "button--selected"} } />
      <OpenedMenu
        style={ getCurrentStyle() }
        menu={ getCurrentMenu() } />
    </div>
  );
}

export default MenuTabs;
