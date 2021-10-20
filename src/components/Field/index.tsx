import { useFarmSupplyContext } from 'context/FarmSupply';
import Plot from 'components/Plot';

import styles from './Field.module.css';

export default function Field() {
  const { plots } = useFarmSupplyContext();

  return (
    <div className={ styles.field }>
      {
        plots.state.plots.map((plot, idx) => (
          <Plot key={ idx } { ...plot } setName={ (name: string) => plots.setName(idx, name) } />
        ))
      }
    </div>
  );
}
