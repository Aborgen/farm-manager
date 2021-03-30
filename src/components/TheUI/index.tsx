import { useState } from 'react';

import Shop from 'components/Shop';
import { usePlayerActionsContext } from 'context/PlayerActions';
import TabList, { TabMember } from 'components/TabList';
import AssignmentPanel from './internal/AssignmentPanel';
import SeedList from './internal/SeedList';
import styles from './TheUI.module.css';

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

function TheUI() {
  const playerContext = usePlayerActionsContext();
  const [ currentMenu, setCurrentMenu ] = useState<Menu | null>(null);
  function clearFocus() {
    playerContext.clearFocus();
  }

  function openMenu(menu: Menu | null) {
    setCurrentMenu(menu);
  }

  function renderMenu() {
    let node;
    switch (currentMenu) {
      case Menu.Assignment:
        node = <AssignmentPanel />
        break;
      case Menu.Shop:
        node = <Shop />
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
          style={ {buttonDefault: `${styles["menu-button"]} text-with-border--large`, buttonSelected: styles["menu-button--selected"]} } />
        { node }
      </>
    );
  }

  return (
      <div className={ styles.ui }>
        <div className={ styles["menu-container"] }>
          { renderMenu() }
        </div>
        <SeedList />
        { playerContext.state.focus && <button onClick={ () => clearFocus() }>clear focus</button> }
      </div>
  );
}

export default TheUI;
