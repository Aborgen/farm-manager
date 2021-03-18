import { useState } from 'react';

import TabList, { TabMember } from 'components/TabList';
import SeedStall from './internal/SeedStall';
import JobBoard from './internal/JobBoard';

enum ShopSection {
  Seeds,
  JobBoard,
};

const members: TabMember<ShopSection>[] = [
  {
    identifier: ShopSection.Seeds,
    name: "Seeds",
  },
  {
    identifier: ShopSection.JobBoard,
    name: "Job Board",
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
      case ShopSection.JobBoard:
        node = <JobBoard />;
        break;
      default:
        return null;
    }

    return (
      <>
        <TabList members={ members } selected={ currentSection } setSelected={ openSection } />
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
