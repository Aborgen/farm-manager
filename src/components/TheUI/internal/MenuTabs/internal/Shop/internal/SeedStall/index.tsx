import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import ScrollableInterface from 'components/ScrollableInterface';
import { Crop } from 'types/Crops';
import { Cart } from 'types/Shop';
import Tabulation from './internal/Tabulation';
import styles from './SeedStall.module.css';

const defaultCart = Object
  .values(Crop)
  .reduce((accumulator: Cart, crop) => {
    accumulator[crop] = {
      quantity: 0,
      total: 0,
    };

    return accumulator;
  }, {} as Cart);

function SeedStall() {
  const { seeds } = useFarmSupplyContext();
  const [ shoppingCart, setShoppingCart ] = useState<Cart>(defaultCart);
  const [ grandTotal, setGrandTotal ] = useState(0);
  const [ preventKeyUp, setPreventKeyUp ] = useState(false);

  function buySeeds() {
    seeds.buySeeds(shoppingCart);
    setShoppingCart(defaultCart);
    setGrandTotal(0);
  }

  function updateCart(e: React.KeyboardEvent | React.ChangeEvent, crop: Crop) {
    if (preventKeyUp) {
      setPreventKeyUp(false);
      return;
    }

    const input = e.target as HTMLInputElement;
    if (input.value === "") {
      setPreventKeyUp(true);
      return;
    }

    validateInput(input, crop);
    if (input.valueAsNumber === shoppingCart[crop].quantity) {
      return;
    }

    const delta = input.valueAsNumber - shoppingCart[crop].quantity;
    const nextTotal = delta * seeds.priceCheck(crop);
    setGrandTotal(grandTotal + nextTotal);
    setShoppingCart({
      ...shoppingCart,
      [crop]: {
        quantity: shoppingCart[crop].quantity + delta,
        total: shoppingCart[crop].total + nextTotal,
      }
    });
  }

  function validateInput(input: HTMLInputElement, crop: Crop) {
    input.min = "0";
    input.max = String(seeds.getAvailableSpace(crop));
    if (!input.validity.valid) {
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
      <ScrollableInterface width={ "95%" } height={ "70%" }>
        {
          Object.values(Crop).map((crop, key) => (
            <div key={ key } className={ styles["shop-item"] }>
              <span>{ crop }</span>
              <span className="black_bold-text">{ seeds.priceCheck(crop) }</span>
              <span className={ styles["seed-count-container"] }>
                <label className={ styles["seed-count_label"] } htmlFor={ `buy-${crop}` }>count</label>
                <input className={ styles["seed-count"] }
                  onChange={ (e) => updateCart(e, crop) }
                  onBeforeInput={ (e) => {
                    // Data property definitely exists on onBeforeInput events. Not sure what to do about this.
                    //@ts-ignore
                    // Use parseInt, because it ignores whitespace.
                    if(Number.isNaN(Number.parseInt(e.data))) {
                      e.preventDefault();
                      setPreventKeyUp(true);
                    }
                  }}
                  onKeyUp={ (e) => updateCart(e, crop) }
                  onClick={ (e) => e.currentTarget.select() }
                  onBlur={ (e) => {
                    if (e.target.value === "") {
                      e.target.value = String(shoppingCart[crop].quantity);
                    }
                  }}
                  defaultValue={ shoppingCart[crop].quantity }
                  id={ `buy-${crop}` }
                  type="number"
                  max={ seeds.getAvailableSpace(crop) }
                  min={ 0 } />
              </span>
            </div>
          ))
        }
      </ScrollableInterface>
      <div className={ styles["store-result"] }>
        <Tabulation cart={ shoppingCart } grandTotal={ grandTotal } />
        <button className={ `${styles["buy-button"]} black_bold-text` } onClick={ () => buySeeds() }>buy</button>
      </div>
    </div>
  );
}

export default SeedStall;
