import { useFarmSupplyContext } from 'context/FarmSupply';
import { Crop } from 'types/Crops';

function SeedStall() {
  const { seeds } = useFarmSupplyContext();
  function buySeed(crop: Crop) {
    seeds.incSeeds(crop);
  }

  return (
    <section className="shop-seeds">
      <h3>Buy seeds</h3>
      {
        Object.entries(Crop).map(([k, v], key) => (
          <div key={ key } className="shop-item">
            { k } seeds
            <button onClick={ () => buySeed(v) }>buy</button>
          </div>
        ))
      }
    </section>
  );
}

export default SeedStall;
