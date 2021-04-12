import Farmhand, { Size } from 'components/Farmhand';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { Specialty } from 'types/Farmhands';
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
            <Farmhand specialty={ Specialty.None } size={ Size.Medium } />
            <div className={ styles["action"] }>
              <label className={ `${styles["action-label"]} black_bold-text` } htmlFor="farmhand-hire">6000</label>
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
            <div>
              <span data-testid="jobBoard-farmhand-count">{ farmhands.state.farmhandCount }</span>/<span data-testid="jobBoard-farmhand-capacity">{ farmhands.state.farmhandLimit }</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default JobBoard;
