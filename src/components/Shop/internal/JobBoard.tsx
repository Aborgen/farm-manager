import { useFarmSupplyContext } from 'context/FarmSupply';

function JobBoard() {
  const { farmhands } = useFarmSupplyContext();
  function hire() {
    if (farmhands.atCapacity()) {
      return;
    }

    farmhands.hire()
  }

  return (
    <section className="shop-job-board">
      <h3>Job wanted</h3>
      <button
        aria-live="polite"
        disabled={ farmhands.atCapacity() }
        onClick={ () => hire() }>
        { farmhands.atCapacity() ? "no vacancy" : "hire farmhand" }
      </button>
    </section>
  );
}

export default JobBoard;
