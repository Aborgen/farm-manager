import Farmhand from 'components/Farmhand';
import { useFarmSupplyContext } from 'context/FarmSupply';
import styles from './JobBoard.module.css';

function JobBoard() {
  const { farmhands } = useFarmSupplyContext();
  function hire() {
    if (farmhands.atCapacity()) {
      return;
    }

    farmhands.hire()
  }

  return (
    <section className={ styles["job-board"] }>
      <h3 className={ `${styles["heading"]} cream_text-with-border--large` }>Job Wanted</h3>
      <div className={ styles["listing-container"] }>
        <div className={ styles["listing"] }>
          <div className={ styles["details"] }>
            <Farmhand />
            <div className={ styles["action"] }>
              <label className="black_bold-text" htmlFor="farmhand-hire">6000</label>
              <button
                className="cream_button"
                id="farmhand-hire"
                aria-live="polite"
                disabled={ farmhands.atCapacity() }
                onClick={ () => hire() }>
                { farmhands.atCapacity() ? "no vacancy" : "hire" }
              </button>
            </div>
          </div>
          <section className={ styles["capacity"] }>
            <h4 className={ `${styles["heading"]} cream_text-with-border--large` }>Farmhand</h4>
            <div>{ `${farmhands.state.farmhandCount}/${farmhands.state.farmhandLimit}` }</div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default JobBoard;
