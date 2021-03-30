import { useFarmSupplyContext } from 'context/FarmSupply';
import styles from './SeedList.module.css';

function SeedList() {
  const { seeds } = useFarmSupplyContext();
  return (
    <section className={ styles["seed-supply-container"] }>
      <h5 className={ `${styles["seed-supply-heading"]} cream_text-with-border--large`}>Seeds</h5>
      <ol className={ styles["seed-supply"] }>
        {
          Object.entries(seeds.state).map(([crop, info], key) => (
          <li className={ `${styles["seed-row"]} white_text-with-border--small` } key={ key }>
            { crop }
            <span className="plain-black-text">
              { `${info.count}/${info.max}` }
            </span>
          </li>
          ))
        }
      </ol>
    </section>
  );
}

export default SeedList;
