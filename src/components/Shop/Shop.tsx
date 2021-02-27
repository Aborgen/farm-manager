import { useState } from 'react';

import TabList, { TabMember } from 'components/TabList';
import SeedStall from './internal/SeedStall';

enum ShopSection {
  Seeds,
  TEMP,
};

const members: TabMember<ShopSection>[] = [
  {
    identifier: ShopSection.Seeds,
    name: "Seeds",
  },
  {
    identifier: ShopSection.TEMP,
    name: "TEMP",
  },
];

function Shop() {
  const [ currentSection, setCurrentSection ] = useState<ShopSection | null>(null);
  function openSection(section: ShopSection) {
    setCurrentSection(section);
  }

  function renderShopSection() {
    let node;
    switch (currentSection) {
      case ShopSection.Seeds:
        node = <SeedStall />;
        break;
      case ShopSection.TEMP:
        node = <h2>THIS IS TEMPORARY</h2>;
        break;
      default:
        return null;
    }

    return (
      <>
        <TabList members={ members } selected={ currentSection } handleClick={ openSection } />
        { node }
      </>
    );
  }

  return (
    <div className="shop">
      { renderShopSection() }
      <button
        onClick={ () => currentSection === null ? setCurrentSection(ShopSection.Seeds) : setCurrentSection(null) }>
        { currentSection === null ? "Enter shop" : "Exit shop" }
      </button>
    </div>
  );
}

export default Shop;
