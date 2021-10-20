import { useState } from 'react';

import styles from './PlotName.module.css';

interface PlotNameProps {
  name: string,
  setName: Function,
}

function PlotName(props: PlotNameProps) {
  const [nameSelected, setNameSelected] = useState(false);

  function setName(name: string) {
    props.setName(name);
    setNameSelected(false);
  }

  function enterEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      setName(target.value);
    }
  }

  return (
    <h4 className={ styles["plot-name"] } onClick={ () => setNameSelected(true) }>
    Name: {
      nameSelected ?
        <input onBlur={ (e) => setName(e.target.value) } onKeyDown={ (e) => enterEvent(e) } defaultValue={ props.name } autoFocus></input>
      : props.name
    }
    </h4>
  );
}

export default PlotName;
