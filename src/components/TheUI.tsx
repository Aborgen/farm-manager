import Shop from 'components/Shop/Shop';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { usePlayerActionsContext } from 'context/PlayerActions';

export default function TheUI() {
  const { seeds } = useFarmSupplyContext();
  const playerContext = usePlayerActionsContext();
  function clearFocus() {
    playerContext.clearFocus();
  }

  return (
      <section className="ui">
        <Shop />
        <ol className="seed-supply">
          {
            Object.entries(seeds.state).map(([crop, info], key) => (
            <li key={ key }>
              { `${crop} seeds: ${info.count}/${info.max}` }
            </li>
            ))
          }
        </ol>
        { playerContext.state.focus && <button onClick={ () => clearFocus() }>clear focus</button> }
      </section>
  );
}
