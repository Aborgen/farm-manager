import { useState } from 'react';

import Shop from 'components/Shop';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { usePlayerActionsContext } from 'context/PlayerActions';
import TabList, { TabMember } from 'components/TabList';
import AssignmentPanel from './internal/AssignmentPanel';

enum Menu {
  Assignment,
};

const members: TabMember<Menu>[] = [
  {
    identifier: Menu.Assignment,
    name: "Assign Farmhands",
  },
];

function TheUI() {
  const { seeds, farmhands } = useFarmSupplyContext();
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
      default:
        node = null;
    }

    return (
      <>
        <TabList members={ members } selected={ currentMenu } setSelected={ openMenu } tabsAreToggleButtons={ true } />
        { node }
      </>
    );
  }

  return (
      <div className="ui">
        <Shop />
        <ol className="ui-seed-supply">
          {
            Object.entries(seeds.state).map(([crop, info], key) => (
            <li key={ key }>
              { `${crop} seeds: ${info.count}/${info.max}` }
            </li>
            ))
          }
        </ol>
        <ol className="ui-farmhands">
          {
            Object.entries(farmhands.state.demographics).map(([category, info], key) => (
              <li key={ key }>
                { `${category}s: ${info.count}` }
              </li>
            ))
          }
          { farmhands.state.unassigned.length > 0 && <li>unassigned: { farmhands.state.unassigned.length }</li> }
        </ol>
        <div className="ui-menus">
          <div className="menu-container">
            { renderMenu() }
          </div>
        </div>
        { playerContext.state.focus && <button onClick={ () => clearFocus() }>clear focus</button> }
      </div>
  );
}

export default TheUI;
