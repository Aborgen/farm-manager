import { useFarmSupplyContext } from 'context/FarmSupply';

export default function TheUI() {
  const context = useFarmSupplyContext();
  return (
      <ol className="seed-supply">
        {
          Object.entries(context.seeds).map(([crop, info], key) => (
          <li key={ key }>
            { `${crop} seeds: ${info.count}/${info.max}` }
          </li>
          ))
        }
      </ol>
  );
}
