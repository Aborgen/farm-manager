import { useState } from 'react';

import SeedStall from './internal/SeedStall';

function Shop() {
  const [ isShopping, setIsShopping ] = useState(false);

  return (
    <div className="shop">
      { isShopping && <SeedStall /> }
      <button onClick={ () => isShopping ? setIsShopping(false) : setIsShopping(true) }>{ isShopping ? "Exit shop" : "Enter shop" }</button>
    </div>
  );
}

export default Shop;
