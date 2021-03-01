import { useFarmSupplyContext } from 'context/FarmSupply/FarmSupply';
import { Crop } from 'types/Crops';

function SeedStall() {
  const { seeds } = useFarmSupplyContext();
  function buySeed(crop: Crop) {
    if (seedsAtCapacity(crop)) {
      return;
    }

    seeds.incSeeds(crop);
  }

  function seedsAtCapacity(crop: Crop) {
    return seeds.state[crop].count === seeds.state[crop].max;
  }

  return (
    <section className="shop-seeds">
      <h3>Buy seeds</h3>
      {
        Object.entries(Crop).map(([k, v], key) => (
          <div key={ key } className="shop-item">
            { k } seeds
            <button
              disabled={ seedsAtCapacity(v) }
              onClick={ () => buySeed(v) }>
              { seedsAtCapacity(v) ? "at capacity" : "buy" }
            </button>
          </div>
        ))
      }
    </section>
  );
}

export default SeedStall;
