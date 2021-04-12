import { Specialty } from 'types/Farmhands';
import styles from './Farmhand.module.css';

enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large",
};

interface FarmhandProps {
  specialty: Specialty,
  size: Size,
};

function getImage(specialty: Specialty) {
  switch (specialty) {
    case Specialty.None:
      return "farmhand";
    default:
      throw Error(`Received unknown worker specialty: [${specialty}]`);
  }
}

function Farmhand(props: FarmhandProps) {
  return (
    <div className={ `${styles["container"]} ${styles[props.size]}` }>
      <img className={ styles["image"] } src={ `/${getImage(props.specialty)}.svg` } />
    </div>
  );
}

export default Farmhand;
export { Size };
