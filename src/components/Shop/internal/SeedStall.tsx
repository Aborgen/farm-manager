import { useFarmSupplyContext } from 'context/FarmSupply/FarmSupply';
import { Crop } from 'types/Crops';

function SeedStall() {
  const { seeds } = useFarmSupplyContext();
  function buySeed(crop: Crop) {
    if (seeds.atCapacity(crop)) {
      return;
    }

    seeds.incSeeds(crop);
  }

  return (
    <section className="shop-seeds">
      <h3>Buy seeds</h3>
      {
        Object.entries(Crop).map(([k, v], key) => (
          <div key={ key } className="shop-item">
            { k } seeds
            <button
              disabled={ seeds.atCapacity(v) }
              onClick={ () => buySeed(v) }>
              { seeds.atCapacity(v) ? "at capacity" : "buy" }
            </button>
          </div>
        ))
      }
    </section>
  );
}

export default SeedStall;
