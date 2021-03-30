import { useState } from 'react';

import TabList, { TabMember } from 'components/TabList';
import Shop from './internal/Shop';
import AssignmentPanel from './internal/AssignmentPanel';
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

  function renderMenu() {
    let node;
    let style;
    switch (currentMenu) {
      case Menu.Assignment:
        node = <AssignmentPanel />;
        style = styles.assignment;
        break;
      case Menu.Shop:
        node = <Shop />;
        style = styles.shop;
        break;
      default:
        node = null;
    }

    return (
      <>
        <TabList
          members={ members }
          selected={ currentMenu }
          setSelected={ openMenu }
          tabsAreToggleButtons={ true }
          style={ {buttonDefault: `${styles["menu-button"]} cream_text-with-border--large`, buttonSelected: styles["menu-button--selected"]} } />
        {
          node !== null &&
          <div className={ `${styles["menu-container"]} ${style}` }>
            { node }
          </div>
        }
      </>
    );
  }

  return (
    <div className={ styles["menu-tabs"] }>
      { renderMenu() }
    </div>
  );
}

export default MenuTabs;
