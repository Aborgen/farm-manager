import { useFarmSupplyContext } from 'context/FarmSupply';
import { PlotGrade } from 'types/Plots';
import Plot from 'components/Plot';

import styles from './Field.module.css';

export default function Field() {
  const { plots } = useFarmSupplyContext();

  return (
    <>
    <div className={ styles.field }>
      {
        plots.state.plots.map((plot, key) => (
          <Plot key={ key } { ...plot } />
        ))
      }
    </div>
    <button style={ {fontWeight: "bold", fontSize: "2em"} }
      onClick={ () => !plots.atCapacity() && plots.purchasePlot(PlotGrade.Excellent) }
      disabled={ plots.atCapacity() }>Purchase Plot</button>
    </>
  );
}
