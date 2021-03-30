import { useState } from 'react';

import Shop from 'components/Shop';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { usePlayerActionsContext } from 'context/PlayerActions';
import TabList, { TabMember } from 'components/TabList';
import AssignmentPanel from './internal/AssignmentPanel';
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
  const { seeds } = useFarmSupplyContext();
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
        <section className={ styles["seed-supply-container"] }>
          <h5 className={ `${styles["seed-supply-heading"]} text-with-border--large`}>Seeds</h5>
          <ol className={ styles["seed-supply"] }>
            {
              Object.entries(seeds.state).map(([crop, info], key) => (
              <li className={ `${styles["seed-row"]} text-with-border--small` } key={ key }>
                { crop }
                <span className="plain-black-text">
                  { `${info.count}/${info.max}` }
                </span>
              </li>
              ))
            }
          </ol>
        </section>
        { playerContext.state.focus && <button onClick={ () => clearFocus() }>clear focus</button> }
      </div>
  );
}

export default TheUI;
