import { useFarmSupplyContext } from 'context/FarmSupply';
import { PlotGrade } from 'types/Plots';

import styles from './PurchasePlot.module.css';

function PurchasePlot() {
  const { plots } = useFarmSupplyContext();
  function purchase() {
    if (plots.atCapacity()) {
      return;
    }

    plots.purchasePlot(PlotGrade.Excellent);
  }

  return (
    <section className={ styles.plot }>
      <h3 className={ `${styles.heading} cream_text-with-border--large` }>Land Available</h3>
      <div className={ styles["plot-container"] }>
        <button
          className="cream_button"
          id="plot-purchase"
          aria-live="polite"
          disabled={ plots.atCapacity() }
          onClick={ () => purchase() }>
          { plots.atCapacity() ? "at limit" : "purchase" }
        </button>
      </div>
    </section>
  );
}

export default PurchasePlot;
