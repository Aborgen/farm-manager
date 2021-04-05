import { useState } from 'react';

import { useFarmSupplyContext } from 'context/FarmSupply';
import ScrollableInterface from 'components/ScrollableInterface';
import { Crop } from 'types/Crops';
import { Cart } from 'types/Shop';
import Tabulation from './internal/Tabulation';
import styles from './SeedStall.module.css';

const defaultCart = Object
  .values(Crop)
  .reduce((accumulator, crop) => {
    accumulator[crop] = {
      quantity: 0,
      total: 0,
    };

    return accumulator;
  }, {} as Cart);

type InputType = Record<Crop, number | "">;
const defaultInputValues = Object
  .values(Crop)
  .reduce((accumulator, crop) => {
    accumulator[crop] = "";
    return accumulator;
  }, {} as InputType);

function SeedStall() {
  const { seeds } = useFarmSupplyContext();
  const [ shoppingCart, setShoppingCart ] = useState<Cart>(defaultCart);
  const [ inputValues, setInputValues ] = useState<InputType>(defaultInputValues);
  const [ grandTotal, setGrandTotal ] = useState(0);
  const [ preventKeyUp, setPreventKeyUp ] = useState(false);

  function buySeeds() {
    seeds.buySeeds(shoppingCart);
    setShoppingCart(defaultCart);
    setInputValues(defaultInputValues);
    setGrandTotal(0);
  }

  function updateCart(e: React.KeyboardEvent | React.ChangeEvent, crop: Crop) {
    if (preventKeyUp) {
      setPreventKeyUp(false);
      return;
    }

    const input = e.target;
    // Allow user to delete input. Necessary, as the inputs are managed through state.
    if (Number.isNaN(input.valueAsNumber)) {
      setInputValues({ ...inputValues, [crop]: "" });
      return;
    }

    const value = validateInput(input, crop);
    if (value === shoppingCart[crop].quantity) {
      return;
    }

    setNextCart(crop, value);
  }

  function setNextCart(crop: Crop, n: number) {
    if (seeds.atCapacity(crop)) {
      return;
    }

    const count = n - shoppingCart[crop].quantity;
    const nextTotal = count * seeds.priceCheck(crop);
    const nextQuantity = shoppingCart[crop].quantity + count;
    setInputValues({ ...inputValues, [crop]: nextQuantity });
    setGrandTotal(grandTotal + nextTotal);
    setShoppingCart({
      ...shoppingCart,
      [crop]: {
        quantity: nextQuantity,
        total: shoppingCart[crop].total + nextTotal
      }
    });
  }

  function validateInput(input: HTMLInputElement, crop: Crop) {
    // Set min and max, in case they were changed by user.
    input.min = "0";
    input.max = String(seeds.getAvailableSpace(crop));
    let value;
    if (input.validity.rangeUnderflow) {
      value = Number(input.min);
    }
    else if (input.validity.rangeOverflow) {
      value = Number(input.max);
    }
    else {
      value = input.valueAsNumber;
    }

    return value;
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
                      setInputValues({ ...inputValues, [crop]: String(shoppingCart[crop].quantity) });
                    }
                  }}
                  value={ inputValues[crop] }
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
