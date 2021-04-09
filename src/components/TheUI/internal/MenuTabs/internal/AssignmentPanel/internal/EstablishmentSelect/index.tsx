import React from 'react';

import ScrollableInterface from 'components/ScrollableInterface';
import { useFarmSupplyContext } from 'context/FarmSupply';
import { Establishment } from 'context/FarmSupply/Establishments';
import styles from './EstablishmentSelect.module.css';

interface EstablishmentSelectProps {
  setCurrentEstablishment: (establishment: Establishment) => void,
  currentEstablishment: Establishment | null,
  transferCount: number,
};

function EstablishmentSelect(props: EstablishmentSelectProps) {
  const { establishments } = useFarmSupplyContext();

  function isDisabled(establishment: Establishment) {
    return (
      establishment.current!.props.atFarmhandCapacity() ||
      !establishment.current!.props.canAcceptNFarmhands(props.transferCount)
    );
  }

  return (
    <div className={ styles["establishment-select"] }>
      <ScrollableInterface width={ "100%" } height={ "100%" }>
        <ol className={ styles["establishment-container"] }>
        {
          establishments.get().map((establishment: Establishment, key: number) => {
            if (establishment.current === null) {
              return null;
            }

            return (
              <li key={ key } className={
                `${
                    isDisabled(establishment) ? `${styles["disabled"]} ` : ""
                  }`
                  +
                  `${props.currentEstablishment === establishment ? `${styles["selected"]} ` : ""}`
                  +
                  `${styles["establishment-listing"]} `
                  +
                  "black_bold-text"
                }
                onClick={ () => !isDisabled(establishment) && props.setCurrentEstablishment(establishment) }
                title={ `${establishment.current.props.farmhandCount } out of ${establishment.current.props.farmhandCapacity} farmhands` }>
                <div className={ styles["listing-container"] }>
                  <span>{ establishment.current.props.name }</span>
                  <span>
                    <span data-testid={ `establishmentSelect-farmhand-count_${key}` }>{ establishment.current.props.farmhandCount }</span>
                    <span>/</span>
                    <span data-testid={ `establishmentSelect-farmhand-capacity_${key}` }>{ establishment.current.props.farmhandCapacity }</span>
                  </span>
                </div>
              </li>
            );
          })
        }
        </ol>
      </ScrollableInterface>
    </div>
  );
}

export default EstablishmentSelect;
