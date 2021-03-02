import { useFarmSupplyContext } from 'context/FarmSupply/FarmSupply';

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
        disabled={ farmhands.atCapacity() }
        onClick={ () => hire() }>
        hire farmhand
      </button>
    </section>
  );
}

export default JobBoard;
