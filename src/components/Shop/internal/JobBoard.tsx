import { useFarmSupplyContext } from 'context/FarmSupply/FarmSupply';

function JobBoard() {
  const context = useFarmSupplyContext();
  return (
    <section className="shop-job-board">
      <h3>Job wanted</h3>
      <button onClick={ () => context.farmhands.hire() }>hire farmhand</button>
    </section>
  );
}

export default JobBoard;
