import { Crop } from 'types/Crops';

import styles from './PlowDialogue.module.css';

type PlowDialogueProps = {
  plowRow: Function,
};

function PlowDialogue(props: PlowDialogueProps) {
  return (
    <ol className={ styles["plow-dialogue"] }>
    {
      Object.entries(Crop).map(([k, v], key) => (
        <li key={ key }>
          <button onClick={ () => props.plowRow(v) }>Plant { k }</button>
        </li>
      ))
    }
    </ol>
  );
}

export default PlowDialogue;
