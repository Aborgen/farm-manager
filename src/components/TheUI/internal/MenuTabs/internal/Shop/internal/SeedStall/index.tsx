import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import ScrollableInterface from 'components/ScrollableInterface';
import { Crop } from 'types/Crops';
import styles from './SeedStall.module.css';

type Cart = Record<Crop, number>;
const defaultCart = Object.values(Crop).reduce((accumulator: Cart, crop: Crop) => {
  accumulator[crop] = 0;
  return accumulator;
}, {} as Cart);

function SeedStall() {
  const { seeds } = useFarmSupplyContext();
  const [ shoppingCart, setShoppingCart ] = useState<Cart>(defaultCart);
//  function buySeed(crop: Crop) {
//    if (seeds.atCapacity(crop)) {
//      return;
//    }
//
//    seeds.incSeeds(crop);
//  }

  function updateCart(e: React.KeyboardEvent, crop: Crop) {
    const input = e.target as HTMLInputElement;
    validateInput(input);
    setShoppingCart({
      ...shoppingCart,
      [crop]: input.valueAsNumber
    });
  }

  function validateInput(input: HTMLInputElement) {
    if (Number.isNaN(input.valueAsNumber)) {
      input.value = input.min
    }
    if (!input.validity.valid) {
      console.log("HELLO");
      if (input.validity.rangeUnderflow) {
        input.value = input.min;
      }
      else if (input.validity.rangeOverflow) {
        input.value = input.max;
      }
    }
  }

  return (
    <div className={ styles.seeds }>
      <ScrollableInterface>
        {
          // @ts-ignore
          Object.entries(Crop).map(([k, v], key) => (
            <div key={ key } className={ styles["shop-item"] }>
              <span>{ v }</span>
              <span className="black_bold-text">100</span>
              <span className={ styles["seed-count-container"] }>
                <label className={ styles["seed-count_label"] } htmlFor={ `buy-${v}` }>count</label>
                <input className={ styles["seed-count"] }
                  onKeyUp={ (e) => updateCart(e, v) }
                  onClick={ (e) => e.currentTarget.select() }
                  id={ `buy-${v}` }
                  type="number"
                  max={ seeds.getAvailableSpace(v) }
                  min={ 0 } />
              </span>
            </div>
          ))
        }
      </ScrollableInterface>
      <div className={ styles["store-result"] }>
        <div className={ styles.total }></div>
        <button className={ styles["buy-button"] } onClick={ () => console.log(shoppingCart) }>buy</button>
      </div>
    </div>
  );
}

export default SeedStall;
