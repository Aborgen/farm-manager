/*
import { Farmhand as FarmhandT, Specialty } from 'types/Farmhands';


function specialtyToClass(specialty: Specialty) {
  switch (specialty) {
    case Specialty.None:
      return " default";
    default:
      return "";
  }
}

function Farmhand(props: FarmhandT) {
*/
function Farmhand() {
  return (
    <div className={ "farmhand" }>
      <img className="svg-image" src="/farmhand.svg" />
    </div>
  );
}

export default Farmhand;
