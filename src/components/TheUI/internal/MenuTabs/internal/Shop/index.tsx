import { useState } from 'react';

import TabList, { TabMember } from 'components/TabList';
import SeedStall from './internal/SeedStall';
import JobBoard from './internal/JobBoard';
import PurchasePlot from './internal/PurchasePlot';
import styles from './Shop.module.css';

enum ShopSection {
  Seeds,
  JobBoard,
  PurchasePlot,
};

const members: TabMember<ShopSection>[] = [
  {
    identifier: ShopSection.Seeds,
    name: "Seed Stall",
  },
  {
    identifier: ShopSection.JobBoard,
    name: "Job Board",
  },
  {
    identifier: ShopSection.PurchasePlot,
    name: "Plots",
  },
];

function Shop() {
  const [ currentSection, setCurrentSection ] = useState<ShopSection | null>(ShopSection.Seeds);
  function openSection(section: ShopSection | null) {
    setCurrentSection(section);
  }

  function renderShopSection() {
    let node;
    switch (currentSection) {
      case ShopSection.Seeds:
        node = <SeedStall />;
        break;
      case ShopSection.JobBoard:
        node = <JobBoard />;
        break;
      case ShopSection.PurchasePlot:
        node = <PurchasePlot />;
        break;
      default:
        throw Error(`Tried to open an unknown section of the Shop [${currentSection}]`);
    }

    return (
      <>
        <div className={ styles["shop-tab-container"] }>
          <TabList
            members={ members }
            selected={ currentSection }
            setSelected={ openSection }
            tabsAreToggleButtons={ false }
            style={ {buttonDefault: "cream_button", buttonSelected: "button--selected"} } />
        </div>
        <div className={ styles["shop-container"] }>
          { node }
        </div>
      </>
    );
  }

  return (
    <div className={ styles.shop }>
      { renderShopSection() }
    </div>
  );
}

export default Shop;
