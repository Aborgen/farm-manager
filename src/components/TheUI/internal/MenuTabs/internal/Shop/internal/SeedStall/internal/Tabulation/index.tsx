import React from 'react';

import { Cart } from 'types/Shop';
import styles from './Tabulation.module.css';

interface TabulationProps {
  cart: Cart,
  grandTotal: number,
};

// TODO: Maybe this should be HTML table?
function Tabulation(props: TabulationProps) {
  return (
    <section className={ styles["tabulation"] }>
      <h5
        aria-live="polite">
        Total: { props.grandTotal }</h5>
      <div className={ styles["grid"] }>
        <span>name</span>
        <span>qty.</span>
        <span></span>
        <span>price</span>
      {
        Object.entries(props.cart).map(([crop, bundle], key) => {
          if (bundle.quantity <= 0) {
            return null;
          }

          return (
            <React.Fragment key={ key }>
              <span className={ styles["grid-crop"] }>{ crop }</span>
              <span className={ styles["grid-number"] }
                aria-live="polite">{ bundle.quantity }</span>
              <span>:</span>
              <span className={ styles["grid-number"] }
                aria-live="polite">{ bundle.total }</span>
            </React.Fragment>
          );
        })
      }
      </div>
    </section>
  );
}

export default Tabulation;
