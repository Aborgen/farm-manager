import Shop from 'components/Shop';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { usePlayerActionsContext } from 'context/PlayerActions';
import AssignmentPanel from './internal/AssignmentPanel';

export default function TheUI() {
  const { seeds, farmhands } = useFarmSupplyContext();
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
        <ol className="farmhands">
          {
            Object.entries(farmhands.state.demographics).map(([category, info], key) => (
            <li key={ key }>
              { `${category}s: ${info.count}` }
            </li>
            ))
          }
          { farmhands.state.unassigned.length > 0 && <li>unassigned: { farmhands.state.unassigned.length }</li> }
        </ol>
        { playerContext.state.focus && <button onClick={ () => clearFocus() }>clear focus</button> }
        <AssignmentPanel />
      </section>
  );
}