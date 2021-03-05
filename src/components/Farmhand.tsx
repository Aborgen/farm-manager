import { Farmhand as FarmhandT, Specialty } from 'context/FarmSupply/Farmhands';


function specialtyToClass(specialty: Specialty) {
  switch (specialty) {
    case Specialty.None:
      return " default";
    default:
      return "";
  }
}

function Farmhand(props: FarmhandT) {
  return (
    <div className={ "farmhand" + specialtyToClass(props.specialty) }>
      <img className="svg-image" src="/farmhand.svg" />
    </div>
  );
}

export default Farmhand;
